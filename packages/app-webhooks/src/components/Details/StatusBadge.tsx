import { Badge } from '@commercelayer/core-app-elements'
import { BadgeVariant } from '@commercelayer/core-app-elements/dist/ui/atoms/Badge'
import { Export } from '@commercelayer/sdk'

interface Props {
  job: Export
}

export function StatusBadge({ job }: Props): JSX.Element {
  return (
    <div>
      <Badge {...getUiStatusVariant(job.status)} />
    </div>
  )
}

function getUiStatusVariant(apiStatus?: string): {
  variant: BadgeVariant
  label: string
} {
  if (apiStatus === 'in_progress') {
    return {
      variant: 'primary',
      label: 'in progress'
    }
  }

  if (apiStatus === 'interrupted') {
    return {
      variant: 'danger',
      label: 'interrupted'
    }
  }

  if (apiStatus === 'completed') {
    return {
      variant: 'success',
      label: 'completed'
    }
  }

  if (apiStatus === 'pending') {
    return {
      variant: 'secondary',
      label: 'pending'
    }
  }

  return {
    variant: 'secondary',
    label: apiStatus ?? 'N/A'
  }
}
