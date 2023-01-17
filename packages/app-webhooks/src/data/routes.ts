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
    path: '/edit/:webhookId',
    makePath: (webhookId: string) => `/edit/${webhookId}`
  },
  details: {
    path: '/details/:webhookId',
    makePath: (webhookId: string) => `/details/${webhookId}/`
  }
}
