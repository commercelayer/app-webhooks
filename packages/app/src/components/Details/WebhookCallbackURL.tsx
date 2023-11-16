import { InputReadonly } from '@commercelayer/app-elements'
import { useWebhookDetailsContext } from './Provider'

export function WebhookCallbackURL(): JSX.Element | null {
  const {
    state: { data }
  } = useWebhookDetailsContext()

  if (data?.callback_url == null) {
    return null
  }

  return (
    <InputReadonly
      label='Callback URL'
      value={data.callback_url}
      showCopyAction
    />
  )
}
