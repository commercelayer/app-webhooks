import {
  A,
  InputReadonly,
  ListDetails,
  Spacer,
  Text
} from '@commercelayer/core-app-elements'
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
      <Spacer bottom='4'>
        <hr />
      </Spacer>
      <Spacer bottom='4'>
        <Text variant='info'>
          Used to sign the payload. Learn how to{' '}
          <A
            href='https://docs.commercelayer.io/core/callbacks-security'
            target='_blank'
          >
            verify the callback authenticity
          </A>
          .
        </Text>
      </Spacer>
      <InputReadonly value={data.shared_secret} showCopyAction />
    </ListDetails>
  )
}
