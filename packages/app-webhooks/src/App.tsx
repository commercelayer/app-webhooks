import { ErrorNotFound } from '#components/ErrorNotFound'
import { appRoutes } from '#data/routes'
import { Router, Route, Switch } from 'wouter'
import ListPage from '#pages/ListPage'
import {
  PageSkeleton,
  TokenProvider,
  CoreSdkProvider,
  ErrorBoundary
} from '@commercelayer/app-elements'
import DetailsPage from '#pages/DetailsPage'
import NewWebhookPage from '#pages/NewWebhookPage'
import EventCallbacksPage from '#pages/EventCallbacksPage'
import EditWebhookPage from '#pages/EditWebhookPage'
import DeleteWebhookPage from '#pages/DeleteWebhookPage'

const isDev = Boolean(import.meta.env.DEV)

function App(): JSX.Element {
  const basePath =
    import.meta.env.PUBLIC_PROJECT_PATH != null
      ? `/${import.meta.env.PUBLIC_PROJECT_PATH}`
      : undefined

  return (
    <ErrorBoundary hasContainer>
      <TokenProvider
        appSlug='webhooks'
        kind='webhooks'
        domain={window.clAppConfig.domain}
        reauthenticateOnInvalidAuth={!isDev}
        loadingElement={<PageSkeleton />}
        devMode
      >
        <CoreSdkProvider>
          <Router base={basePath}>
            <Switch>
              <Route path={appRoutes.list.path}>
                <ListPage />
              </Route>
              <Route path={appRoutes.newWebhook.path}>
                <NewWebhookPage />
              </Route>
              <Route path={appRoutes.editWebhook.path}>
                <EditWebhookPage />
              </Route>
              <Route path={appRoutes.deleteWebhook.path}>
                <DeleteWebhookPage />
              </Route>
              <Route path={appRoutes.webhookEventCallbacks.path}>
                <EventCallbacksPage />
              </Route>
              <Route path={appRoutes.details.path}>
                <DetailsPage />
              </Route>
              <Route>
                <ErrorNotFound />
              </Route>
            </Switch>
          </Router>
        </CoreSdkProvider>
      </TokenProvider>
    </ErrorBoundary>
  )
}

export default App
