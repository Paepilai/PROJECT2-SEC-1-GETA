<script setup>
import Navbar from "./components/Navbar.vue"
import { onMounted, ref } from "vue"
import { getItems } from "./libs/fetchUtils.js"
import { myUserTodo } from "./stores/users.js"

const myUser = myUserTodo()
onMounted(async () => {
  //users
  const items = await getItems(`${import.meta.env.VITE_USER_BASE1_URL}/1`)
  myUser.addTodos([items])
})

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