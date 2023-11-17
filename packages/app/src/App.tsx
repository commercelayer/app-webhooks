import { ErrorNotFound } from '#components/ErrorNotFound'
import { appRoutes } from '#data/routes'
import DeleteWebhookPage from '#pages/DeleteWebhookPage'
import DetailsPage from '#pages/DetailsPage'
import EditWebhookPage from '#pages/EditWebhookPage'
import EventCallbacksPage from '#pages/EventCallbacksPage'
import ListPage from '#pages/ListPage'
import NewWebhookPage from '#pages/NewWebhookPage'
import {
  CoreSdkProvider,
  ErrorBoundary,
  GTMProvider,
  MetaTags,
  PageSkeleton,
  TokenProvider
} from '@commercelayer/app-elements'
import { Route, Router, Switch } from 'wouter'

const isDev = Boolean(import.meta.env.DEV)

function App(): JSX.Element {
  const basePath =
    import.meta.env.PUBLIC_PROJECT_PATH != null
      ? `/${import.meta.env.PUBLIC_PROJECT_PATH}`
      : undefined

  return (
    <ErrorBoundary hasContainer>
      <TokenProvider
        kind='webhooks'
        appSlug='webhooks'
        domain={window.clAppConfig.domain}
        reauthenticateOnInvalidAuth={!isDev}
        devMode={isDev}
        loadingElement={<PageSkeleton />}
        organizationSlug={import.meta.env.PUBLIC_SELF_HOSTED_SLUG}
      >
        <GTMProvider gtmId={window.clAppConfig.gtmId}>
          <MetaTags />
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
        </GTMProvider>
      </TokenProvider>
    </ErrorBoundary>
  )
}

export default App
