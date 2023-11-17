import { InputReadonly } from '@commercelayer/app-elements'
import { useWebhookDetailsContext } from './Provider'

export function WebhookSecret(): JSX.Element | null {
  const {
    state: { data }
  } = useWebhookDetailsContext()

  if (data?.shared_secret == null) {
    return null
  }

  return (
    <InputReadonly
      label='Shared secret'
      value={data.shared_secret}
      showCopyAction
      hint={{
        text: (
          <>
            Used to verify the{' '}
            <a
              href='https://docs.commercelayer.io/core/callbacks-security'
              target='_blank'
              rel='noreferrer'
            >
              callback authenticity
            </a>
            .
          </>
        )
      }}
    />
  )
}
