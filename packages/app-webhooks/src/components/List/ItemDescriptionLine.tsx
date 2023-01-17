import { formatDate } from '@commercelayer/core-app-elements'
import { Export } from '@commercelayer/sdk'

interface Props {
  job: Export
}

export function DescriptionLine({ job }: Props): JSX.Element {
  return (
    <>
      {job.status === 'pending' ? (
        <div>Pending</div>
      ) : job.status === 'in_progress' ? (
        <div>In progress</div>
      ) : job.interrupted_at != null ? (
        <div>Export failed on {formatDate(job.interrupted_at)}</div>
      ) : job.status === 'completed' ? (
        <div>Exported on {formatDate(job.completed_at)}</div>
      ) : (
        '-'
      )}
    </>
  )
}
