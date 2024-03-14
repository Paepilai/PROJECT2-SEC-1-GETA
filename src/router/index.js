import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue';
import CampDetail from '../views/CampDetails.vue'


export const routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
        path: '/camp/:id',
        name: 'CampDetail',
        component: CampDetail
      }
  ];
  
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });
  
  export default router;
