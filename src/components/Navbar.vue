<script setup>
import { useRouter } from "vue-router"
import { ref } from "vue"

const router = useRouter()

const redirectToMyBooking = () => {
  console.log("Routing..")

  router.push({
    path: "/mybooking",
  })
}
const emit = defineEmits(["toggle-dark-mode"])

const toggleDarkMode = () => {
  emit("toggle-dark-mode")
}

const showSettingsMenu = ref(false)

const toggleSettingsMenu = () => {
  showSettingsMenu.value = !showSettingsMenu.value
}

const increaseFontSize = () => {
  const currentFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  )
  document.documentElement.style.fontSize = currentFontSize + 1 + "px"
}

const decreaseFontSize = () => {
  const currentFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  )
  document.documentElement.style.fontSize = currentFontSize - 1 + "px"
}
</script>

<template>
  <nav class="bg-navgreen p-4">
    <div class="container mx-auto flex items-center justify-between">
      <div class="flex items-center">
        <img src="./icons/navbar_logo.png" alt="navbar_logo" class="h-10 w-10 mr-2" />
        <a href="#" class="text-white font-medium font-['mitr'] text-2xl">CampSpace</a>
      </div>
      <div class="flex items-center">
        <RouterLink :to="{ name: 'Home' }"
          class="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-[#3f5e56]">Home
        </RouterLink>
        <RouterLink :to="{ name: 'Booking' }" @click="redirectToMyBooking"
          class="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-[#3f5e56]">My Booking
        </RouterLink>
        <RouterLink :to="{ name: 'Profile' }"
          class="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-[#3f5e56]">Profile
        </RouterLink>
        <div class="relative">
          <button @click="toggleSettingsMenu"
            class="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-[#3f5e56]">
            Settings
          </button>
          <div v-if="showSettingsMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl">
            <div class="py-3">
              <button type="button" @click="increaseFontSize"
                class="text-gray-800 ms-5 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-l-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                +
              </button>
              <label class="text-sm px-2 font-medium text-gray-900 dark:text-gray-300">Fone Size</label>
              <button type="button" @click="decreaseFontSize"
                class="text-gray-800 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-r-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                -
              </button>
            </div>
            <label class="inline-flex items-center cursor-pointer px-4 py-2 text-sm">
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 py-1 px-2">Dark Mode</span>
              <input type="checkbox" @change="toggleDarkMode" class="sr-only peer" :checked="darkMode" />
              <div
                class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-slate-400 dark:peer-focus:ring-slate-700 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-zinc-700">
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Mitr:wght@200;300;400;500;600;700&display=swap");

body {
  font-family: "Mitr", sans-serif;
}
</style>