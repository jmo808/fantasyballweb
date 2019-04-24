/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/dashboard',
    // Relative to /src/views
    view: 'Dashboard',
    meta: {}
  },
  {
    path: '/players',
    name: 'Players',
    view: 'Players',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    view: 'Login'
  },
  {
    path: '/users',
    name: 'Users',
    view: 'Users',
    meta: {
      requiresAuth: true
    }
  }
]
