import {
  downloadJsonAsFile,
  A,
  StatusDot,
  Table,
  Tr,
  Td,
  Text
} from '@commercelayer/core-app-elements'
import { EventCallback } from '@commercelayer/sdk'
import { getTimeAgoString } from '#utils/timeAgo'

interface Props {
  eventCallbacks?: EventCallback[]
  hideTopBorder?: boolean
}

export function EventCallbacksTable({
  eventCallbacks,
  hideTopBorder = false
}: Props): JSX.Element {
  if (eventCallbacks == null) {
    return <></>
  }

  const tableHead = hideTopBorder ? <></> : undefined

  const tableRows = eventCallbacks.map((event) => {
    return (
      <Tr key={event.id}>
        <Td>
          <div className='flex items-center gap-2'>
            <StatusDot
              variant={event.response_code === '200' ? 'success' : 'danger'}
            />
            <span className='font-bold'>{event.response_code}</span>
          </div>
        </Td>
        <Td>
          <Text variant='info'>{getTimeAgoString(event.created_at)}</Text>
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

  return <Table thead={tableHead} tbody={tableRows} />
}
