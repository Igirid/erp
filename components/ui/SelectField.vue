<template>
  <div class="w-full relative" ref="dropdownRef">
    <div class="flex flex-col items-center">
      <div class="w-full">
        <div
          class="py-1.5 px-3 bg-white flex border-2 rounded-md relative transition-all"
          :class="isFocused ? 'border-blue-600 border-2' : 'border-gray-300'"
        >
          <Image
          v-if="displayIcon"
            :src="displayIcon"
            alt="Profile Image"
            class="relative top-[3px]  w-6 h-6 object-contain"
          />
          <input
            :placeholder="placeholder"
            class="px-2 appearance-none outline-none w-full text-gray-800"
            v-model="searchTerm"
            @focus="handleFocus"
            @blur="handleBlur"
          />
          <div
            class="text-gray-300 w-8 pl-2 pr-1 flex items-center border-gray-200"
          >
            <button
              class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
              @click="toggleDropdown"
            >
              <LucideChevronDown v-if="!isOpen" class="w-4 h-4" />
              <LucideChevronUp v-else class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Dropdown -->
      <div
        v-if="isOpen && filteredOptions.length"
        class="absolute shadow bg-white border-2 border-gray-100 shad-md top-100 z-40 w-full left-0 rounded max-h-select overflow-y-auto"
      >
        <div class="flex flex-col w-full">
          <div
            v-for="option in filteredOptions"
            :key="option.id"
            class="cursor-pointer w-full border-gray-100 border-b hover:bg-gray-100"
            @click="selectOption(option)"
          >
            <div
              class="flex w-full items-center py-1.5 px-3 pl-2 border-transparent border-l-2 relative hover:border-gray-200"
            >
              <div class="w-full flex items-center justify-between">
                <div class="mx-2 -mt-1">
                  {{ option.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { LucideChevronDown, LucideChevronUp } from "lucide-vue-next";
import { onClickOutside } from "@vueuse/core"; // ✅ VueUse for handling clicks outside

interface Option {
  id: number;
  name: string;
}

const props = defineProps<{
  modelValue: Option | null;
  options: Option[];
  placeholder: string;
  displayIcon?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const searchTerm = ref("");
// const imageUrl = ref("/supplier-placeholder.png"); 
const isOpen = ref(false);
const isFocused = ref(false); // ✅ New state to track focus
const dropdownRef = ref<HTMLElement | null>(null);

// Computed: Filters options based on search
const filteredOptions = computed(() => {
  if (!searchTerm.value) return props.options;
  return props.options.filter((opt) =>
    opt.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

// Open dropdown
const openDropdown = () => {
  isOpen.value = true;
};

// Toggle dropdown open/close
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Select option and close dropdown
const selectOption = (option: Option) => {
  emit("update:modelValue", option);
  searchTerm.value = option.name; // Update input with selected value
  isOpen.value = false;
};

// ✅ Handle input focus
const handleFocus = () => {
  isFocused.value = true;
  toggleDropdown();
};

// ✅ Handle input blur
const handleBlur = () => {
  isFocused.value = false;
};

// ✅ VueUse: Automatically close dropdown when clicking outside
onClickOutside(dropdownRef, () => {
  isOpen.value = false;
});
</script>

<style scoped>
.top-100 {
  top: 100%;
}
.max-h-select {
  max-height: 300px;
}
</style>
