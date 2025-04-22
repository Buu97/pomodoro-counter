<script setup>
import MenuComponent from "@/components/MenuComponent.vue";
</script>

<template>
  <aside class="h-full flex flex-col justify-center">
    <MenuComponent />
  </aside>
  <main class="grow">
    <router-view />
  </main>
</template>

<style scoped>
</style>
