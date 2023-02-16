import { getAllEventsForSelect } from '#data/events'
import { InputSelect } from '@commercelayer/app-elements-hook-form'
import type { HintProps } from '@commercelayer/core-app-elements/dist/ui/atoms/Hint'

interface Props {
  name: string
  hintText?: HintProps['children']
}

export function EventSelector({ name, hintText }: Props): JSX.Element | null {
  const events = getAllEventsForSelect()

  return (
    <InputSelect
      name={name}
      initialValues={events}
      isClearable
      label='Topic'
      hint={{ text: hintText }}
    />
  )
}
