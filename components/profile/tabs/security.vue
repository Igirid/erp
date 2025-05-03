<script setup lang="ts">
import { ref } from "vue";
import { LucideEye, LucideEyeOff } from "lucide-vue-next";

const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

const showCurrent = ref(false);
const showNew = ref(false);
const showConfirm = ref(false);

const toggle = (field: "current" | "new" | "confirm") => {
  if (field === "current") showCurrent.value = !showCurrent.value;
  if (field === "new") showNew.value = !showNew.value;
  if (field === "confirm") showConfirm.value = !showConfirm.value;
};

const updatePassword = () => {
  console.log("Update password logic", {
    currentPassword: currentPassword.value,
    newPassword: newPassword.value,
    confirmPassword: confirmPassword.value,
  });
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center border-b px-6 py-3">
      <h2 class="font-semibold text-gray-700 text-base">Password</h2>
      <!-- <button
        class="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
       
      >
        Update
      </button> -->
      <ProfileButton
        class="bg-profileBlue min-w-[96px] text-white"
        @click="updatePassword"
      >
        <span>Update</span>
      </ProfileButton>
    </div>

    <!-- Form Rows -->
    <div class="space-y-6 p-6 ">
      <!-- Row 1 -->
      <div class="flex items-center gap-8">
        <label
          for="current-password"
          class="w-56 text-sm text-gray-600 font-medium"
          >Current Password</label
        >
        <div class="relative w-full max-w-md">
          <input
            :type="showCurrent ? 'text' : 'password'"
            id="current-password"
            v-model="currentPassword"
            class="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="button"
            @click="toggle('current')"
            class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
          >
            <LucideEye v-if="!showCurrent" class="w-5 h-5" />
            <LucideEyeOff v-else class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Row 2 -->
      <div class="flex items-center gap-8">
        <label for="new-password" class="w-56 text-sm text-gray-600 font-medium"
          >New Password</label
        >
        <div class="relative w-full max-w-md">
          <input
            :type="showNew ? 'text' : 'password'"
            id="new-password"
            v-model="newPassword"
            class="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="button"
            @click="toggle('new')"
            class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
          >
            <LucideEye v-if="!showNew" class="w-5 h-5" />
            <LucideEyeOff v-else class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Row 3 -->
      <div class="flex items-center gap-8">
        <label
          for="confirm-password"
          class="w-56 text-sm text-gray-600 font-medium"
          >Confirm New Password</label
        >
        <div class="relative w-full max-w-md">
          <input
            :type="showConfirm ? 'text' : 'password'"
            id="confirm-password"
            v-model="confirmPassword"
            class="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="button"
            @click="toggle('confirm')"
            class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
          >
            <LucideEye v-if="!showConfirm" class="w-5 h-5" />
            <LucideEyeOff v-else class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
