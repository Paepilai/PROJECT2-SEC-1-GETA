<script setup>
import Navbar from "./components/Navbar.vue";
import Camplist from "./components/Camplist.vue";
</script>

<template>
  <div class="grid-container">
    <Navbar />
    <div class="flex items-center justify-between px-3 py-5">
      <h1 class="ml-8 text-4xl font-bold"> Hi [Name], welcome to your space!</h1>
      
      <label class="mr-8 input input-bordered- flex items-center gap-2">
        <input type="text" class="grow" placeholder="Search" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
          <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
        </svg>
      </label>
    </div>
    
    <h1 class="ml-9 text-3xl font-bold"> Campgrounds</h1>
    <div class="grid grid-cols-5 gap-4 p-6">
      <div class="badge">Mountain</div>
      <div class="badge">Beach</div>
      <div class="badge">Lakefront</div>
      <div class="badge">Forest</div>
      <div class="badge">National Park</div>
    </div>
  </div>
  <div class="camplist-grid grid grid-cols-3 gap-4 p-6">
      <div><Camplist /></div>
      <div><Camplist /></div>
      <div><Camplist /></div>
      <div><Camplist /></div>
      <div><Camplist /></div>
      <div><Camplist /></div>
    </div>
  
</template>

<style scoped>
.grid-container {
  display: grid;

}

.badge {
  background-color: #4c7b6f; 
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 20px; 
  padding: 10px 20px; 
}

.badge:hover {
  background-color: #F79C1D; 
}

.camplist-grid {
  display: grid;
}

.camplist-grid .grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
</style>
