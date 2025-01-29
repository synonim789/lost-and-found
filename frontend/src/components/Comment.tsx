import { CgProfile } from 'react-icons/cg'
import { CommentType } from '../types'

type Props = {
  comment: CommentType
}

const Comment = ({ comment }: Props) => {
  return (
    <div className="">
      <div className="flex gap-3 items-center">
        <CgProfile className="text-3xl text-blue-600" />
        <p className="text-base font-semibold text-gray-800">
          {comment.user.name} {comment.user.lastName}
        </p>
      </div>
      <div className="mt-2">
        <p className="text-gray-700">{comment.text}</p>
      </div>
      <div className="mt-4 border-t border-gray-200"></div>
    </div>
  )
}
export default Comment
