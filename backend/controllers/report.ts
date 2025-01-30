import { Prisma } from '@prisma/client'
import type { Request, RequestHandler, Response } from 'express'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import type {
  addCommentSchemaType,
  AddReportSchemaType,
  EditReportSchemaType,
} from '../schemas/report.js'
import { initializeRedisClient } from '../utils/client.js'
import { db } from '../utils/db.js'

export const getAllReports: RequestHandler = async (req, res) => {
  try {
    const client = await initializeRedisClient()

    const cache = await client.get('all-reports')
    if (cache) {
      res.status(200).json({ data: JSON.parse(cache) })
      return
    }

    const reports = await db.report.findMany({
      include: {
        user: { omit: { password: true } },
        comments: { include: { user: { omit: { password: true } } } },
      },
    })
    await client.setEx('all-reports', 3600, JSON.stringify(reports))

    res.status(200).json({ data: reports })
  } catch (error) {
    res.status(400).json({ message: 'There was an error' })
    console.log(error)
  }
}

export const addReport: RequestHandler = async (req, res) => {
  try {
    const imageFile = req.file

    if (!imageFile) {
      res.status(400).json({ message: 'Image is required' })
      return
    }

    const { description, latitude, longtitude, title, type } =
      req.body as AddReportSchemaType
    const userId = req.userId

    const user = await db.user.findUnique({ where: { id: userId } })

    if (!user) {
      res.status(401).json({ message: 'User not allowed' })
      return
    }

    const report = await db.report.create({
      data: {
        description,
        latitude: new Prisma.Decimal(latitude),
        longtitude: new Prisma.Decimal(longtitude),
        title,
        userId,
        type,
        image: `/uploads/${imageFile.filename}`,
      },
    })

    const client = await initializeRedisClient()
    await client.del('all-reports')

    res.status(200).json({ data: report })
  } catch (error) {
    console.log(error)

    res.status(400).json({ message: 'There was an error' })
  }
}

export const deleteReport = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = Number(req.params.id)
    const userId = req.userId

    const report = await db.report.findFirst({
      where: { id },
    })

    if (!report) {
      res.status(404).json({ message: 'Report not found' })
      return
    }

    if (report.userId !== userId) {
      res.status(403).json({ message: 'Not authorized to delete this report' })
      return
    }

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    await db.report.delete({
      where: {
        id,
      },
    })

    if (report.image) {
      const imagePath = path.join(__dirname, '..', report.image)
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image:', err)
        }
      })
    }

    const client = await initializeRedisClient()
    await client.del('all-reports')

    res.status(200).json({ message: 'Report deleted successfully' })
  } catch (error) {
    res.status(400).json({ message: 'There was an error' })
  }
}

export const addComment: RequestHandler = async (req, res) => {
  try {
    const reportId = Number(req.params.id!)
    const userId = req.userId

    const report = await db.report.findFirst({ where: { id: reportId } })

    if (!report) {
      res.status(404).json({ message: 'Report Not Found' })
    }

    const { text } = req.body as addCommentSchemaType

    const comment = await db.comment.create({
      data: {
        text,
        reportId,
        userId,
      },
    })

    const client = await initializeRedisClient()
    await client.del('all-reports')

    res.status(200).json(comment)
  } catch (error) {
    res.status(500).json({ message: 'There was an error' })
  }
}

export const removeComment: RequestHandler = async (req, res) => {
  try {
    const commentId = Number(req.params.id)
    const userId = req.userId

    const comment = await db.comment.findFirst({ where: { id: commentId } })

    if (!comment) {
      res.status(404).json({ comment: 'Report Not Found' })
      return
    }

    if (comment?.userId !== userId) {
      res.status(403).json({ message: 'Not authorized to delete this comment' })
      return
    }

    await db.comment.delete({
      where: {
        id: commentId,
      },
    })

    const client = await initializeRedisClient()
    await client.del('all-reports')

    res.status(200).json({ message: 'Comment removed successfully' })
  } catch (error) {
    res.status(500).json({ message: 'There was an error' })
  }
}

export const getSingleReport: RequestHandler = async (req, res) => {
  try {
    const reportId = Number(req.params.id!)

    const report = await db.report.findFirst({
      where: { id: reportId },
      include: {
        user: { omit: { password: true } },
        comments: { include: { user: { omit: { password: true } } } },
      },
    })

    if (!report) {
      res.status(404).json({ message: 'Report not found' })
      return
    }

    res.status(200).json(report)
  } catch (error) {
    res.status(500).json({ message: 'There was an error' })
  }
}

export const editReport: RequestHandler = async (req, res) => {
  try {
    const reportId = Number(req.params.id!)
    const userId = req.userId
    const imageFile = req.file

    const report = await db.report.findFirst({ where: { id: reportId } })

    if (!report) {
      res.status(404).json({ message: 'Report not found' })
      return
    }

    if (report.userId !== userId) {
      res.status(403).json({ message: 'Unauthorized to update this report' })
      return
    }

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    if (report.image && imageFile) {
      const imagePath = path.join(__dirname, '..', report.image)
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image:', err)
        }
      })
    }

    const { description, latitude, longtitude, title, type } =
      req.body as EditReportSchemaType

    const updatedReport = await db.report.update({
      where: { id: reportId },
      data: {
        description,
        title,
        latitude,
        longtitude,
        type,
        image: imageFile ? `/uploads/${imageFile.filename}` : report.image,
      },
    })

    const client = await initializeRedisClient()
    await client.del('all-reports')

    res.status(200).json(updatedReport)
  } catch (error) {
    res.status(500).json({ message: 'There was an error' })
  }
}
