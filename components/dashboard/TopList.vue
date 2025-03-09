<template>
  <div class="bg-white rounded-lg shadow p-6">
    <!-- Section Title -->
    <h3 class="text-text-default text-base font-medium mb-6">{{ title }}</h3>

    <div class="space-y-4 text-xs">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="grid grid-cols-[193px_auto_auto] gap-x-4 items-center"
      >
        <!-- Item Name -->
        <div class="font-medium text-gray-900">{{ item.name }}</div>

        <div class="w-24 h-2 bg-gray-200 rounded-full mr-3 relative">
          <div
            class="h-2 bg-[#44546F] rounded-full"
            :style="{ width: `${item.percentage}%` }"
          ></div>
        </div>

        <div class="text-right text-gray-700 text-sm">
          {{ valuePrefix }}{{ formatValue(item.value) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TopListItem {
  name: string;
  value: number;
  percentage: number;
}

defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array as () => TopListItem[],
    required: true,
  },
  valuePrefix: {
    type: String,
    default: "",
  },
});

const formatValue = (value: number): string => {
  return value.toLocaleString();
};
</script>
