<template>
  <!-- v-if="isOpen" -->
       <div   ref="filterRef" class="menu-container text-xs">
          <div
            v-for="(group, index) in filterGroups"
            :key="index"
            class="group"
            :class="index == 0 ? 'border-b' : ''"
          >
            <ul>
              <li
                v-for="(item, id) in group.items"
                class="flex gap-2"
                :key="item.value"
                @click="selectOption(item.value)"
              >
                <span v-if="id == 0" class="group-title">•</span>
                <span class=" font-semibold " :class="id != 0 ? 'ml-3 ' : ''">
                  {{ item.label  }}
                </span>
              </li>
            </ul>
          </div>
        </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { onClickOutside } from "@vueuse/core"; // ✅ VueUse for handling outside clicks

const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(["close", "select"]);

const filterRef = ref<HTMLElement | null>(null);

const filterGroups = [
  {
    items: [
      { label: "Supplier Name", value: "supplier_name" },
      { label: "Contact Person", value: "contact_person" },
      { label: "Status", value: "status" },
    ],
  },
  {
    items: [
      { label: "Ascending", value: "asc" },
      { label: "Descending", value: "desc" },
    ],
  },
];

const closeDropdown = () => {
  emit("close");
};

const selectOption = (value: string) => {
  emit("select", value);
  closeDropdown();
};

// ✅ Close menu when clicking outside
onClickOutside(filterRef, closeDropdown);
</script>

<style scoped>


.menu-container {
  @apply bg-white shadow-lg rounded-md w-[149px] p-2 border border-gray-200;
}

.group {
  @apply py-2;
}

.group-title {
  @apply text-gray-500 font-medium;
}

ul {
  @apply divide-gray-100;
}

li {
  @apply px-4 py-2 text-gray-600 font-medium cursor-pointer hover:bg-gray-100;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
