import { InputReadonly } from '@commercelayer/app-elements'
import { useWebhookDetailsContext } from './Provider'

export function WebhookCallbackURL(): JSX.Element | null {
  const {
    state: { data }
  } = useWebhookDetailsContext()

  if (data == null || data.callback_url == null) {
    return null
  }

  return (
    <>
      <h2 className='text-lg font-semibold mb-4'>Callback URL</h2>
      <InputReadonly value={data.callback_url} showCopyAction />
    </>
  )
}
