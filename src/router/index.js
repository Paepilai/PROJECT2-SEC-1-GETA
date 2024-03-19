import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import CampDetail from "../views/CampDetails.vue"
import Booking from "../views/Booking.vue"
import AvailableArea from "../views/AvailableArea.vue"
import Receipt from "../views/Receipt.vue"

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
    path: "/booking",
    name: "Booking",
    component: Booking,
  },
  {
    path: "/available",
    name: "AvailableArea",
    component: AvailableArea,
  },
  {
    path: "/receipt",
    name: "Receipt",
    component: Receipt,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
