<template>
  <main class="px-12 space-y-6 py-4">
    <h1 class=" text-[#172B4D] text-xs mt-1 font-semibold">PROFILE SETTINGS</h1>
    <div class="mt-4 w-full bg-white px-6 pt-6 rounded-xl shadow-sm">
      <!-- Profile Section -->
      <div class="flex items-center space-x-4">
        <div class="relative">
          <!-- Profile Image -->
          <img
            src="../../assets/images/profileImg.png"
            alt="Profile Picture"
            class="w-16 h-16 rounded-lg"
          />
          <!-- Active Status Dot -->
          <span class="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <!-- User Details -->
        <div class="leading-none">
          <p class="text-base font-semibold text-[#172B4D]">Ada Bali</p>
          <p class="text-[#44546F] text-sm">Procurement Manager</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="mt-4 flex items-center">
        <NavlinkTab
          :links="links"
          :active-link="activeLink"
          @toggle-view="toggleView"
        />
      </div>
    </div>

    <div class="mt-5">
      <Role v-if="activeLink == 'roles'"/>
      <Activities v-else-if="activeLink == 'activities'"/>
      <Activities v-else-if="activeLink == 'security'"/>
      <Activities v-else-if="activeLink == 'account-details'"/>
    </div>
  </main>
</template>

<script setup lang="ts">
import Activities from './activities.vue';
import Role from './role.vue';
const route = useRoute();
const router = useRouter();

const links = [
  { label: "Account Details", value: "account-details" },
  { label: "Security", value: "security" },
  { label: "Activities", value: "activities" },
  { label: "Roles", value: "roles" },
];

const activeLink = ref(
  (Array.isArray(route.query.tab) ? route.query.tab[0] : route.query.tab) ||
    links[0].value
);

const toggleView = (value: any) => {
  if (value !== activeLink.value) {
    activeLink.value = value;
    router.push({ query: { tab: value } });
  }
};
</script>