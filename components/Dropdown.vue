<script setup>
import { LucideTrash2, LucidePencil } from 'lucide-vue-next'

const show = ref(false)

const toggleDropdown = () => {
  show.value = !show.value
}
</script>

<template>
  <div class="relative">
    <button @click="toggleDropdown">
      <LucideEllipsisVertical />
    </button>

    <div v-if="show" class="absolute right-0 w-40 bg-white shadow rounded-md">
      <button class="block w-full px-4 py-2 hover:bg-gray-100 text-left">
        <LucidePencil class="inline mr-2" /> Edit
      </button>
      <button class="block w-full px-4 py-2 hover:bg-red-100 text-left">
        <LucideTrash2 class="inline mr-2 text-red-600" /> Delete
      </button>
    </div>
  </div>
</template>
