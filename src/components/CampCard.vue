<script setup></script>

<template>
  <div class="card w-96 bg-base-100 shadow-xl">
    <figure>
      <slot name="location"></slot>
    </figure>
    <div class="card-body">
      <p class="font-bold text-2xl">📍<slot name="title">Camp!</slot></p>
      <p class="line-clamp-3">
        <slot name="description"></slot>
      </p>
      <div class="card-actions justify-end">
        <a
          href="#"
          class="btn bg-[#F79C1D] hover:bg-[#F79C1D] hover:ring-2 ring-[#B99B9B] active:bg-[#B99B9B] focus:outline-none"
        >
          View Details
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
