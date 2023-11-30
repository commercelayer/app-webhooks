import { getWebhookDisplayStatus } from '#data/dictionaries'
import { appRoutes } from '#data/routes'
import { useWebhookDetails } from '#hooks/useWebhookDetails'
import { formatDistanceInWords } from '#utils/formatDistanceInWords'
import {
  Badge,
  Card,
  ListDetails,
  Spacer,
  Text,
  useTokenProvider
} from '@commercelayer/app-elements'
import type { FC } from 'react'
import { useRoute } from 'wouter'
import { WebhookCircuit } from './WebhookCircuit'
import { WebhookTriggerActionButton } from './WebhookTriggerActionButton'

export const WebhookTopCard: FC = () => {
  const { canUser, user } = useTokenProvider()
  const [, params] = useRoute(appRoutes.details.path)
  const webhookId = params?.webhookId ?? ''
  const { webhook } = useWebhookDetails(webhookId)

  if (
    webhook == null ||
    webhook.last_event_callbacks === undefined ||
    !canUser('read', 'event_callbacks')
  ) {
    return null
  }

  const isCircuitOpen = webhook.circuit_state === 'open'
  const lastFiredDate =
    webhook.last_event_callbacks?.slice(0, 1)?.[0]?.created_at ?? null
  const lastFired =
    lastFiredDate != null
      ? formatDistanceInWords(lastFiredDate ?? '', user?.timezone)
      : null

  const displayStatus = getWebhookDisplayStatus(webhook)

  const showWebhookCircuit =
    webhook?.last_event_callbacks != null &&
    webhook?.last_event_callbacks.length > 0

  return (
    <ListDetails>
      <Spacer bottom='4'>
        <Card overflow='visible'>
          <div className='flex justify-between'>
            <div>
              <Spacer bottom='2'>
                <div className='flex gap-2'>
                  <Text weight='bold'>Webhook</Text>
                  <Badge variant={displayStatus.variant}>
                    {displayStatus.label}
                  </Badge>
                </div>
              </Spacer>
              {isCircuitOpen ? (
                <Spacer bottom='2'>
                  <Text variant='danger' size='small' weight='bold'>
                    No further callbacks are performed until reset.
                  </Text>
                </Spacer>
              ) : (
                <Spacer bottom='2'>
                  <Text variant='info' size='small' weight='medium'>
                    {lastFired != null
                      ? `Last fired ${lastFired}`
                      : 'Never fired'}
                    .
                  </Text>
                </Spacer>
              )}
            </div>
            <WebhookTriggerActionButton webhook={webhook} />
          </div>
          {showWebhookCircuit && <WebhookCircuit webhook={webhook} />}
        </Card>
      </Spacer>
    </ListDetails>
  )
}