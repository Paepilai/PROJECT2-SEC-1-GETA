<script setup>
import { ref, defineProps, onMounted, watchEffect, computed } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const redirectToMyBooking = () => {
  console.log("Routing..")
  router.push("/mybooking")
}

const chosenDate = ref(null)
const nameValue = ref("")
const emailValue = ref("")
const phoneValue = ref("")
const specialValue = ref("")
const selectedCampground = ref(null)
const qtyAmountTent = ref(0)
const qtyAmountSleepingBag = ref(0)
const qtyAmountMattress = ref(0)
const qtyAmountPillow = ref(0)
const nightAmount = ref(0)
const zoneId = ref(null)
const zoneName = ref(null)
const zoneDesc = ref(null)

onMounted(() => {
  const route = router.currentRoute.value
  chosenDate.value = route.query.chosenDate || null
  nameValue.value = route.query.nameValue || ""
  emailValue.value = route.query.emailValue || ""
  phoneValue.value = route.query.phoneValue || ""
  specialValue.value = route.query.specialValue || ""
  qtyAmountTent.value = parseInt(route.query.qtyAmountTent) || 0
  qtyAmountSleepingBag.value = parseInt(route.query.qtyAmountSleepingBag) || 0
  qtyAmountMattress.value = parseInt(route.query.qtyAmountMattress) || 0
  qtyAmountPillow.value = parseInt(route.query.qtyAmountPillow) || 0
  nightAmount.value = parseInt(route.query.nightAmount) || 0
  selectedCampground.value = route.query.selectedCampground || null
  zoneId.value = router.currentRoute.value.query.zoneId || null
  zoneName.value = router.currentRoute.value.query.zoneName || null
  zoneDesc.value = router.currentRoute.value.query.zoneDesc || null
  const calculateTentTotal = router.currentRoute.query.calculateTentTotal || 0
  const calculateSleepingBagTotal =
    router.currentRoute.query.calculateSleepingBagTotal || 0
  const calculateMattressTotal =
    router.currentRoute.query.calculateMattressTotal || 0
  const calculatePillowTotal =
    router.currentRoute.query.calculatePillowTotal || 0
  const calculateTotalAmount =
    router.currentRoute.query.calculateTotalAmount || 0
})
</script>

