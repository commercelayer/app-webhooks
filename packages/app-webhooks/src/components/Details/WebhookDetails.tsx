import { ListDetailsItem, ListDetails } from '@commercelayer/core-app-elements'
import { useWebhookDetailsContext } from './Provider'

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
        <ListDetailsItem label='Topic'>{data.topic}</ListDetailsItem>
      ) : null}
      {data.include_resources != null && data.include_resources.length > 0 ? (
        <ListDetailsItem label='Includes'>
          {data.include_resources.join(', ')}
        </ListDetailsItem>
      ) : null}
    </ListDetails>
  )
}
