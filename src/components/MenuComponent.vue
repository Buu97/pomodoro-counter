<script setup>

</script>

<template>
  <nav class="flex flex-col gap-4 px-3 py-4">
    <RouterLink to="/" active-class="rounded-sm active">
      <span class="material-symbols-outlined">
        timer
      </span>
    </RouterLink>
    <RouterLink to="/tasks" active-class="rounded-sm active">
      <span class="material-symbols-outlined">
        assignment
      </span>
    </RouterLink>
    <RouterLink to="/settings" active-class="rounded-sm active">
      <span class="material-symbols-outlined">
        settings
      </span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.material-symbols-outlined {
  font-size: 2.5rem;
}
a.active {
background-color: hsl(from var(--color-primary) h s l / 0.2)
}
</style>