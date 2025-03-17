<template>
  <div class="min-h-screen bg-bg-sunken">
    <AppHeader />
    <Navigation />
    <main class="mx-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/header/AppHeader.vue";
import Navigation from "~/components/header/Navigation.vue";
</script>

<style scoped>
input {
  appearance: none;
  -webkit-appearance: none;
  background-color: white !important;
  color: black !important;
}
</style>
