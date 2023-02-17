import { InputReadonly, ListDetails } from '@commercelayer/core-app-elements'
import { useWebhookDetailsContext } from './Provider'

export function WebhookCallbackURL(): JSX.Element | null {
  const {
    state: { data }
  } = useWebhookDetailsContext()

  if (data == null || data.callback_url == null) {
    return null
  }

  return (
    <ListDetails title='Callback URL'>
      <InputReadonly value={data.callback_url} showCopyAction />
    </ListDetails>
  )
}
