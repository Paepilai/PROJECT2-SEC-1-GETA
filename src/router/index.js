import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CampDetail from "../views/CampDetails.vue";
import Login from "../views/Login.vue";
import Booking from "../views/Booking.vue";
import NotFound from "../views/NotFound.vue";

export const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/booking",
    name: "Booking",
    component: Booking,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/camp/:id",
    name: "CampDetail",
    component: CampDetail,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  }  
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
