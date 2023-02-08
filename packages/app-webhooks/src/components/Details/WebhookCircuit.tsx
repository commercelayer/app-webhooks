import { appRoutes } from '#data/routes'
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
import { useLocation } from 'wouter'
import { useWebhookDetailsContext } from './Provider'

export function WebhookCircuit(): JSX.Element | null {
  const {
    state: { data },
    resetWebhookCircuit
  } = useWebhookDetailsContext()

  if (data == null || data.last_event_callbacks === undefined) {
    return null
  }

  const [_, setLocation] = useLocation()
  const webhookPreviewEventCallbacks = data.last_event_callbacks.slice(0, 5)
  const isCircuitOpen = data.circuit_state === 'open'

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
                    {isCircuitOpen && <Badge variant='danger' label='failed' />}
                  </div>
                </Spacer>
                {isCircuitOpen && (
                  <Text className='text-sm font-bold' variant='danger'>
                    No further callbacks are performed until reset.
                  </Text>
                )}
              </div>
              {isCircuitOpen && (
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
            {data.last_event_callbacks.length > 5 && (
              <A
                onClick={() => {
                  setLocation(appRoutes.webhookEventCallbacks.makePath(data.id))
                }}
              >
                View more
              </A>
            )}
          </div>
        </Card>
      </Spacer>
    </ListDetails>
  )
}