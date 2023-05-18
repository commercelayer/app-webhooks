import { Webhook } from '@commercelayer/sdk'
import { useTokenProvider, Hint } from '@commercelayer/app-elements'
import { formatDistanceInWords } from '#utils/formatDistanceInWords'

interface Props {
  webhook: Webhook
}

export function DescriptionLine({ webhook }: Props): JSX.Element {
  if (
    webhook.last_event_callbacks === undefined ||
    webhook.last_event_callbacks?.length === 0
  )
    return <Hint>Never fired</Hint>

  const { user } = useTokenProvider()

  const lastEventCallback =
    webhook.last_event_callbacks != null
      ? webhook.last_event_callbacks[0]
      : undefined

  const lastFiredAt = formatDistanceInWords(
    lastEventCallback?.created_at ?? '',
    user?.timezone
  )

  return <Hint>{`Last fired ${lastFiredAt}`}</Hint>
}