<template>
  <div
    class="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
      alt="chippz"
      class="mx-auto w-16 py-4"
    />
    <div class="flex flex-col justify-center items-center gap-2">
      <h4 class="font-semibold text-4xl">{{ selectedCampground }}</h4>
      <p class="text-l">Location</p>
    </div>
    <div class="flex flex-col gap-3 border-b py-6 text-xl px-10">
      <p class="flex justify-between">
        <span class="text-gray-400">Date:</span>
        <span>{{ chosenDate }}</span>
      </p>
      <p class="flex justify-between">
        <span class="text-gray-400">Receipt No.:</span>
        <span>#5033</span>
      </p>

      <p class="flex justify-between">
        <span class="text-gray-400">Zone:</span>
        <span>{{ zoneId }} {{ zoneName }}</span>
      </p>

      <p class="flex justify-between">
        <span class="text-gray-400">Nights:</span>
        <span>{{ nightAmount }}</span>
      </p>
      <p class="flex justify-between">
        <span class="text-gray-400">Customer:</span>
        <span>{{ nameValue }}</span>
      </p>
      <p class="flex justify-between">
        <span class="text-gray-400">Email:</span>
        <span>{{ emailValue }}</span>
      </p>
      <p class="flex justify-between">
        <span class="text-gray-400">Phone Number:</span>
        <span>{{ phoneValue }}</span>
      </p>
      <p class="flex justify-between">
        <span class="text-gray-400">Special Requests:</span>
        <span>{{ specialValue }}</span>
      </p>
    </div>
    <div class="flex flex-col gap-3 pb-6 pt-2 text-xl px-10">
      <table class="w-full text-left">
        <thead>
          <tr class="flex">
            <th class="w-full py-2">List</th>
            <th class="min-w-[44px] py-2 px-28">QTY</th>
            <th class="min-w-[44px] py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr class="flex">
            <td class="flex-1">Tent</td>
            <td class="min-w-[44px] py-2 px-28">{{ qtyAmountTent }}</td>
            <td class="min-w-[44px]">{{ calculateTentTotal }}Baht</td>
          </tr>
          <tr class="flex">
            <td class="flex-1">Sleeping bag</td>
            <td class="min-w-[44px] py-2 px-28">{{ qtyAmountSleepingBag }}</td>
            <td class="min-w-[44px]">100 Baht</td>
          </tr>
          <tr class="flex">
            <td class="flex-1">Mattress</td>
            <td class="min-w-[44px] py-2 px-28">{{ qtyAmountMattress }}</td>
            <td class="min-w-[44px]">100 Baht</td>
          </tr>
          <tr class="flex">
            <td class="flex-1">Pillow</td>
            <td class="min-w-[44px] py-2 px-28">{{ qtyAmountPillow }}</td>
            <td class="min-w-[44px]">100 Baht</td>
          </tr>
          <tr class="flex">
            <td class="flex-1">Total</td>
            <td class="min-w-[44px] py-2 px-28"></td>
            <td class="min-w-[44px]">Baht</td>
          </tr>
        </tbody>
      </table>
      <div class="border-b border border-dashed"></div>
      <div class="py-4 justify-center items-center flex flex-col gap-2">
        <p class="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21.3 12.23h-3.48c-.98 0-1.85.54-2.29 1.42l-.84 1.66c-.2.4-.6.65-1.04.65h-3.28c-.31 0-.75-.07-1.04-.65l-.84-1.65a2.567 2.567 0 0 0-2.29-1.42H2.7c-.39 0-.7.31-.7.7v3.26C2 19.83 4.18 22 7.82 22h8.38c3.43 0 5.54-1.88 5.8-5.22v-3.85c0-.38-.31-.7-.7-.7ZM12.75 2c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2h1.5V2Z"
              fill="#000"
            ></path>
            <path
              d="M22 9.81v1.04a2.06 2.06 0 0 0-.7-.12h-3.48c-1.55 0-2.94.86-3.63 2.24l-.75 1.48h-2.86l-.75-1.47a4.026 4.026 0 0 0-3.63-2.25H2.7c-.24 0-.48.04-.7.12V9.81C2 6.17 4.17 4 7.81 4h3.44v3.19l-.72-.72a.754.754 0 0 0-1.06 0c-.29.29-.29.77 0 1.06l2 2c.01.01.02.01.02.02a.753.753 0 0 0 .51.2c.1 0 .19-.02.28-.06.09-.03.18-.09.25-.16l2-2c.29-.29.29-.77 0-1.06a.754.754 0 0 0-1.06 0l-.72.72V4h3.44C19.83 4 22 6.17 22 9.81Z"
              fill="#000"
            ></path>
          </svg>
          info@example.com
        </p>
        <p class="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill="#000"
              d="M11.05 14.95L9.2 16.8c-.39.39-1.01.39-1.41.01-.11-.11-.22-.21-.33-.32a28.414 28.414 0 01-2.79-3.27c-.82-1.14-1.48-2.28-1.96-3.41C2.24 8.67 2 7.58 2 6.54c0-.68.12-1.33.36-1.93.24-.61.62-1.17 1.15-1.67C4.15 2.31 4.85 2 5.59 2c.28 0 .56.06.81.18.26.12.49.3.67.56l2.32 3.27c.18.25.31.48.4.7.09.21.14.42.14.61 0 .24-.07.48-.21.71-.13.23-.32.47-.56.71l-.76.79c-.11.11-.16.24-.16.4 0 .08.01.15.03.23.03.08.06.14.08.2.18.33.49.76.93 1.28.45.52.93 1.05 1.45 1.58.1.1.21.2.31.3.4.39.41 1.03.01 1.43zM21.97 18.33a2.54 2.54 0 01-.25 1.09c-.17.36-.39.7-.68 1.02-.49.54-1.03.93-1.64 1.18-.01 0-.02.01-.03.01-.59.24-1.23.37-1.92.37-1.02 0-2.11-.24-3.26-.73s-2.3-1.15-3.44-1.98c-.39-.29-.78-.58-1.15-.89l3.27-3.27c.28.21.53.37.74.48.05.02.11.05.18.08.08.03.16.04.25.04.17 0 .3-.06.41-.17l.76-.75c.25-.25.49-.44.72-.56.23-.14.46-.21.71-.21.19 0 .39.04.61.13.22.09.45.22.7.39l3.31 2.35c.26.18.44.39.55.64.1.25.16.5.16.78z"
            ></path>
          </svg>
          +234XXXXXXXX
        </p>
        <button
          class="bg-[#E6BB96] text-black py-2 px-4 rounded hover:bg-[#8C9579] focus:outline-none focus:shadow-outline"
          type="submit"
          @click="redirectToMyBooking"
        >
          My Booking
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
