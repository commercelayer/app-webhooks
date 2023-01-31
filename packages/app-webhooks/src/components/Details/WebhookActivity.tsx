import { EventCallbacksTable } from '#components/Common/EventCallbacksTable'
import {
  A,
  Badge,
  Button,
  Card,
  ListDetails,
  Spacer,
  Text
} from '@commercelayer/core-app-elements'
import { useWebhookDetailsContext } from './Provider'

export function WebhookActivity(): JSX.Element | null {
  const {
    state: { data },
    resetWebhookCircuit
  } = useWebhookDetailsContext()

  if (data == null || data.last_event_callbacks === undefined) {
    return null
  }

  const webhookPreviewEventCallbacks = data.last_event_callbacks.slice(0, 5)

  return (
    <ListDetails title='Activity'>
      <Spacer bottom='4'>
        <Card>
          <Spacer bottom='4'>
            <div className='flex justify-between'>
              <div>
                <Spacer bottom='2'>
                  <div className='flex gap-2'>
                    <span className='font-bold'>
                      Circuit {data.circuit_state}
                    </span>
                    {data.circuit_state === 'open' && (
                      <Badge variant='danger' label='failed' />
                    )}
                  </div>
                </Spacer>
                {data.circuit_state === 'open' && (
                  <Text className='text-sm font-bold' variant='danger'>
                    No further callbacks are performed until reset.
                  </Text>
                )}
              </div>
              {data.circuit_state === 'open' && (
                <Button
                  size='small'
                  variant='primary'
                  onClick={() => {
                    void resetWebhookCircuit()
                  }}
                >
                  Reset
                </Button>
              )}
            </div>
          </Spacer>
          <div className='CardContent'>
            <Spacer bottom='4'>
              <EventCallbacksTable
                eventCallbacks={webhookPreviewEventCallbacks}
              />
            </Spacer>
            {data.last_event_callbacks.length > 5 && <A>View more</A>}
          </div>
        </Card>
      </Spacer>
    </ListDetails>
  )
}
