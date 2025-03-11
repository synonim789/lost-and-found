import { REPORT_TYPE } from '../constants'
import { ReportType } from '../types'
import { getImage } from '../utils'
import ProfileReportComment from './ProfileReportComment'
import ProfileReportCommentForm from './ProfileReportCommentForm'

type Props = {
  report: ReportType
}

const ProfileReport = ({ report }: Props) => {
  const color = REPORT_TYPE.find((r) => r.value === report.type)?.color
  const label = REPORT_TYPE.find((r) => r.value === report.type)?.label
  return (
    <div className="bg-slate-900 rounded-lg p-3" key={report.id}>
      <p className="text-xl font-bold">{report.title}</p>
      <img
        src={getImage(report.image)}
        className="w-60 h-full mx-auto rounded-lg"
      />
      <p className="text-base">{report.description}</p>
      <p className={`${color} font-bold text-lg`}>{label}</p>
      <div className="mb-4 flex flex-col gap-4 bg-slate-800 p-4 rounded-lg shadow-md">
        {report?.comments?.map((comment) => {
          return <ProfileReportComment comment={comment} key={comment.id} />
        })}

        <ProfileReportCommentForm reportId={report.id} />
      </div>
    </div>
  )
}
export default ProfileReport
