import { Webhook } from '@commercelayer/sdk'
import { getTimeAgoString } from '#utils/timeAgo'

interface Props {
  webhook: Webhook
}

export function DescriptionLine({ webhook }: Props): JSX.Element {
  if (
    webhook.last_event_callbacks === undefined ||
    webhook.last_event_callbacks.length === 0
  )
    return <></>
  const createdAtTimeAgo = getTimeAgoString(
    webhook.last_event_callbacks[0].created_at
  )

  return (
    <>
      {webhook.last_event_callbacks === undefined ||
      webhook.last_event_callbacks.length === 0
        ? 'Never fired'
        : `Fired ${createdAtTimeAgo}`}
    </>
  )
}
