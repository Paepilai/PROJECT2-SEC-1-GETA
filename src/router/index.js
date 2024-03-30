
import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Profile from "../views/Profile.vue";
import CampDetail from "../views/CampDetails.vue"
import Booking from "../views/Booking.vue"
import AvailableArea from "../views/AvailableArea.vue"
import Receipt from "../views/Receipt.vue"
import MyBooking from "../views/MyBooking.vue"


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
    path: "/booking",
    name: "Booking",
    component: Booking,
    props: (route) => ({ campId: parseInt(route.params.campId) }),
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
  {
    path: "/mybooking",
    name: "MyBooking",
    component: MyBooking,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,

});

export default router;
