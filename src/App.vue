<script setup>
import Navbar from "./components/Navbar.vue"
import { ref } from "vue"

const darkMode = ref(false)
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  document.body.classList.toggle("dark-mode", darkMode.value)
}
</script>

<template>
  <div :class="{ 'dark-mode': darkMode }">
    <Navbar @toggle-dark-mode="toggleDarkMode" />
    <router-view />
  </div>
</template>
<style>
body {
  transition: background-color 0.3s ease;
}

.dark-mode {
  background-color: #333;
  color: #fff;
}
</style>
