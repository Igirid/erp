<script setup lang="ts">
const props = defineProps<{
  isOpen?:boolean;
  toggle?:()=>void;
}>()
</script>

<template>
  <div class="dropdown">
    <div @click="props.toggle" class="cursor-pointer">
      <slot name="trigger"></slot>
    </div>

    <div v-if="props.isOpen" class="absolute bg-white shadow-lg rounded-lg mt-2 w-auto z-50">
      <slot></slot>
    </div>
  </div>
</template>
