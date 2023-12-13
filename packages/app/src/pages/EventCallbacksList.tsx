import { ListItemEvenCallback } from '#components/ListItemEventCallback'
import { appRoutes } from '#data/routes'
import {
  Button,
  EmptyState,
  PageLayout,
  PageSkeleton,
  ResourceList,
  useCoreSdkProvider,
  useTokenProvider
} from '@commercelayer/app-elements'
import type { FC } from 'react'
import { Link, useLocation, useRoute } from 'wouter'

export const EventCallbacksList: FC = () => {
  const { settings, canUser } = useTokenProvider()
  const { sdkClient } = useCoreSdkProvider()
  const [, setLocation] = useLocation()
  const [, params] = useRoute(appRoutes.webhookEventCallbacks.path)

  const webhookId = params == null ? null : params.webhookId

  if (
    webhookId == null ||
    !canUser('read', 'webhooks') ||
    !canUser('read', 'event_callbacks')
  ) {
    return (
      <PageLayout
        title='Event callbacks'
        onGoBack={() => {
          setLocation(appRoutes.list.makePath())
        }}
        mode={settings.mode}
      >
        <EmptyState
          title='Not authorized'
          action={
            <Link href={appRoutes.list.makePath()}>
              <Button variant='primary'>Go back</Button>
            </Link>
          }
        />
      </PageLayout>
    )
  }

  if (sdkClient == null) {
    return <PageSkeleton />
  }

  return (
    <PageLayout
      title='Event Callbacks'
      mode={settings.mode}
      onGoBack={() => {
        setLocation(appRoutes.details.makePath(webhookId))
      }}
    >
      <ResourceList
        type='event_callbacks'
        query={{
          filters: { webhook_id_eq: webhookId }
        }}
        title='All event callbacks'
        emptyState={<EmptyState title='No event callbacks yet!' />}
        ItemTemplate={ListItemEvenCallback}
      />
      {/* <EventCallbacksListItems eventCallbacks={list} /> */}
    </PageLayout>
  )
}
