import { appRoutes } from '#data/routes'
import { EventCallbacksTable } from '#components/Common/EventCallbacksTable'
import {
  useTokenProvider,
  A,
  Badge,
  Button,
  Card,
  ListDetails,
  Spacer,
  Text
} from '@commercelayer/app-elements'
import { useLocation } from 'wouter'
import { useWebhookDetailsContext } from './Provider'

export function WebhookCircuit(): JSX.Element | null {
  const { canUser } = useTokenProvider()
  const {
    state: { data },
    resetWebhookCircuit
  } = useWebhookDetailsContext()

  if (
    data == null ||
    data.last_event_callbacks === undefined ||
    !canUser('read', 'event_callbacks')
  ) {
    return null
  }

  const [_, setLocation] = useLocation()
  const webhookPreviewEventCallbacks = data.last_event_callbacks.slice(0, 5)
  const isCircuitOpen = data.circuit_state === 'open'

  return (
    <ListDetails>
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
                  <Text variant='danger' size='small' weight='bold'>
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
                className='border-t border-gray-100'
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
