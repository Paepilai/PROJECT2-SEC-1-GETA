<script setup>
import Navbar from "./components/Navbar.vue"
import { onMounted } from "vue"
import { getItems } from "./libs/fetchUtils.js"
import { myUserTodo } from "./stores/users.js"

const myUser = myUserTodo()
onMounted(async () => {
  //users
  const items = await getItems(`${import.meta.env.VITE_BASE_URL}users/102`)
  console.log(items)
  //ทำให้ค่าเป็น array จากที่ users/101 เป็น object
  myUser.addTodos([items])
})
</script>

<template>
  <Navbar />
  <router-view />
</template>
