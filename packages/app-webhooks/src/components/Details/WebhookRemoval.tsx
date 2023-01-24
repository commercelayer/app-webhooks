import {
  Button,
  ListDetails,
  Spacer,
  Text
} from '@commercelayer/core-app-elements'
import { appRoutes } from '#data/routes'
import { useWebhookDetailsContext } from './Provider'
import { useLocation } from 'wouter'

export function WebhookRemoval(): JSX.Element | null {
  const {
    state: { data },
    deleteWebhook
  } = useWebhookDetailsContext()
  const [_, setLocation] = useLocation()

  if (data == null || data.shared_secret == null) {
    return null
  }

  return (
    <ListDetails title='Danger zone'>
      <Spacer bottom='4'>
        <hr />
      </Spacer>
      <Spacer bottom='6'>
        <Text variant='info'>
          Permanently remove the webhook. This action cannot be undone, proceed
          with caution.
        </Text>
      </Spacer>
      <Button
        variant='danger'
        size='small'
        onClick={(e) => {
          e.stopPropagation()
          deleteWebhook()
            .then(() => {
              console.log('Deleted')
              setLocation(appRoutes.list.makePath())
            })
            .catch((e: any) => {
              console.log(e)
            })
        }}
        data-test-id='list-task-item-btn-cancel'
      >
        Remove webhook
      </Button>
    </ListDetails>
  )
}
