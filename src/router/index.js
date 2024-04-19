import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    // login view router, defines path and gives the 'executable' a name
    path: '/',
    name: 'LoginView',
    component: () => import('../views/LoginView.vue'),
    meta: { hideNavbar: true },
  },

  {
    // Calendar router, defines path and gives the 'executable' a name
    path: '/calendar',
    name: 'DesktopCalendarView',
    // creates a calendar component linked through a router to be used throughout the site
    component: () => import('../views/desktop/DesktopCalendarView.vue'),
    meta: { admin: true },
  },

  {
    // report Forms table route, defines path and gives the 'executable' a name
    path: '/reportFormTable',
    name: 'reportFormTableOutput',
    // creates a component linked through a router
    component: () => import('../views/desktop/ReportLogTable.vue'),
    meta: { admin: true },
  },

  {
    // Calendar router, defines path and gives the 'executable' a name
    path: '/reports',
    name: 'ReportLogView',
    // creates a report log view component linked through a router to be used throughout the site
    component: () => import('../views/desktop/ReportLogView.vue'),
    meta: { admin: true },
  },

  {
    // update log router, defines path and gives the 'executable' a name
    path: '/updates',
    name: 'UpdateLogView',
    // creates a updates log view component linked through a router to be used throughout the site
    component: () => import('../views/desktop/UpdateLogView.vue'),
    meta: { admin: true },
  },

  {
    // Elders view router, defines path and gives the 'executable' a name
    path: '/elders',
    name: 'EldersView',
    // creates a elders view component linked through a router to be used throughout the site
    component: () => import('../views/desktop/ClientsView.vue'),
    meta: { admin: true },
  },

  {
    // Driver list router, defines path and gives the 'executable' a name
    path: '/drivers',
    name: 'DriverListView',
    // creates a drivers view component linked through a router to be used throughout the site
    component: () => import('../views/desktop/DriverListView.vue'),
    meta: { admin: true },
   },

  // {    This component was removed, but the route still existed so commented out until this gets resolved
  //   path: '/driver',
  //   name: 'DriverHomeView',
  //   component: () => import('../views/driver/DriverHomeView.vue'),
  //   meta: { driver: true },
  // },

  {
    // Driver about page router, defines path and gives the 'executable' a name
    path: '/driver/about',
    name: 'DriverAboutView',
    // creates a driver component linked through a router to be used throughout the site
    component: () => import('../views/driver/DriverAboutView.vue'),
    meta: { driver: true },
  },

  {
    // Driver Calendar router, defines path and gives the 'executable' a name
    path: '/driver',
    name: 'DriverCalendarView',
    // creates a driver calendar view component linked through a router to be used throughout the site
    component: () => import('../views/driver/DriverCalendarView.vue'),
    // component: () => import('../../views/driver/DriverCalendar.vue'),
    meta: { driver: true },
  },

  {
    // more information about the drivers router, defines path and gives the 'executable' a name
    path: '/driver/moreInfo',
    name: 'DriverMoreInfoView',
    // creates a driver information view component linked through a router to be used throughout the site
    component: () => import('../views/driver/DriverMoreInfoView.vue'),
    meta: { driver: true },
  },

  {
    // Driver update view router, defines path and gives the 'executable' a name
    path: '/driver/update',
    name: 'DriverUpdateView',
    // creates a driver update view component linked through a router to be used throughout the site
    component: () => import('../views/driver/DriverUpdateView.vue'),
    meta: { driver: true },
  },

  {
    // Previous driver updates router, defines path and gives the 'executable' a name
    path: '/driver/prev-updates',
    name: 'DriverPrevUpdatesView',
    // creates a drivers previous update component linked through a router to be used throughout the site
    component: () => import('../views/driver/DriverPrevUpdatesView.vue'),
    meta: { driver: true },
  },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(process.env.BASE_URL),
  routes, // short for `routes: routes`
})

export default router
