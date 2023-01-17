import { getAllEventsForSelect } from '#data/events'
import type { SelectValue } from '@commercelayer/core-app-elements'
import { InputSelect, flatSelectValues } from '@commercelayer/core-app-elements'

interface Props {
  selectedEvent?: string
  helperText?: React.ReactNode
  onSelect: (event: string) => void
}

export function EventSelector({
  selectedEvent,
  helperText,
  onSelect
}: Props): JSX.Element | null {
  const events = getAllEventsForSelect()

  const defaultValue: SelectValue = {
    value: selectedEvent as string,
    label: selectedEvent as string
  }

  return (
    <div>
      <InputSelect
        initialValues={events}
        defaultValue={defaultValue}
        onSelect={(event) => {
          const value = flatSelectValues(event)
          onSelect(value as string)
        }}
        isClearable
        label='Topic'
        helperText={helperText}
      />
    </div>
  )
}
