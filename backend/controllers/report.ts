import { Prisma } from '@prisma/client'
import type { Request, RequestHandler, Response } from 'express'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import type { AddReportSchemaType } from '../schemas/report.js'
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
      include: { user: { omit: { password: true } } },
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
