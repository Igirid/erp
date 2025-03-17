<template>
  <div class="flex items-center justify-center space-x-2 mt-6">
    <!-- Previous Button -->
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="px-3 py-1 text-gray-500 font-bold disabled:text-gray-300"
    >
      <!-- &lt;
              -->
      <LucideChevronLeft class="h-5 w-5"></LucideChevronLeft>
    </button>

    <!-- Page Numbers -->
    <template v-for="page in displayedPages" :key="page">
      <button
        @click="changePage(page)"
        :class="
          currentPage === page
            ? 'text-[#0C66E4] font-medium bg-gray-100 rounded px-3 py-1'
            : 'text-gray-700'
        "
        class="px-2 py-1"
      >
        {{ page }}
      </button>
    </template>

    <!-- Dots for skipped pages -->
    <span v-if="currentPage < totalPages - 5" class="text-gray-500">...</span>

    <button
      v-if="currentPage < totalPages - 5"
      @click="changePage(totalPages)"
      class="px-2 py-1 text-gray-700"
    >
      {{ totalPages }}
    </button>

    <!-- Next Button -->
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 text-gray-500 font-bold disabled:text-gray-300"
    >
      <!-- &gt; -->
      <LucideChevronRight class="h-5 w-5"></LucideChevronRight>
    </button>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  totalPages: Number,
  currentPage: Number,
});
const emit = defineEmits(["update:currentPage"]);

const changePage = (page) => {
  if (page !== props.currentPage) emit("update:currentPage", page);
};

const prevPage = () => {
  if (props.currentPage > 1) emit("update:currentPage", props.currentPage - 1);
};

const nextPage = () => {
  if (props.currentPage < props.totalPages)
    emit("update:currentPage", props.currentPage + 1);
};

const displayedPages = computed(() => {
  let pages = [];
  let total = props.totalPages;
  let current = props.currentPage;

  if (total <= 10) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 6) {
    pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  } else if (current >= total - 5) {
    pages = Array.from({ length: 10 }, (_, i) => total - 9 + i);
  } else {
    pages = [
      current - 4,
      current - 3,
      current - 2,
      current - 1,
      current,
      current + 1,
      current + 2,
      current + 3,
      current + 4,
      current + 5,
    ];
  }

  return pages;
});
</script>
