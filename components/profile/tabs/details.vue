<template>
  <div class="bg-white rounded-lg shadow-sm">
    <!-- Header -->
    <div class="flex justify-between items-start border-b px-6 py-3">
      <!-- Title -->
      <p class="font-semibold text-gray-700 text-base">Details</p>

      <div class="flex items-center gap-4">
        <!-- Avatar -->

        <!-- Edit Button -->
        <ProfileButton class="bg-profileBlue min-w-[96px] text-white">
          <div class="flex items-center gap-2">
            <LucidePencil class="w-4 h-4 stroke-white" />
            <span>Edit Profile</span>
          </div>
        </ProfileButton>
      </div>
    </div>

    <!-- Body: Info Table -->
    <div class="mt-6 space-y-4 text-sm p-6">
      <div class="flex gap-10">
        <p class="text-gray-500 w-32">Full Name</p>
        <p class="text-gray-900 font-medium">{{ profile.name }}</p>
      </div>

      <div class="flex gap-10">
        <p class="text-gray-500 w-32">Phone</p>
        <p class="text-gray-900 font-medium">{{ profile.phone }}</p>
      </div>

      <div class="flex gap-10">
        <p class="text-gray-500 w-32">Email</p>
        <p class="text-gray-900 font-medium">{{ profile.email }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const profile = {
  name: "Ada Bali",
  phone: "+234 810 000 1111",
  email: "adabali@remedialhealth.com",
  //   initial: 'D' // assuming name starts with D for avatar
};
</script>
