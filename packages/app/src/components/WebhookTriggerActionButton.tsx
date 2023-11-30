import {
  getWebhookTriggerAction,
  getWebhookTriggerActionName
} from '#data/dictionaries'
import { useTriggerAttribute } from '#hooks/useTriggerAttribute'
import { Button } from '@commercelayer/app-elements'
import type { Webhook } from '@commercelayer/sdk'

import type { FC } from 'react'

interface WebhookTriggerActionButtonProps {
  webhook: Webhook
}

export const WebhookTriggerActionButton: FC<
  WebhookTriggerActionButtonProps
> = ({ webhook }) => {
  const triggerAction = getWebhookTriggerAction(webhook)
  const label = getWebhookTriggerActionName(triggerAction.triggerAttribute)
  const { isLoading, dispatch } = useTriggerAttribute(webhook.id)

  return (
    <Button
      disabled={isLoading}
      size='small'
      variant='primary'
      onClick={() => {
        void dispatch(triggerAction.triggerAttribute)
      }}
      style={{
        alignSelf: 'baseline'
      }}
    >
      {label}
    </Button>
  )
}
