import { appRoutes } from '#data/routes'
import {
  useCoreSdkProvider,
  Button,
  EmptyState,
  PageSkeleton,
  PageLayout,
  useTokenProvider
} from '@commercelayer/app-elements'
import { Link, useLocation, useRoute } from 'wouter'
import WebhookForm from '#components/Form/WebhookForm'

const NewWebhookPage = (): JSX.Element | null => {
  const { settings, canUser } = useTokenProvider()
  const { sdkClient } = useCoreSdkProvider()
  const [_match] = useRoute(appRoutes.newWebhook.path)
  const [_location, setLocation] = useLocation()

  if (sdkClient == null) {
    return <PageSkeleton hasHeaderDescription />
  }

  if (!canUser('create', 'webhooks')) {
    return (
      <PageLayout
        title='New webhook'
        mode={settings.mode}
        onGoBack={() => {
          setLocation(appRoutes.list.makePath())
        }}
      >
        <EmptyState
          title='You are not authorized'
          action={
            <Link href={appRoutes.list.makePath()}>
              <Button variant='primary'>Go back</Button>
            </Link>
          }
        />
      </PageLayout>
    )
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
