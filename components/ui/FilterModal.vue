<template>
  <!-- <div class="modal-overlay"></div> -->
  <!-- v-if="isOpen" -->
  <div class=""  @click.stop>
    <div @click.self="closeModal" class="modal-container">
      <h3 class="modal-title">Filter</h3>

      <!-- Date Range Filters -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="label">From</label>
          <div class="input-container">
            <input type="date" v-model="filters.fromDate" class="input text-sm text-gray-500" />
            <!-- <LucideCalendar class="icon" /> -->
          </div>
        </div>
        <div>
          <label class="label">To</label>
          <div class="input-container">
            <input type="date" v-model="filters.toDate" class="input text-sm text-gray-500" />
            <!-- <LucideCalendar class="icon" /> -->
          </div>
        </div>
      </div>

      <!-- Category Dropdown -->
      <div>
        <label class="label">Category</label>
        <UiSelectField
          v-model="supplierCategory"
          :options="supplierCategories"
          :placeholder="`All categories`"
          class="text-sm"
        />

        <!-- <select v-model="filters.category" class="input">
           <option value="">All Categories</option>
           <option
             v-for="category in categories"
             :key="category"
             :value="category"
           >
             {{ category }}
           </option>
         </select> -->
      </div>

      <!-- Status Dropdown -->
      <div>
        <label class="label">Status</label>
        <UiSelectField
          v-model="status"
          :options="statuses"
          :placeholder="`All statuses`"
          class="text-sm"
        />
        <!-- <select v-model="filters.status" class="input">
          <option value="">All Statuses</option>
          <option v-for="status in statuses" :key="status" :value="status">
            {{ status }}
          </option>
        </select> -->
      </div>

      <!-- Buttons -->
      <div class="flex justify-between mt-4">
        <button class="btn-reset" @click="resetFilters">Reset all</button>
        <button class="btn-apply" @click="applyFilters">Apply</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { LucideCalendar } from "lucide-vue-next";

const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(["close", "apply"]);

// Sample categories and statuses
// const categories = ["Electronics", "Furniture", "Clothing", "Food"];
// const statuses = ["Active", "Inactive", "Pending"];
const { supplierCategory, supplierCategories } = useCategory();
const { status, statuses } = useStatus();


// Filter state
const filters = ref({
  fromDate: "",
  toDate: "",
  category: "",
  status: "",
});

// Close modal
const closeModal = () => {
  emit("close");
};

// Reset filters
const resetFilters = () => {
  filters.value = { fromDate: "", toDate: "", category: "", status: "" };
};

// Apply filters and send data to parent
const applyFilters = () => {
  emit("apply", filters.value);
  closeModal();
};
</script>

<style scoped>
.modal-overlay {
  @apply fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50;
}

.modal-container {
  @apply bg-white shadow-lg rounded-lg p-6 w-[427px] space-y-4;
}

.modal-title {
  @apply text-lg font-semibold mb-4 text-gray-700;
}

.label {
  @apply text-gray-600 text-xs font-medium block mb-1;
}

.input {
  @apply w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300;
}

.input-container {
  @apply relative;
}

.icon {
  @apply absolute top-2 right-2 text-gray-600 w-5 h-5;
}

.btn-reset {
  @apply bg-gray-200 px-4 py-2 rounded-md text-gray-600 text-xs;
}

.btn-apply {
  @apply bg-blue-600 px-4 py-2 rounded-md text-white text-xs;
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
