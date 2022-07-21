import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { hideNavbar: true },
  },
  {
    path: '/calendar',
    name: 'DesktopCalendar',
    component: () => import('../views/desktop/DesktopCalendar.vue'),
    meta: { admin: true },
  },
  {
    path: '/reports',
    name: 'ReportLog',
    component: () => import('../views/desktop/ReportLog.vue'),
    meta: { admin: true },
  },
  {
    path: '/updates',
    name: 'UpdateLog',
    component: () => import('../views/desktop/UpdateLog.vue'),
    meta: { admin: true },
  },
  {
    path: '/elders',
    name: 'Elders',
    component: () => import('../views/desktop/Clients.vue'),
    meta: { admin: true },
  },
  {
    path: '/drivers',
    name: 'DriverList',
    component: () => import('../views/desktop/DriverList.vue'),
    meta: { admin: true },
  // },
  // {    This component was removed, but the route still existed so commented out until this gets resolved
  //   path: '/driver',
  //   name: 'DriverHome',
  //   component: () => import('../../views/driver/DriverHome.vue'),
  //   meta: { driver: true },
  },
  {
    path: '/driver/about',
    name: 'DriverAbout',
    component: () => import('../views/driver/DriverAbout.vue'),
    meta: { driver: true },
  },
  {
    path: '/driver',
    name: 'DriverCalendar',
    component: () => import('../views/driver/DriverCalendar.vue'),
    // component: () => import('../../views/driver/DriverCalendar.vue'),
    meta: { driver: true },
  },
  {
    path: '/driver/moreInfo',
    name: 'DriverMoreInfo',
    component: () => import('../views/driver/DriverMoreInfo.vue'),
    meta: { driver: true },
  },
  {
    path: '/driver/update',
    name: 'DriverUpdate',
    component: () => import('../views/driver/DriverUpdate.vue'),
    meta: { driver: true },
  },
  {
    path: '/driver/prev-updates',
    name: 'DriverPrevUpdates',
    component: () => import('../views/driver/DriverPrevUpdates.vue'),
    meta: { driver: true },
  },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(process.env.BASE_URL),
  routes, // short for `routes: routes`
})

export default router
