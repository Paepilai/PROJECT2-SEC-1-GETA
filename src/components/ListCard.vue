<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})

console.log(props.items)
</script>

<template>
  <div class="grid grid-cols-3 gap-2 gap-y-10 m-10 place-items-center">
    <slot v-for="(item, index) in items" :key="index" :item="item"></slot>
  </div>
</template>

<style scoped></style>
