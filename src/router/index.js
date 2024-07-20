import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Callback from '../views/Redirect.vue';
import NotFound from '../views/NotFound.vue'; // Componente para manejar rutas no reconocidas

const routes = [
  { path: '/', component: Home },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/callback', component: Callback },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }, // Ruta comodín para manejar rutas no reconocidas
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardias de navegación globales
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('spotify_token');
    if (!token) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
