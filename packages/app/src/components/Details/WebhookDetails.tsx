import { ListItem, Section, Text } from '@commercelayer/app-elements'
import { useWebhookDetailsContext } from './Provider'

export function WebhookDetails(): JSX.Element | null {
  const {
    state: { data }
  } = useWebhookDetailsContext()

  if (data == null) {
    return null
  }

  return (
    <Section title='Info'>
      {data.topic != null ? (
        <ListItem tag='div'>
          <Text variant='info'>Topic</Text>
          <Text weight='bold'>{data.topic}</Text>
        </ListItem>
      ) : null}
      {data.include_resources != null && data.include_resources.length > 0 ? (
        <ListItem tag='div'>
          <Text variant='info'>Includes</Text>
          <Text weight='bold'>{data.include_resources.join(', ')}</Text>
        </ListItem>
      ) : null}
    </Section>
  )
}
