import { getAllRelationshipsForSelect } from '#data/relationships'
import type { SelectValue } from '@commercelayer/core-app-elements'
import { InputSelect, flatSelectValues } from '@commercelayer/core-app-elements'

interface Props {
  selectedRelationships?: string[]
  helperText?: React.ReactNode
  onSelect: (relationships: string[]) => void
}

export function RelationshipSelector({
  selectedRelationships,
  helperText = 'List of resources to be included in the webhook payload.',
  onSelect
}: Props): JSX.Element | null {
  const relationships = getAllRelationshipsForSelect()

  const defaultValue: SelectValue[] | undefined = selectedRelationships?.map(
    (r) => {
      return {
        value: r,
        label: r
      }
    }
  )

  return (
    <div>
      <InputSelect
        initialValues={relationships}
        defaultValue={defaultValue}
        onSelect={(relationships) => {
          const values = flatSelectValues(relationships)
          if (values == null) {
            onSelect([])
            return
          }
          if (Array.isArray(values)) {
            onSelect(values.map(String))
            return
          }
          if (typeof values === 'string') {
            onSelect([values])
          }
        }}
        isClearable
        isMulti
        label='Include'
        helperText={helperText}
      />
    </div>
  )
}
