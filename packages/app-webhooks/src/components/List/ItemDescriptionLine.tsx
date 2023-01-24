import { Webhook } from '@commercelayer/sdk'
import { getTimeAgoString } from '#utils/timeAgo'

interface Props {
  webhook: Webhook
}

export function DescriptionLine({ webhook }: Props): JSX.Element {
  const createdAtTimeAgo = getTimeAgoString(webhook.created_at)

  return (
    <>
      {webhook.last_event_callbacks === undefined ||
      webhook.last_event_callbacks.length === 0
        ? 'Never fired'
        : `Fired ${createdAtTimeAgo}`}
    </>
  )
}
