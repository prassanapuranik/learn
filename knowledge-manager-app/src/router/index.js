import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import LoginPage from '../pages/LoginPage.vue';
import DashboardPage from '../pages/DashboardPage.vue';
import EventManagerPage from '../pages/EventManagerPage.vue';
import CalendarPage from '../pages/CalendarPage.vue';
import ReportsPage from '../pages/ReportsPage.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/dashboard', name: 'Dashboard', component: DashboardPage, meta: { requiresAuth: true } },
  { path: '/events', name: 'Events', component: EventManagerPage, meta: { requiresAuth: true, adminOnly: true } },
  { path: '/calendar', name: 'Calendar', component: CalendarPage, meta: { requiresAuth: true } },
  { path: '/reports', name: 'Reports', component: ReportsPage, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const role = store.getters.currentUserRole;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
    return;
  }

  if (to.meta.adminOnly && role !== 'admin') {
    next('/dashboard');
    return;
  }

  if (to.path === '/login' && isAuthenticated) {
    next('/dashboard');
    return;
  }

  next();
});

export default router;
