<script setup lang="ts">
const phone = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const onSubmit = () => {
  console.log({
    phone: phone.value,
    password: password.value,
    rememberMe: rememberMe.value,
  });
};
</script>

<template>
  <div
    class="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-white to-blue-100"
  >
    <!-- <div class="flex justify-center mb-12">
      <img src="/logo.svg" alt="Logo" class="w-12 h-12" />
    </div> -->
    <div class="flex gap-1 items-center justify-center mb-12">
      <img src="/logo.svg" alt="Logo" class="w-12 h-12" />
      <p class="text-lg font-semibold">Remedial ERP</p>
    </div>

    <div class="w-full max-w-[386px] bg-white shadow-lg rounded-2xl p-10">
      <h3 class="text-left text-gray-500 text-sm mb-2">PROCUREMENT</h3>
      <h2 class="text-left text-2xl font-semibold text-gray-800 mb-6">
        Sign in to your account
      </h2>

      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <label class="text-sm text-gray-600 block mb-2">Phone</label>
          <div class="relative">
            <div class="absolute left-3 top-3.5 flex items-center gap-2">
              <img
                src="https://flagsapi.com/NG/flat/64.png"
                alt="Nigeria Flag"
                class="w-6 h-6 rounded-full"
              />
              <span class="text-gray-600 text-sm">+234</span>
            </div>
            <input
              type="text"
              v-model="phone"
              placeholder="801020202020"
              class="pl-20 w-full border bg-white border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600 block mb-2">Password</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="************"
              class="w-full border border-gray-300 rounded-lg p-3 pr-12 focus:ring-blue-500 focus:border-blue-500"
            />
            <div
              class="absolute right-3 top-3 cursor-pointer"
              @click="togglePassword"
            >
              <LucideEye v-if="!showPassword" class="w-5 h-5 text-gray-400" />
              <LucideEyeOff v-else class="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div class="mb-6 flex items-center gap-2">
          <input
            type="checkbox"
            v-model="rememberMe"
            class="rounded border-gray-300 focus:ring-blue-500 bg-white"
          />
          <span class="text-sm text-gray-600">Keep me signed in</span>
        </div>

        <NuxtLink to="/dashboard">
          <button
            type="submit"
            class="w-full bg-blue-600 text-white rounded-lg py-1 px-3 text-center hover:bg-blue-700 transition"
          >
            Proceed
          </button>
        </NuxtLink>
      </form>
      <div class="border border-t border-gray-300 my-6"></div>

      <div class="text-center text-sm text-gray-500">
        <NuxtLink to="/passwords/forgot">
          <span class="hover:text-blue-600">Forgot Password?</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
