<template>
  <div class="quick-icons-grid">
    <div v-for="icon in icons" :key="icon.name" 
         class="quick-icon-card glass fade-in"
         :style="{ '--icon-color': icon.color }"
         @click="openLink(icon.url)">
      <div class="icon-wrapper">
        <component :is="icon.icon" :size="24" />
      </div>
      <span class="icon-label">{{ icon.name }}</span>
    </div>
  </div>
</template>

<script setup>
import { Youtube, Facebook, Play, Users } from 'lucide-vue-next'

const icons = [
  { name: 'YouTube', icon: Youtube, color: '#FF0000', url: 'https://youtube.com' },
  { name: 'Facebook', icon: Facebook, color: '#1877F2', url: 'https://facebook.com' },
  { name: 'TikTok', icon: Play, color: '#000000', url: 'https://tiktok.com' },
  { name: 'Litmatch', icon: Users, color: '#8B5CF6', url: 'https://litmatch.net' }
]

const openLink = (url) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
.quick-icons-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 20px 0;
}

.quick-icon-card {
  padding: 20px;
  border-radius: var(--radius-lg);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.quick-icon-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--icon-color), transparent);
  transition: left 0.5s ease;
}

.quick-icon-card:hover::before {
  left: 100%;
}

.quick-icon-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
  color: var(--icon-color);
}

.icon-label {
  font-size: 14px;
  font-weight: 500;
}
</style>