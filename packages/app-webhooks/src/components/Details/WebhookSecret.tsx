import { A, InputReadonly, ListDetails } from '@commercelayer/core-app-elements'
import { useWebhookDetailsContext } from './Provider'

export function WebhookSecret(): JSX.Element | null {
  const {
    state: { data }
  } = useWebhookDetailsContext()

  if (data == null || data.shared_secret == null) {
    return null
  }

  return (
    <ListDetails title='Shared secret'>
      <InputReadonly
        value={data.shared_secret}
        showCopyAction
        hint={{
          text: (
            <>
              Used to sign the payload. Learn how to{' '}
              <A
                href='https://docs.commercelayer.io/core/callbacks-security'
                target='_blank'
              >
                verify the callback authenticity
              </A>
              .
            </>
          )
        }}
      />
    </ListDetails>
  )
}
