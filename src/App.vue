<template>
  <div class="app-container">
    <router-view />
    <BottomNav />
  </div>
</template>

<script setup>
import BottomNav from './components/BottomNav.vue'
</script>

<style>
.app-container {
  min-height: 100vh;
  background: var(--gradient-dark);
  position: relative;
}

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>