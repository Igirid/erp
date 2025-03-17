<template>
  <div class="bg-white border border-[#091E4224] rounded-xl shadow-sm overflow-x-auto">
    <table class="w-full">
      <thead class="bg-[#F7F8F9]">
        <tr class="text-left border-b border-[#091E4224] text-gray-500 text-sm">
          <th class="py-3 px-4">User</th>
          <th class="py-3 px-4">Status</th>
          <th class="py-3 px-4">Role</th>
          <th class="py-3 px-4 !text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in localUsers" :key="index" class="border-b last:border-0 text-sm">
          <!-- User Info -->
          <td class="py-4 px-4 flex items-center space-x-3 lg:w-[30%]">
            <img :src="user.image || defaultAvatar" alt="User Avatar" class="w-10 h-10 rounded-full" />
            <div>
              <p class="font-semibold text-gray-900">{{ user.name }}</p>
              <p class="text-gray-500 text-xs">{{ user.email }}</p>
            </div>
          </td>

          <!-- Status Badge -->
          <td class="py-4 px-4 lg:w-[30%]">
            <span class="px-3 py-1 text-xs font-semibold rounded-md" :class="user.status === 'Active'
                ? 'bg-[#DCFFF1] border border-[#BAF3DB] text-[#216E4E]'
                : 'bg-[#FFECEB] border border-[#FFD5D2] text-[#AE2E24]'
              ">
              {{ user.status }}
            </span>
          </td>

          <!-- Role Dropdown -->
          <td class="py-4 px-4 lg:w-[30%] relative">
            <div class="relative inline-block">
              <button @click="toggleRoleDropdown(index)"
                class="flex items-center border border-gray-300 rounded px-1 py-1.5 text-text-default font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs bg-bg-neutral w-full justify-between">
                {{ user.role }}
                <ChevronDown class="ml-1 h-4 w-4 text-gray-500" />
              </button>

              <!-- Dropdown Menu -->
              <div v-if="user.isDropdownOpen"
                class="absolute left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg py-1 z-50 w-fit min-w-[100px]">
                <a v-for="role in roles" :key="role" @click="selectRole(index, role)"
                  class="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer">
                  {{ role }}
                </a>
              </div>
            </div>
          </td>

          <!-- Action Menu -->
          <td class="py-4 px-4 text-center lg:w-[10%]">
            <button class="text-gray-900 hover:text-gray-950 !font-extrabold">
              &#x22EE;
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import defaultAvatar from "../../assets/images/avatarImage.png";
import { ChevronDown } from "lucide-vue-next";

// Props
const props = defineProps<{
  users: Array<{
    name: string;
    email: string;
    image?: string;
    status: string;
    role: string;
  }>;
}>();

// Make a reactive copy of users
const localUsers = reactive(
  props.users.map((user) => ({ ...user, isDropdownOpen: false }))
);

// Available roles
const roles = ref(["manager", "officer"]);

// Toggle dropdown per user
const toggleRoleDropdown = (index: number) => {
  localUsers.forEach((user, i) => {
    user.isDropdownOpen = i === index ? !user.isDropdownOpen : false;
  });
};

// Select role
const selectRole = (index: number, role: string) => {
  localUsers[index].role = role;
  localUsers[index].isDropdownOpen = false;
};
</script>
