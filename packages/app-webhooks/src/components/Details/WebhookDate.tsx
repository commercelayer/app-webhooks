import { useWebhookDetailsContext } from '#components/Details/Provider'
import { formatDate } from '@commercelayer/app-elements'

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  atType: 'updated_at'
  prefixText?: string
  includeTime?: boolean
}

export function WebhookDate({
  atType,
  prefixText,
  includeTime,
  ...props
}: Props): JSX.Element | null {
  const {
    state: { data }
  } = useWebhookDetailsContext()

  if (data == null) {
    return null
  }
  return (
    <span {...props}>
      {prefixText} {formatDate(data[atType], includeTime)}
    </span>
  )
}
