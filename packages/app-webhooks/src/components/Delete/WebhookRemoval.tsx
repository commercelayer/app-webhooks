import {
  Button,
  ListDetails,
  Spacer,
  Text
} from '@commercelayer/core-app-elements'
import { appRoutes } from '#data/routes'
import { useWebhookDeleteContext } from './Provider'
import { useLocation } from 'wouter'

export function WebhookRemoval(): JSX.Element | null {
  const {
    state: { data },
    deleteWebhook
  } = useWebhookDeleteContext()
  const [_, setLocation] = useLocation()

  if (data == null || data.shared_secret == null) {
    return null
  }

  return (
    <ListDetails>
      <Spacer bottom='6'>
        <Text variant='info' weight='medium'>
          This action cannot be undone, proceed with caution.
        </Text>
      </Spacer>
      <Button
        variant='danger'
        size='small'
        onClick={(e) => {
          e.stopPropagation()
          deleteWebhook()
            .then(() => {
              setLocation(appRoutes.list.makePath())
            })
            .catch((e: any) => {
              console.log(e)
            })
        }}
        data-test-id='list-task-item-btn-cancel'
      >
        Delete webhook
      </Button>
    </ListDetails>
  )
}
