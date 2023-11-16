import { EventCallbacksListItems } from '#components/Common/EventCallbacksListItems'
import { appRoutes } from '#data/routes'
import { formatDistanceInWords } from '#utils/formatDistanceInWords'
import {
  Badge,
  Button,
  Card,
  List,
  ListDetails,
  Spacer,
  Text,
  useTokenProvider
} from '@commercelayer/app-elements'
import { useLocation } from 'wouter'
import { useWebhookDetailsContext } from './Provider'

export function WebhookCircuit(): JSX.Element | null {
  const { canUser, user } = useTokenProvider()
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

  const [, setLocation] = useLocation()
  const webhookPreviewEventCallbacks = data.last_event_callbacks?.slice(0, 5)
  const isCircuitOpen = data.circuit_state === 'open'
  const lastFiredDate =
    data.last_event_callbacks?.slice(0, 1)?.[0]?.created_at ?? false
  const lastFired =
    Boolean(lastFiredDate) &&
    formatDistanceInWords(
      data.last_event_callbacks?.slice(0, 1)?.[0]?.created_at ?? '',
      user?.timezone
    )

  const buttonStyle = {
    alignSelf: 'baseline'
  }

  return (
    <ListDetails>
      <Spacer bottom='4'>
        <Card overflow='visible'>
          <div className='flex justify-between'>
            <div>
              <Spacer bottom='2'>
                <div className='flex gap-2'>
                  <Text weight='bold'>Circuit {data.circuit_state}</Text>
                  {isCircuitOpen && <Badge variant='danger'>failed</Badge>}
                  {!isCircuitOpen && <Badge variant='success'>enabled</Badge>}
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
            {data.last_event_callbacks != null &&
              data.last_event_callbacks.length > 5 && (
                <Spacer top='4'>
                  <a
                    onClick={() => {
                      setLocation(
                        appRoutes.webhookEventCallbacks.makePath(data.id)
                      )
                    }}
                  >
                    View more
                  </a>
                </Spacer>
              )}
          </div>
        </Card>
      </Spacer>
    </ListDetails>
  )
}
