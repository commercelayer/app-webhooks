import { ListDetailsItem, ListDetails } from '@commercelayer/app-elements'
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
        <ListDetailsItem label='Topic' childrenAlign='right'>
          {data.topic}
        </ListDetailsItem>
      ) : null}
      {data.include_resources != null && data.include_resources.length > 0 ? (
        <ListDetailsItem label='Includes' childrenAlign='right'>
          {data.include_resources.join(', ')}
        </ListDetailsItem>
      ) : null}
    </ListDetails>
  )
}
