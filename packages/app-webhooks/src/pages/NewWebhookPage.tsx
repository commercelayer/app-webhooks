import { appRoutes } from '#data/routes'
import {
  useCoreSdkProvider,
  PageSkeleton,
  PageLayout,
  useTokenProvider
} from '@commercelayer/core-app-elements'
import { useLocation, useRoute } from 'wouter'
import WebhookForm from '#components/Form/WebhookForm'

const NewWebhookPage = (): JSX.Element | null => {
  const { settings } = useTokenProvider()
  const { sdkClient } = useCoreSdkProvider()
  const [_match] = useRoute(appRoutes.newWebhook.path)
  const [_location, setLocation] = useLocation()

  if (sdkClient == null) {
    console.warn('Waiting for SDK client')
    return <PageSkeleton hasHeaderDescription />
  }

  return (
    <PageLayout
      title='New webhook'
      mode={settings.mode}
      onGoBack={() => {
        setLocation(appRoutes.list.makePath())
      }}
    >
      <WebhookForm />
    </PageLayout>
  )
}

export default NewWebhookPage
