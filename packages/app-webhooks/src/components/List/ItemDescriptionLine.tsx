import { Webhook } from '@commercelayer/sdk'
import { formatDateAndTime } from '#utils/formatDateAndTime'
import { useTokenProvider, Hint } from '@commercelayer/app-elements'

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

  const lastFiredAt = `${
    formatDateAndTime(lastEventCallbackDate, timezone).date
  } · ${formatDateAndTime(lastEventCallbackDate, timezone).time}`

  return <Hint>{`Fired on ${lastFiredAt}`}</Hint>
}
