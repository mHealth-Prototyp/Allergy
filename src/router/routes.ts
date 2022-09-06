import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/Dashboard.vue')
      },
      {
        path: 'settings',
        component: () => import('pages/Settings.vue')
      },
      {
        path: 'about',
        component: () => import('pages/About.vue')
      },
      {
        path: 'documents',
        component: () => import('pages/Documents.vue')
      },
      {
        path: 'upload',
        component: () => import('pages/Upload.vue')
      },
      {
        path: 'allergies',
        component: () => import('pages/Allergies.vue')
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
