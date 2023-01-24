import { getAllEventsForSelect } from '#data/events'
import type { SelectValue } from '@commercelayer/core-app-elements'
import type { ResourceEventKey } from '#data/events'
import { InputSelect, flatSelectValues } from '@commercelayer/core-app-elements'

interface Props {
  selectedEvent?: ResourceEventKey
  helperText?: React.ReactNode
  onSelect: (event: ResourceEventKey) => void
}

export function EventSelector({
  selectedEvent,
  helperText,
  onSelect
}: Props): JSX.Element | null {
  const events = getAllEventsForSelect()

  const defaultValue: SelectValue | undefined =
    selectedEvent != null
      ? {
          value: selectedEvent,
          label: selectedEvent
        }
      : undefined

  return (
    <div>
      <InputSelect
        initialValues={events}
        defaultValue={defaultValue}
        onSelect={(event) => {
          const value = flatSelectValues(event)
          onSelect(value as ResourceEventKey)
        }}
        isClearable
        label='Topic'
        helperText={helperText}
      />
    </div>
  )
}
