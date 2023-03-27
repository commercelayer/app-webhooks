import { appRoutes } from '#data/routes'
import { useLocation } from 'wouter'
import { EventCallbacksListItems } from '#components/Common/EventCallbacksListItems'
import {
  useTokenProvider,
  A,
  Badge,
  Button,
  Card,
  ListDetails,
  Spacer,
  Text,
  List
} from '@commercelayer/app-elements'
import { formatDistanceInWords } from '#utils/formatDistanceInWords'
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
  const lastFiredDate =
    data.last_event_callbacks.slice(0, 1)[0].created_at ?? false
  const lastFired =
    Boolean(lastFiredDate) &&
    formatDistanceInWords(
      data.last_event_callbacks.slice(0, 1)[0].created_at ?? ''
    )

  const buttonStyle = {
    alignSelf: 'baseline'
  }

  return (
    <ListDetails>
      <Spacer bottom='4'>
        <Card>
          <div className='flex justify-between'>
            <div>
              <Spacer bottom='2'>
                <div className='flex gap-2'>
                  <Text weight='bold'>Circuit {data.circuit_state}</Text>
                  {isCircuitOpen && <Badge variant='danger' label='failed' />}
                  {!isCircuitOpen && (
                    <Badge variant='success' label='enabled' />
                  )}
                </div>
              </Spacer>
              {isCircuitOpen && (
                <Spacer bottom='2'>
                  <Text variant='danger' size='small' weight='bold'>
                    No further callbacks are performed until reset.
                  </Text>
                </Spacer>
              )}
              {!isCircuitOpen && (
                <Spacer bottom='2'>
                  <Text variant='info' size='small' weight='medium'>
                    Last fired {lastFired}.
                  </Text>
                </Spacer>
              )}
            </div>
            {isCircuitOpen && (
              <Button
                size='small'
                variant='primary'
                onClick={() => {
                  void resetWebhookCircuit()
                }}
                style={buttonStyle}
              >
                Reset
              </Button>
            )}
          </div>
          <div className='CardContent'>
            <List>
              <EventCallbacksListItems
                eventCallbacks={webhookPreviewEventCallbacks}
              />
            </List>
            {data.last_event_callbacks.length > 5 && (
              <Spacer top='4'>
                <A
                  onClick={() => {
                    setLocation(
                      appRoutes.webhookEventCallbacks.makePath(data.id)
                    )
                  }}
                >
                  View more
                </A>
              </Spacer>
            )}
          </div>
        </Card>
      </Spacer>
    </ListDetails>
  )
}
