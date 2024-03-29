<script setup>
import { ref } from 'vue'

const users = [
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password",
    bio: "When I'm not developing software, you can find me exploring the great outdoors and camping under the stars.",
    favorite: []
  },

]

const loginUser = () => {

  const user = users.find(user => user.email === username.value && user.password === password.value)
  if (user) {
    router.push('/home')
  } else {
    alert('Invalid username or password')
  }
}
</script>

<template>
    <div class="full-page">
      <div class="box-center">
        <div class="mt-5 text-2xl font-bold text-slate-950">Login</div>
        <div class="m-5">
          <label class="input input-bordered flex items-center gap-2 m-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
            </svg>
            <input type="text" class="grow" v-model="username" placeholder="Username" />
          </label>
          <label class="input input-bordered flex items-center gap-2 m-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
            </svg>
            <input type="password" class="grow" v-model="password" placeholder="Password" />
          </label>
          <button class="btn btn-outline btn-accent" @click="loginUser">Login</button>
        </div>
      </div>
    </div>
  </template>

<style scoped>
.full-page {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f56666;
}

.box-center {
    width: 20%;
    height: 65%;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}
</style>
