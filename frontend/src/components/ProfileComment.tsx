import { CgProfile } from 'react-icons/cg'
import { CommentType } from '../types'

type Props = {
  comment: CommentType
}

const ProfileComment = ({ comment }: Props) => {
  return (
    <div className="bg-slate-800 rounded-lg p-2">
      <div className="flex gap-3 items-center">
        <CgProfile className="text-3xl text-blue-600" />
        <p className="text-base font-semibold">
          {comment.user.name} {comment.user.lastName}
        </p>
      </div>
      <div className="mt-2">
        <p className="text-white">{comment.text}</p>
      </div>
    </div>
  )
}
export default ProfileComment
