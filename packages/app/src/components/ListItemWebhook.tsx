import { appRoutes } from '#data/routes'
import { makeWebhook } from '#mocks'
import { formatDistanceInWords } from '#utils/formatDistanceInWords'
import {
  Hint,
  Icon,
  ListItem,
  Text,
  useTokenProvider
} from '@commercelayer/app-elements'
import type { Webhook } from '@commercelayer/sdk'
import type { FC } from 'react'
import { useLocation } from 'wouter'

type WebhookListUiIcon = 'x' | 'check'

type WebhookListUiIconBg = 'red' | 'green'

/**
 * Get the relative status based on webhook's circuit state {@link https://docs.commercelayer.io/core/v/api-reference/webhooks/object}
 * @param webhook - The webhook object.
 * @returns a valid StatusUI to be used in the StatusIcon component.
 */
function getListUiIcon(webhook: Webhook): {
  icon: WebhookListUiIcon
  bg: WebhookListUiIconBg
} {
  return webhook?.circuit_state === 'open'
    ? { icon: 'x', bg: 'red' }
    : { icon: 'check', bg: 'green' }
}

interface ListItemWebhookProps {
  resource?: Webhook
  isLoading?: boolean
  delayMs?: number
}

export const ListItemWebhook: FC<ListItemWebhookProps> = ({
  resource = makeWebhook()
}) => {
  const [, setLocation] = useLocation()

  return (
    <ListItem
      className='items-center'
      tag='div'
      icon={
        <Icon
          name={getListUiIcon(resource).icon}
          gap='large'
          background={getListUiIcon(resource).bg}
        />
      }
      onClick={() => {
        setLocation(appRoutes.details.makePath(resource.id))
      }}
    >
      <div>
        <Text weight='bold'>{resource.name}</Text>
        <DescriptionLine webhook={resource} />
      </div>
      <Icon name='caretRight' />
    </ListItem>
  )
}

interface DescriptionLineProps {
  webhook: Webhook
}

const DescriptionLine: FC<DescriptionLineProps> = ({ webhook }) => {
  if (
    webhook.last_event_callbacks === undefined ||
    webhook.last_event_callbacks?.length === 0
  )
    return <Hint>Never fired</Hint>

  const { user } = useTokenProvider()

  const lastEventCallback =
    webhook.last_event_callbacks != null
      ? webhook.last_event_callbacks[0]
      : undefined

  const lastFiredAt = formatDistanceInWords(
    lastEventCallback?.created_at ?? '',
    user?.timezone
  )

  return <Hint>{`Last fired ${lastFiredAt}`}</Hint>
}
