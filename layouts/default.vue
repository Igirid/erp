<template>
  <div class="min-h-screen bg-bg-sunken">
    <AppHeader />
    <Navigation />
    <main class="mx-auto px-4 py-4">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/header/AppHeader.vue";
import Navigation from "~/components/header/Navigation.vue";
</script>
