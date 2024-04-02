<script setup>
import Navbar from "./components/Navbar.vue"
import { onMounted } from "vue"
import { getItems } from "./libs/fetchUtils.js"
import { myUserTodo } from "./stores/users.js"

const myUser = myUserTodo()
onMounted(async () => {
  //users
  const items = await getItems(`${import.meta.env.VITE_USER_BASE1_URL}/1`)
  myUser.addTodos([items])
})
</script>

<template>
  <Navbar />
  <router-view />
</template>