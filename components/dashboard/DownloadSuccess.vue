<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps<{
  visibility: boolean;
}>();

const isVisible = ref(props.visibility);

watch(
  () => props.visibility,
  (newVal) => {
    isVisible.value = newVal;
  }
);
</script>

<template>
  <Transition name="slide">
    <div
      v-if="isVisible"
      class="fixed top-2 left-1/2 -translate-x-1/2 mt-4 bg-green-700 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-md"
    >
      <!-- <img src="/icons/check-circle.svg" alt="Success" class="w-4 h-4" /> -->
      <LucideCircleCheck class="h-5 w-5 stroke-green-700 fill-white"> </LucideCircleCheck>
      <span class="text-xs">Download success</span>
    </div>
  </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}
/* Start position: Above the viewport */
.slide-enter-from {
  transform: translate(-50%, -100%);
}

/* End position: Slightly below top */
.slide-enter-to {
  transform: translate(-50%, 0);
}

/* Exit animation: Slide back up */
.slide-leave-from {
  transform: translate(-50%, 0);
}

.slide-leave-to {
  transform: translate(-50%, -180%);
}
</style>
