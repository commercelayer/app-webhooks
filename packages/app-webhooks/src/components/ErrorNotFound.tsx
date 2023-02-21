import { appRoutes } from '#data/routes'
import {
  useTokenProvider,
  Button,
  EmptyState,
  PageLayout
} from '@commercelayer/app-elements'
import { Link, useLocation } from 'wouter'

export function ErrorNotFound(): JSX.Element {
  const { settings } = useTokenProvider()
  const [_, setLocation] = useLocation()

  return (
    <PageLayout
      title='Webhooks'
      mode={settings.mode}
      onGoBack={() => {
        setLocation(appRoutes.list.makePath())
      }}
    >
      <EmptyState
        title='Not found'
        description='We could not find the resource you are looking for.'
        action={
          <Link href={appRoutes.list.makePath()}>
            <Button variant='primary'>Go back</Button>
          </Link>
        }
      />
    </PageLayout>
  )
}
