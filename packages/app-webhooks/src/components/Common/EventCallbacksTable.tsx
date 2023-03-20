import {
  useTokenProvider,
  downloadJsonAsFile,
  A,
  Hint,
  StatusDot,
  Table,
  Tr,
  Td,
  Text
} from '@commercelayer/app-elements'
import { EventCallback } from '@commercelayer/sdk'
import { formatDateAndTime } from '#utils/formatDateAndTime'
import { eventCallbackStatusVariant } from '#utils/eventCallbackStatusVariant'

interface Props {
  eventCallbacks?: EventCallback[]
  className?: string
}

export function EventCallbacksTable({
  eventCallbacks,
  className
}: Props): JSX.Element {
  if (eventCallbacks == null) {
    return <></>
  }

  const {
    settings: { timezone }
  } = useTokenProvider()

  const tableRows = eventCallbacks.map((event) => {
    const eventCallbackStatusVariantVariant = eventCallbackStatusVariant(event)

    return (
      <Tr key={event.id}>
        <Td>
          <div className='flex items-center gap-2'>
            <StatusDot variant={eventCallbackStatusVariantVariant} />
            <span className='font-bold'>{event.response_code}</span>
          </div>
          <Hint>{event.response_message}</Hint>
        </Td>
        <Td>
          <Text variant='info' weight='medium'>
            {formatDateAndTime(event.created_at, timezone).date}
          </Text>
          <Hint>{formatDateAndTime(event.created_at).time}</Hint>
        </Td>
        <Td>
          <div>
            <A
              onClick={() =>
                downloadJsonAsFile({
                  json: event.payload,
                  filename: `${event.id}.json`
                })
              }
            >
              payload
            </A>
          </div>
          <Hint>JSON</Hint>
        </Td>
      </Tr>
    )
  })

  return <Table className={className} tbody={tableRows} />
}
