import { Webhook } from '@commercelayer/sdk'
import { formatDistanceInWords } from '#utils/formatDistanceInWords'

interface Props {
  webhook: Webhook
}

export function DescriptionLine({ webhook }: Props): JSX.Element {
  if (
    webhook.last_event_callbacks === undefined ||
    webhook.last_event_callbacks.length === 0
  )
    return <>Never fired</>

  const createdAtTimeAgo = formatDistanceInWords(
    webhook.last_event_callbacks[0].created_at
  )

  return <>{`Fired ${createdAtTimeAgo}`}</>
}
