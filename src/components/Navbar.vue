<script setup></script>

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
        <!-- <RouterLink :to="{ name: 'Booking' }"
          class="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-[#3f5e56]">Booking</RouterLink> -->
        <RouterLink :to="{ name: 'Profile' }"
          class="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-[#3f5e56]">Profile</RouterLink>
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
