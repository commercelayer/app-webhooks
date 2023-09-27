import {
  useTokenProvider,
  downloadJsonAsFile,
  A,
  Badge,
  ListItem,
  Text,
  Spacer
} from '@commercelayer/app-elements'
import type { EventCallback } from '@commercelayer/sdk'
import { formatDateAndTime } from '#utils/formatDateAndTime'
import { eventCallbackStatusVariant } from '#utils/eventCallbackStatusVariant'
import { ArrowCircleDown } from 'phosphor-react'

interface Props {
  eventCallbacks?: EventCallback[]
  className?: string
}

export function EventCallbacksListItems({
  eventCallbacks
}: Props): JSX.Element {
  if (eventCallbacks == null) {
    return <></>
  }

  const { user } = useTokenProvider()

  const tableRows = eventCallbacks.map((event, key) => {
    const eventCallbackStatusVariantVariant = eventCallbackStatusVariant(event)

    const firedAt = ` · ${
      formatDateAndTime(event.created_at, user?.timezone).date
    } · ${formatDateAndTime(event.created_at, user?.timezone).time}`

    return (
      <ListItem key={key} alignItems='center' tag='div'>
        <div className='flex gap-1 items-center'>
          <Spacer right='2'>
            <Badge
              variant={eventCallbackStatusVariantVariant}
              label={event.response_code ?? ''}
            />
          </Spacer>
          <Text weight='bold' size='small'>
            {event.response_message}
          </Text>
          <Text weight='medium' size='small' variant='info'>
            {firedAt}
          </Text>
        </div>
        <div>
          <A
            onClick={() => {
              downloadJsonAsFile({
                json: event.payload ?? undefined,
                filename: `${event.id}.json`
              })
            }}
          >
            <ArrowCircleDown size={22} />
          </A>
        </div>
      </ListItem>
    )
  })

  return <>{tableRows}</>
}
