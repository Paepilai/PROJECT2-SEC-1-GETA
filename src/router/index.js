import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CampDetail from "../views/CampDetails.vue";
import Profile from "../views/Profile.vue";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/camp/:id",
    name: "CampDetail",
    component: CampDetail,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
