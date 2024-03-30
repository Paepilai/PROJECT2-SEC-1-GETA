<template>
  <div class="grid grid-cols-3 gap-2 gap-y-10 m-10 place-items-center">
    <slot v-for="(item, index) in items" :key="index" :item="item"></slot>
  </div>
</template>

<script setup>
const { items } = defineProps({
  items: Array,
});
</script>
