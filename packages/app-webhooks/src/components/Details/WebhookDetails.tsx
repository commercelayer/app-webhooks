import { ListDetailsItem, ListDetails } from '@commercelayer/core-app-elements'
import { useWebhookDetailsContext } from './Provider'
import { WebhookDate } from './WebhookDate'

export function WebhookDetails(): JSX.Element | null {
  const {
    state: { data }
  } = useWebhookDetailsContext()

  if (data == null) {
    return null
  }

  return (
    <ListDetails title='Details'>
      {data.topic != null ? (
        <ListDetailsItem label='Topic' hasGutter>
          {data.topic}
        </ListDetailsItem>
      ) : null}
      {data.callback_url != null ? (
        <ListDetailsItem label='Callback URL' hasGutter>
          {data.callback_url}
        </ListDetailsItem>
      ) : null}
      {data.include_resources != null && data.include_resources.length > 0 ? (
        <ListDetailsItem label='Includes' hasGutter>
          {data.include_resources.join(', ')}
        </ListDetailsItem>
      ) : null}
      <ListDetailsItem label='Updated at' hasGutter>
        <WebhookDate atType='updated_at' includeTime />
      </ListDetailsItem>
    </ListDetails>
  )
}
