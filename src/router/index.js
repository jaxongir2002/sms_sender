import { createRouter, createWebHistory } from 'vue-router';
import Auth from '../Auth/Login.vue';
import Dashboard from '../Dashbord/Dashbord.vue';

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/dashboard',
    name: 'dashboard1',
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuthentication();

  if (to.name !== 'Auth' && !isAuthenticated) {
    next({ name: 'Auth' });
  } else {
    next();
  }
});

function checkAuthentication() {
  // Your authentication logic here
  // Example: return true if the user is authenticated, or false if not
  // Replace the placeholder with your actual authentication check
  // For demonstration purposes, always return true to bypass authentication
  return true;
}

export default router;