import { useEffect, useState } from 'react'
import { getAllRelationshipsForSelect } from '#data/relationships'
import type { SelectValue } from '@commercelayer/core-app-elements'
import type { ResourceEventKey } from '#data/events'
import type { ResourceRelationshipKey } from '#data/relationships'
import { InputSelect, flatSelectValues } from '@commercelayer/core-app-elements'

interface Props {
  parentResource?: ResourceEventKey
  selectedRelationships?: ResourceRelationshipKey[]
  helperText?: React.ReactNode
  onSelect: (relationships: string[]) => void
}

export function RelationshipSelector({
  parentResource,
  selectedRelationships,
  helperText = 'List of resources to be included in the webhook payload.',
  onSelect
}: Props): JSX.Element | null {
  const [relationships, setRelationships] = useState<SelectValue[]>([])

  useEffect(
    function updateFilteredRelationships() {
      const filteredRelationships = getAllRelationshipsForSelect(parentResource)
      setRelationships(filteredRelationships)
    },
    [parentResource]
  )

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
        isDisabled={relationships.length === 0}
        isClearable
        isMulti
        label='Include'
        helperText={helperText}
      />
    </div>
  )
}
