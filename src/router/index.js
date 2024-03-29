import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import CampDetail from "../views/CampDetails.vue"
import Favorite from "../views/Favorite.vue"

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
    path: "/favorite",
    name: "Favorite",
    component: Favorite,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
