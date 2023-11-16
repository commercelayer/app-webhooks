export type AppRoute = keyof typeof appRoutes

// Object to be used as source of truth to handel application routes
// each page should correspond to a key and each key should have
// a `path` property to be used as patter matching in <Route path> component
// and `makePath` method to be used to generate the path used in navigation and links
export const appRoutes = {
  list: {
    path: '/',
    makePath: () => '/'
  },
  newWebhook: {
    path: '/new',
    makePath: () => '/new'
  },
  editWebhook: {
    path: '/:webhookId/edit',
    makePath: (webhookId: string) => `/${webhookId}/edit`
  },
  deleteWebhook: {
    path: '/:webhookId/delete',
    makePath: (webhookId: string) => `/${webhookId}/delete`
  },
  webhookEventCallbacks: {
    path: '/:webhookId/event_callbacks',
    makePath: (webhookId: string) => `/${webhookId}/event_callbacks`
  },
  details: {
    path: '/:webhookId',
    makePath: (webhookId: string) => `/${webhookId}`
  }
}