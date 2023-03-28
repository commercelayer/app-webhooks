import { Webhook } from '@commercelayer/sdk'
import { useTokenProvider, Hint } from '@commercelayer/app-elements'
import { formatDistanceInWords } from '#utils/formatDistanceInWords'

interface Props {
  webhook: Webhook
}

export function DescriptionLine({ webhook }: Props): JSX.Element {
  if (
    webhook.last_event_callbacks === undefined ||
    webhook.last_event_callbacks.length === 0
  )
    return <Hint>Never fired</Hint>

  const {
    settings: { timezone }
  } = useTokenProvider()

  const lastEventCallbackDate = webhook.last_event_callbacks[0].created_at

  const lastFiredAt = formatDistanceInWords(lastEventCallbackDate, timezone)

  return <Hint>{`Last fired ${lastFiredAt}`}</Hint>
}
