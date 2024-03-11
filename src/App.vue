<script setup>
import Navbar from "./components/Navbar.vue"
import Camplist from "./components/Camplist.vue"
import DetailCamp from "./components/DetailCamp.vue";
</script>

<template>
  <div class="grid-container">
    <Navbar />
    <!-- <div class="flex items-center justify-between px-3 py-5">
      <h1 class="ml-8 text-4xl font-bold">Hi [Name], welcome to your space!</h1>

      <label class="mr-8 input input-bordered- flex items-center gap-2">
        <input type="text" class="grow" placeholder="Search" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="w-4 h-4 opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
    </div> -->

    <!-- <h1 class="ml-9 text-3xl font-bold">Campgrounds</h1>
    <div class="grid grid-cols-5 gap-4 p-6">
      <div class="btn bg-navgreen text-white hover:bg-[#F79C1D]">Mountain</div>
      <div class="btn bg-navgreen text-white hover:bg-[#F79C1D]">Beach</div>
      <div class="btn bg-navgreen text-white hover:bg-[#F79C1D]">Lakefront</div>
      <div class="btn bg-navgreen text-white hover:bg-[#F79C1D]">Forest</div>
      <div class="btn bg-navgreen text-white hover:bg-[#F79C1D]">
        National Park
      </div>
    </div> -->
  </div>

  <Camplist />
  <!-- <DetailCamp/> -->


</template>

<style scoped>
.grid-container {
  display: grid;
}

.camplist-grid {
  display: grid;
}

.camplist-grid .grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
</style>
