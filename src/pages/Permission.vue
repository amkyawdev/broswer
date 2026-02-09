<template>
  <div class="permissions-page">
    <div class="permissions-header">
      <h2>ခွင့်ပြုချက်များ</h2>
      <p>အက်ပ်အသုံးပြုရန်လိုအပ်သောခွင့်ပြုချက်များ</p>
    </div>

    <div class="permissions-list">
      <div class="permission-item glass" v-for="perm in permissions" :key="perm.id">
        <div class="permission-info">
          <div class="permission-icon" :style="{ background: perm.color }">
            <component :is="perm.icon" :size="20" />
          </div>
          <div>
            <h3>{{ perm.name }}</h3>
            <p>{{ perm.description }}</p>
          </div>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" v-model="perm.enabled" @change="togglePermission(perm)">
          <span class="slider"></span>
        </label>
      </div>
    </div>

    <div class="permission-note glass">
      <h4>📝 မှတ်ချက်</h4>
      <p>ခွင့်ပြုချက်များကို လိုအပ်သည့်အခါမှသာ ဖွင့်ပေးပါ။ လုံခြုံရေးအတွက် မလိုအပ်သောခွင့်ပြုချက်များကို ပိတ်ထားပါ။</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MapPin, Mic, Sun, Volume2, Camera, Wifi } from 'lucide-vue-next'

const permissions = ref([
  {
    id: 'location',
    name: 'တည်နေရာ',
    description: 'GPS ဖြင့် တည်နေရာသိရှိရန်',
    icon: MapPin,
    color: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
    enabled: false
  },
  {
    id: 'microphone',
    name: 'မိုက်ခရိုဖုန်း',
    description: 'အသံဖမ်းရန်',
    icon: Mic,
    color: 'linear-gradient(135deg, #10B981, #047857)',
    enabled: false
  },
  {
    id: 'camera',
    name: 'ကင်မရာ',
    description: 'ရုပ်ပုံဖမ်းရန်',
    icon: Camera,
    color: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
    enabled: false
  },
  {
    id: 'brightness',
    name: 'မီးအလင်း',
    description: 'မီးအလင်းအား ထိန်းချုပ်ရန်',
    icon: Sun,
    color: 'linear-gradient(135deg, #F59E0B, #D97706)',
    enabled: false
  },
  {
    id: 'audio',
    name: 'အသံ',
    description: 'အသံထွက်ရန်',
    icon: Volume2,
    color: 'linear-gradient(135deg, #EC4899, #BE185D)',
    enabled: true
  },
  {
    id: 'network',
    name: 'အင်တာနက်',
    description: 'အင်တာနက်ချိတ်ဆက်ရန်',
    icon: Wifi,
    color: 'linear-gradient(135deg, #6366F1, #4F46E5)',
    enabled: true
  }
])

const togglePermission = async (perm) => {
  if (perm.enabled) {
    try {
      // Request permission from browser
      if (perm.id === 'location') {
        const status = await navigator.permissions.query({ name: 'geolocation' })
        console.log('Location permission:', status.state)
      } else if (perm.id === 'microphone') {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        stream.getTracks().forEach(track => track.stop())
      } else if (perm.id === 'camera') {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        stream.getTracks().forEach(track => track.stop())
      }
      
      // Save permission state
      localStorage.setItem(`perm_${perm.id}`, 'true')
      
    } catch (error) {
      console.error(`Permission ${perm.id} denied:`, error)
      perm.enabled = false
    }
  } else {
    localStorage.setItem(`perm_${perm.id}`, 'false')
  }
}
</script>

<style scoped>
.permissions-page {
  padding: 20px 16px 100px;
  max-width: 500px;
  margin: 0 auto;
}

.permissions-header {
  text-align: center;
  margin-bottom: 30px;
}

.permissions-header h2 {
  font-size: 24px;
  margin-bottom: 8px;
  background: linear-gradient(135deg, var(--neon-teal), var(--neon-cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.permissions-header p {
  opacity: 0.7;
  font-size: 14px;
}

.permissions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.permission-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.permission-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.permission-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.permission-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.permission-info h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 2px;
}

.permission-info p {
  font-size: 12px;
  opacity: 0.7;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.2);
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background: linear-gradient(135deg, var(--neon-teal), var(--neon-cyan));
}

input:checked + .slider:before {
  transform: translateX(22px);
}

.permission-note {
  padding: 20px;
  border-radius: var(--radius-lg);
}

.permission-note h4 {
  font-size: 16px;
  margin-bottom: 8px;
  color: var(--neon-teal);
}

.permission-note p {
  font-size: 14px;
  opacity: 0.8;
  line-height: 1.5;
}
</style>