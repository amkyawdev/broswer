<template>
  <nav class="bottom-nav glass">
    <button
      v-for="item in navItems"
      :key="item.name"
      @click="navigateTo(item.route)"
      class="nav-item"
      :class="{ active: activeRoute === item.route }"
    >
      <component :is="item.icon" :size="24" />
      <span class="nav-label">{{ item.name }}</span>
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Home, Bot, Globe, Code, Settings as SettingsIcon } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const navItems = [
  { name: 'Home', icon: Home, route: '/' },
  { name: 'AI', icon: Bot, route: '/ai' },
  { name: 'Browser', icon: Globe, route: '/translate' },
  { name: 'Code', icon: Code, route: '/python' },
  { name: 'Settings', icon: SettingsIcon, route: '/settings' }
]

const activeRoute = computed(() => route.path)

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
}

.nav-item {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px 16px;
  border-radius: var(--radius-md);
}

.nav-item.active {
  color: var(--neon-teal);
  background: rgba(0, 255, 224, 0.1);
  box-shadow: var(--shadow-glow);
}

.nav-label {
  font-size: 12px;
  font-family: var(--font-burmese);
}
</style>