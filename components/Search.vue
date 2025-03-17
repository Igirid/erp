<script setup lang="ts">
import { LucideSearch, LucideFilter, LucideArrowUpDown } from "lucide-vue-next";
import { useSearch } from "@/composables/useSearch";
import { useSuppliers } from "@/composables/useSuppliers";
import { useFilter } from "@/composables/useFilter";
import { defineProps } from "vue";
import { useDropdown } from "@/composables/useDropdown";

const props = defineProps<{
  isAscending: boolean;
  modelValue: string;
  selectedStatus: string;
}>();

const emit = defineEmits([
  "update:modelValue",
  "update:isAscending",
  "update:selectedStatus",
  "filterOpen",
  "filterModalOpen",
]);

const { isOpen, toggle } = useDropdown();
const { isModalOpen, toggleModal } = useFilterModal();
</script>

<template>
  <div
    class="flex border-2 border-gray-300 rounded-lg overflow-hidden shadow-sm w-[281px] h-[34px]"
  >
    <!-- Search Input -->
    <div class="flex items-center gap-2 px-4 py-2 bg-gray-50 w-full">
      <LucideSearch class="w-4 h-4 text-gray-600" />
      <InputBox
        :model-value="props.modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        placeholder="Search"
        custom-styles="bg-transparent outline-none w-full text-sm text-gray-700"
      />
    </div>

    <!-- Filter SearchSearchDropdown -->
    <SearchDropdown :isOpen="isOpen" :toggle="toggle">
      <template #trigger>
        <div
          class="border-l-2 border-gray-300 px-4 py-2 flex items-center bg-gray-200"
        >
          <LucideListFilter
            class="w-4 h-4 text-gray-600"
            @click="emit('filterModalOpen')"

          />
        </div>
      </template>
      <slot name="filter-modal"></slot>

      <!-- <SelectBox :modelValue="selectedStatus" 
        :isOpen="isOpen"
        :values="['Active','Inactive']" default-value="Filter By Status" 
          @update:modelValue="$emit('update:selectedStatus', $event)" 
          :status="true" 
          variant="text-gray-700 text-sm bg-transparent"
      /> -->
      <!-- <div class="p-4 text-gray-700 text-sm">
        <p class="">Filter by Status:</p>
        <div class="flex flex-col space-y-[10px] pt-[10px]">
          <p class="cursor-pointer">Active</p>
          <p class="cursor-pointer">Inactive</p>
        </div>
      </div> -->
    </SearchDropdown>

    <!-- Sort SearchDropdown -->
    <!-- @click="emit('update:isAscending', !props.isAscending)" -->
    <SearchDropdown
      :isOpen="isModalOpen"
      :toggle="toggleModal"
    >
      <template #trigger>
        <div
          class="border-l-2 border-gray-300 px-4 py-2 flex items-center bg-gray-200"
        >
          <LucideArrowUpDown
            class="w-4 h-4 text-gray-600"
            @click="emit('filterOpen')"

          />
        </div>
      </template>
      <!-- <div class="p-4">
        <p class="text-sm text-gray-700">Sort options coming soon...</p>
      </div> -->
      <slot name="filter-dropdown"></slot>

    </SearchDropdown>
  </div>
</template>
