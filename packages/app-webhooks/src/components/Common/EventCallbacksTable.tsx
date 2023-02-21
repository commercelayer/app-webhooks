import {
  downloadJsonAsFile,
  A,
  StatusDot,
  Table,
  Tr,
  Td,
  Text
} from '@commercelayer/app-elements'
import { EventCallback } from '@commercelayer/sdk'
import { formatDistanceInWords } from '#utils/formatDistanceInWords'
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

  const tableRows = eventCallbacks.map((event) => {
    const eventCallbackStatusVariantVariant = eventCallbackStatusVariant(event)

    return (
      <Tr key={event.id}>
        <Td>
          <div className='flex items-center gap-2'>
            <StatusDot variant={eventCallbackStatusVariantVariant} />
            <span className='font-bold'>{event.response_code}</span>
          </div>
        </Td>
        <Td>
          <Text variant='info' weight='medium'>
            {formatDistanceInWords(event.created_at)}
          </Text>
        </Td>
        <Td>
          <div className='text-right'>
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
        </Td>
      </Tr>
    )
  })

  return <Table className={className} tbody={tableRows} />
}
