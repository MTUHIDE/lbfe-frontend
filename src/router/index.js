import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: () => import('../views/LoginView.vue'),
    meta: { hideNavbar: true },
  },
  {
    path: '/calendar',
    name: 'DesktopCalendarView',
    component: () => import('../views/desktop/DesktopCalendarView.vue'),
    meta: { admin: true },
  },
  {
    path: '/reports',
    name: 'ReportLogView',
    component: () => import('../views/desktop/ReportLogView.vue'),
    meta: { admin: true },
  },
  {
    path: '/updates',
    name: 'UpdateLogView',
    component: () => import('../views/desktop/UpdateLogView.vue'),
    meta: { admin: true },
  },
  {
    path: '/elders',
    name: 'EldersView',
    component: () => import('../views/desktop/ClientsView.vue'),
    meta: { admin: true },
  },
  {
    path: '/drivers',
    name: 'DriverListView',
    component: () => import('../views/desktop/DriverListView.vue'),
    meta: { admin: true },
  // },
  // {    This component was removed, but the route still existed so commented out until this gets resolved
  //   path: '/driver',
  //   name: 'DriverHomeView',
  //   component: () => import('../views/driver/DriverHomeView.vue'),
  //   meta: { driver: true },
  },
  {
    path: '/driver/about',
    name: 'DriverAboutView',
    component: () => import('../views/driver/DriverAboutView.vue'),
    meta: { driver: true },
  },
  {
    path: '/driver',
    name: 'DriverCalendarView',
    component: () => import('../views/driver/DriverCalendarView.vue'),
    // component: () => import('../../views/driver/DriverCalendar.vue'),
    meta: { driver: true },
  },
  {
    path: '/driver/moreInfo',
    name: 'DriverMoreInfoView',
    component: () => import('../views/driver/DriverMoreInfoView.vue'),
    meta: { driver: true },
  },
  {
    path: '/driver/update',
    name: 'DriverUpdateView',
    component: () => import('../views/driver/DriverUpdateView.vue'),
    meta: { driver: true },
  },
  {
    path: '/driver/prev-updates',
    name: 'DriverPrevUpdatesView',
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
