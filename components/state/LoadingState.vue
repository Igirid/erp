<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

defineProps<{
//   title: string;
}>();

// const goBack = () => {
//   router.back();
// };
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center space-y-2">
    <!-- Loader Icon -->
    <img
      src="/assets/icons/loader.svg"
      class="w-10 h-10 animate-pulse"
      alt="Loading"
    />

    <!-- Title -->
    <p class="text-base leading-5 text-text-default font-semibold">
      Loading data
    </p>

    <!-- Subtitle -->
    <p class="text-text-default leading-[14px] text-[11px]">
      Please wait while we fetch your order data
    </p>
  </div>
</template>
