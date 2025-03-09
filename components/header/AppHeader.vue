<template>
  <header class="bg-white border-b border-gray-200 shadow-sm px-6">
    <div class="mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Left Side: Logo & Branch Dropdown -->
      <div class="flex items-center">
        <!-- Logo -->
        <div class="flex items-center mr-6">
          <img src="/logo.svg" alt="Procurement Logo" class="w-8 h-8" />
          <span class="text-blue-700 font-bold text-lg ml-2">PROCUREMENT</span>
        </div>

        <!-- Branch Dropdown -->
        <div class="relative">
          <button
            @click="toggleBranchDropdown"
            class="flex items-center border border-gray-300 rounded px-3 py-1.5 text-text-default font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs bg-bg-neutral"
          >
            {{ selectedBranch }}
            <ChevronDown class="ml-2 h-4 w-4 text-gray-500" />
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="isBranchDropdownOpen"
            class="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg py-1 z-50"
          >
            <a
              v-for="branch in branches"
              :key="branch"
              @click="selectBranch(branch)"
              class="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {{ branch }}
            </a>
          </div>
        </div>
      </div>

      <!-- Right Side: Notifications, Messages, User Profile -->
      <div class="flex items-center space-x-6">
        <!-- Notifications -->
        <div class="relative cursor-pointer" @click="openModal">
          <Bell class="h-6 w-6 text-gray-600" />
          <div
            v-if="notificationCount > 0"
            class="absolute -top-2 -right-2 bg-bg-default text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
          >
            {{ notificationCount > 9 ? "9+" : notificationCount }}
          </div>

          <Notification v-if="notification" />
        </div>

        <!-- Messages -->
        <div class="cursor-pointer" @click="openMessages">
          <MessageSquare class="h-6 w-6 text-gray-600" />
        </div>

        <!-- User Profile -->
        <div class="relative cursor-pointer" @click="toggleProfileMenu">
          <div
            class="h-9 w-9 bg-gray-300 rounded-full flex items-center justify-center"
          >
            <User class="h-6 w-6 text-gray-600" />
          </div>

          <!-- Profile Dropdown -->
          <div
            v-if="isProfileMenuOpen"
            class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg py-1 z-50"
          >
            <a
              href="/profile"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </a>
            <a
              href="/settings"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </a>
            <a
              @click="logout"
              class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { ChevronDown, Bell, MessageSquare, User } from "lucide-vue-next";

import Notification from "~/components/notifications/Notification.vue";

// Branch dropdown state
const isBranchDropdownOpen = ref(false);
const selectedBranch = ref("Lagos branch");
const branches = [
  "Lagos branch",
  "Abuja branch",
  "Port Harcourt branch",
  "Kano branch",
  "Ibadan branch",
];

// Notifications & messages state
const notificationCount = ref(9);
const isProfileMenuOpen = ref(false);

const notification = useNotificationModal();

const openModal = () => {
  notification.value = true;
};

// Toggle Branch Dropdown
const toggleBranchDropdown = () => {
  isBranchDropdownOpen.value = !isBranchDropdownOpen.value;
};

// Select a Branch
const selectBranch = (branch: string) => {
  selectedBranch.value = branch;
  isBranchDropdownOpen.value = false;
};

// Toggle Profile Menu
const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

// Open Messages (Define it properly now)
const openMessages = () => {
  console.log("Opening messages...");
};

// Logout
const logout = () => {
  console.log("Logging out...");
};

// Close dropdowns when clicking outside
const closeDropdownsOnOutsideClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (
    !target.closest(".relative") &&
    (isBranchDropdownOpen.value || isProfileMenuOpen.value)
  ) {
    isBranchDropdownOpen.value = false;
    isProfileMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdownsOnOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdownsOnOutsideClick);
});
</script>
