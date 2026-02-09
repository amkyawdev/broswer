<template>
  <div 
    class="feature-card glass fade-in"
    @click="handleClick"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    :class="{ 'hover-glow': hover }"
  >
    <div class="card-icon" :style="{ background: iconBg }">
      <component :is="icon" :size="24" />
    </div>
    <div class="card-content">
      <h3>{{ title }}</h3>
      <p>{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  icon: Object,
  title: String,
  subtitle: String,
  iconBg: String,
  route: String
})

const router = useRouter()
const hover = ref(false)

const handleClick = () => {
  if (props.route) {
    router.push(props.route)
  }
}
</script>

<style scoped>
.feature-card {
  padding: 20px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hover-glow {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.card-content h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.card-content p {
  font-size: 12px;
  opacity: 0.7;
}
</style>