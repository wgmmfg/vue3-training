import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: HomeView,
      },
      {
        path: 'products',
        component: () => import('../views/ProductsView.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/CartView.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/AdminProducts.vue'),
      },
      {
        path: 'coupon',
        component: () => import('../views/AdminCoupon.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
});

export default router;
