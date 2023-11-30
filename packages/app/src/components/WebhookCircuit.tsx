import { ListItemEvenCallback } from '#components/ListItemEventCallback'
import { appRoutes } from '#data/routes'
import { List, Spacer } from '@commercelayer/app-elements'
import type { Webhook } from '@commercelayer/sdk'
import type { FC } from 'react'
import { useLocation } from 'wouter'

interface WebhookCircuitProps {
  webhook: Webhook
}

export const WebhookCircuit: FC<WebhookCircuitProps> = ({ webhook }) => {
  const [, setLocation] = useLocation()

  const webhookPreviewEventCallbacks = webhook.last_event_callbacks?.slice(0, 5)

  return (
    <>
      {webhookPreviewEventCallbacks != null && (
        <List>
          {webhookPreviewEventCallbacks.map((resource, idx) => (
            <ListItemEvenCallback key={idx} resource={resource} />
          ))}
        </List>
      )}
      {webhook.last_event_callbacks != null &&
        webhook.last_event_callbacks.length > 5 && (
          <Spacer top='4'>
            <a
              onClick={() => {
                setLocation(
                  appRoutes.webhookEventCallbacks.makePath(webhook.id)
                )
              }}
            >
              View more
            </a>
          </Spacer>
        )}
    </>
  )
}
