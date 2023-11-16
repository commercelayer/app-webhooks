import { appRoutes } from '#data/routes'
import { Button, ListDetails, Spacer, Text } from '@commercelayer/app-elements'
import { useLocation } from 'wouter'
import { useWebhookDeleteContext } from './Provider'

export function WebhookRemoval(): JSX.Element | null {
  const {
    state: { data },
    deleteWebhook
  } = useWebhookDeleteContext()
  const [, setLocation] = useLocation()

  if (data?.shared_secret == null) {
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