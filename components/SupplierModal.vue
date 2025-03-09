<script setup lang="ts">
import { LucideX, LucideCamera } from "lucide-vue-next";
import { useModal } from "@/composables/useModal";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(["update:modelValue"]);
const { closeModal } = useModal();

const close = () => {
  emit("update:modelValue", false);
};

const onSubmit = () => {
  console.log("Creating Supplier...");
  close();
};
</script>

<template>
  <Transition name="slide">
    <div
      v-if="modelValue"
      class="fixed top-0 right-0 w-1/2 h-full bg-white shadow-lg z-50 overflow-y-auto transition-transform"
    >
      <div class="p-8">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Create Supplier</h2>
          <LucideX
            class="cursor-pointer w-6 h-6 text-gray-600"
            @click="close"
          />
        </div>

        <div class="grid grid-cols-2 gap-6 mt-6">
          <div>
            <label class="text-sm font-medium mb-2 block">Supplier Name</label>
            <input
              type="text"
              placeholder="Enter a supplier name"
              class="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label class="text-sm font-medium mb-2 block"
              >Type of Supplier</label
            >
            <select class="w-full border border-gray-300 rounded-lg p-3">
              <option>Select a type</option>
              <option>Local</option>
              <option>Overseas</option>
            </select>
          </div>

          <div>
            <label class="text-sm font-medium mb-2 block">Category</label>
            <select class="w-full border border-gray-300 rounded-lg p-3">
              <option>Select a category</option>
              <option>Medical</option>
              <option>Logistics</option>
            </select>
          </div>

          <div>
            <label class="text-sm font-medium mb-2 block">Contact Person</label>
            <input
              type="text"
              placeholder="Enter contact person name"
              class="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label class="text-sm font-medium mb-2 block">Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              class="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label class="text-sm font-medium mb-2 block">Phone</label>
            <input
              type="tel"
              placeholder="e.g 0801 234 5678"
              class="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label class="text-sm font-medium mb-2 block">Balance Date</label>
            <input
              type="date"
              class="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label class="text-sm font-medium mb-2 block"
              >Opening Balance</label
            >
            <input
              type="number"
              placeholder="₦ Enter the initial balance"
              class="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
        </div>

        <h3 class="text-lg font-semibold mt-10">Bank Details</h3>

        <div class="grid grid-cols-2 gap-6 mt-4">
          <div>
            <label class="text-sm font-medium mb-2 block">Bank Name</label>
            <select class="w-full border border-gray-300 rounded-lg p-3">
              <option>Select an institution</option>
              <option>Access Bank</option>
              <option>Zenith Bank</option>
              <option>GT Bank</option>
            </select>
          </div>

          <div>
            <label class="text-sm font-medium mb-2 block">Bank Code</label>
            <input
              type="text"
              placeholder="--"
              class="w-full border border-gray-300 rounded-lg p-3"
              disabled
            />
          </div>

          <div>
            <label class="text-sm font-medium mb-2 block">Account Number</label>
            <input
              type="number"
              placeholder="Enter the account number"
              class="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label class="text-sm font-medium mb-2 block">Account Holder</label>
            <input
              type="text"
              placeholder="--"
              class="w-full border border-gray-300 rounded-lg p-3"
              disabled
            />
          </div>
        </div>

        <div class="flex justify-end mt-10 gap-4">
          <button @click="close" class="bg-gray-200 px-6 py-2 rounded-lg">
            Cancel
          </button>
          <button
            @click="onSubmit"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
