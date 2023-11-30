import { appRoutes } from '#data/routes'
import {
  Button,
  EmptyState,
  PageLayout,
  useTokenProvider
} from '@commercelayer/app-elements'
import type { FC } from 'react'
import { Link, useLocation } from 'wouter'

export const ErrorNotFound: FC = () => {
  const { settings } = useTokenProvider()
  const [, setLocation] = useLocation()

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
