import { Webhook } from '@commercelayer/sdk'

interface Props {
  job: Webhook
}

export function DescriptionLine({ job }: Props): JSX.Element {
  return (
    <>
      {job.circuit_state === 'open'
        ? '-'
        : job.circuit_state === 'closed'
        ? '-'
        : '-'}
    </>
  )
}
