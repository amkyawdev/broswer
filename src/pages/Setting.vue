<template>
  <div class="settings-page">
    <div class="settings-header">
      <h2>ဆက်တင်များ</h2>
      <p>အပြင်အဆင် စိတ်ကြိုက်ပြင်ဆင်ခြင်း</p>
    </div>

    <div class="settings-section">
      <h3 class="section-title">အပြင်အဆင်</h3>
      
      <div class="setting-item glass">
        <div class="setting-info">
          <span class="setting-icon">🌙</span>
          <div>
            <h4>Dark Mode</h4>
            <p>အနက်ရောင် ပုံစံ</p>
          </div>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" v-model="darkMode" @change="toggleTheme">
          <span class="slider"></span>
        </label>
      </div>

      <div class="setting-item glass">
        <div class="setting-info">
          <span class="setting-icon">✨</span>
          <div>
            <h4>Animation</h4>
            <p>အရောင်တောက်ခြင်း</p>
          </div>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" v-model="animations">
          <span class="slider"></span>
        </label>
      </div>
    </div>

    <div class="settings-section">
      <h3 class="section-title">ရှာဖွေရေး</h3>
      
      <div class="setting-item glass">
        <div class="setting-info">
          <span class="setting-icon">🔍</span>
          <div>
            <h4>ရှာဖွေရေး အင်ဂျင်</h4>
            <p>ပုံမှန်ရှာဖွေရေးအင်ဂျင်</p>
          </div>
        </div>
        <select v-model="searchEngine" class="setting-select">
          <option value="google">Google</option>
          <option value="youtube">YouTube</option>
          <option value="bing">Bing</option>
          <option value="duckduckgo">DuckDuckGo</option>
        </select>
      </div>

      <div class="setting-item glass">
        <div class="setting-info">
          <span class="setting-icon">🌐</span>
          <div>
            <h4>ဘာသာစကား</h4>
            <p>အသုံးပြုမည့် ဘာသာစကား</p>
          </div>
        </div>
        <select v-model="language" class="setting-select">
          <option value="my">မြန်မာ</option>
          <option value="en">အင်္ဂလိပ်</option>
        </select>
      </div>
    </div>

    <div class="settings-section">
      <h3 class="section-title">လုံခြုံရေး</h3>
      
      <div class="setting-item glass">
        <div class="setting-info">
          <span class="setting-icon">🔒</span>
          <div>
            <h4>PIN Lock</h4>
            <p>လုံခြုံရေး PIN သတ်မှတ်ခြင်း</p>
          </div>
        </div>
        <input
          v-model="pin"
          type="password"
          placeholder="PIN 4 လုံး"
          maxlength="4"
          class="pin-input"
        />
      </div>

      <div class="setting-item glass">
        <div class="setting-info">
          <span class="setting-icon">📱</span>
          <div>
            <h4>Biometric</h4>
            <p>လက်ဗွေသို့မဟုတ် Face ID</p>
          </div>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" v-model="biometric">
          <span class="slider"></span>
        </label>
      </div>
    </div>

    <div class="settings-section">
      <h3 class="section-title">Data</h3>
      
      <button @click="clearHistory" class="action-button glass">
        <div class="action-info">
          <span class="action-icon">🗑️</span>
          <div>
            <h4>ရှာဖွေမှု မှတ်တမ်းများ ဖျက်ရန်</h4>
            <p>သိမ်းထားသော ရှာဖွေမှုမှတ်တမ်းများ</p>
          </div>
        </div>
        <ChevronRight :size="20" />
      </button>

      <button @click="clearCache" class="action-button glass">
        <div class="action-info">
          <span class="action-icon">🧹</span>
          <div>
            <h4>Cache ဖျက်ရန်</h4>
            <p>ယာယီဖိုင်များကို ရှင်းလင်းခြင်း</p>
          </div>
        </div>
        <ChevronRight :size="20" />
      </button>

      <button @click="exportData" class="action-button glass">
        <div class="action-info">
          <span class="action-icon">💾</span>
          <div>
            <h4>ဒေတာထုတ်ယူရန်</h4>
            <p>သိမ်းထားသော အချက်အလက်များ</p>
          </div>
        </div>
        <ChevronRight :size="20" />
      </button>
    </div>

    <div class="about-section glass">
      <h3>Smart Burmese Browser</h3>
      <p>ဗားရှင်း 1.0.0</p>
      <p class="copyright">© 2024 Smart Browser Team</p>
    </div>

    <div class="reset-button-container">
      <button @click="resetSettings" class="reset-button">
        အားလုံးပြန်လည်သတ်မှတ်ရန်
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import { storage } from '../services/storage.service.js'

const darkMode = ref(true)
const animations = ref(true)
const searchEngine = ref('google')
const language = ref('my')
const pin = ref('')
const biometric = ref(false)

onMounted(() => {
  loadSettings()
})

const loadSettings = () => {
  const settings = JSON.parse(localStorage.getItem('app_settings') || '{}')
  darkMode.value = settings.darkMode !== false
  animations.value = settings.animations !== false
  searchEngine.value = settings.searchEngine || 'google'
  language.value = settings.language || 'my'
  pin.value = settings.pin || ''
  biometric.value = settings.biometric || false
}

const saveSettings = () => {
  const settings = {
    darkMode: darkMode.value,
    animations: animations.value,
    searchEngine: searchEngine.value,
    language: language.value,
    pin: pin.value,
    biometric: biometric.value
  }
  localStorage.setItem('app_settings', JSON.stringify(settings))
}

const toggleTheme = () => {
  saveSettings()
  if (darkMode.value) {
    document.documentElement.style.setProperty('--gradient-dark', 'linear-gradient(135deg, #0B0F14 0%, #121826 100%)')
  } else {
    document.documentElement.style.setProperty('--gradient-dark', 'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)')
  }
}

const clearHistory = async () => {
  if (confirm('ရှာဖွေမှု မှတ်တမ်းအားလုံးကို ဖျက်မှာသေချာပါသလား?')) {
    try {
      await storage.clearHistory()
      alert('ရှာဖွေမှု မှတ်တမ်းများ ဖျက်ပြီးပါပြီ။')
    } catch (error) {
      alert('ဖျက်ရာတွင် အမှားတစ်ခုဖြစ်ခဲ့သည်။')
    }
  }
}

const clearCache = () => {
  if (confirm('Cache အားလုံးကို ဖျက်မှာသေချာပါသလား?')) {
    localStorage.removeItem('app_cache')
    alert('Cache ဖျက်ပြီးပါပြီ။')
  }
}

const exportData = () => {
  const data = {
    settings: JSON.parse(localStorage.getItem('app_settings') || '{}'),
    timestamp: new Date().toISOString()
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'smart-browser-backup.json'
  a.click()
  URL.revokeObjectURL(url)
}

const resetSettings = () => {
  if (confirm('ဆက်တင်အားလုံးကို ပုံမှန်အတိုင်းပြန်လည်သတ်မှတ်မှာသေချာပါသလား?')) {
    localStorage.clear()
    location.reload()
  }
}

// Watch for changes and auto-save
watch([darkMode, animations, searchEngine, language, pin, biometric], () => {
  saveSettings()
})
</script>

<style scoped>
.settings-page {
  padding: 20px 16px 100px;
  max-width: 500px;
  margin: 0 auto;
}

.settings-header {
  text-align: center;
  margin-bottom: 30px;
}

.settings-header h2 {
  font-size: 24px;
  margin-bottom: 8px;
  background: linear-gradient(135deg, var(--neon-teal), var(--neon-cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.settings-header p {
  opacity: 0.7;
  font-size: 14px;
}

.settings-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  color: var(--neon-teal);
  padding-left: 12px;
  border-left: 3px solid var(--neon-teal);
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: var(--radius-md);
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.setting-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.setting-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.setting-icon {
  font-size: 20px;
}

.setting-info h4 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 2px;
}

.setting-info p {
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

.setting-select {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  padding: 8px 12px;
  font-family: var(--font-burmese);
  outline: none;
  cursor: pointer;
  min-width: 120px;
}

.pin-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  padding: 8px 12px;
  font-family: var(--font-burmese);
  outline: none;
  width: 80px;
  text-align: center;
  letter-spacing: 8px;
  font-size: 18px;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  border-radius: var(--radius-md);
  margin-bottom: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-button:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(5px);
}

.action-info {
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
}

.action-icon {
  font-size: 20px;
}

.action-info h4 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 2px;
  color: white;
}

.action-info p {
  font-size: 12px;
  opacity: 0.7;
}

.about-section {
  padding: 24px;
  border-radius: var(--radius-lg);
  text-align: center;
  margin: 30px 0;
}

.about-section h3 {
  font-size: 20px;
  margin-bottom: 8px;
  color: var(--neon-teal);
}

.about-section p {
  margin-bottom: 4px;
  opacity: 0.8;
}

.copyright {
  font-size: 12px;
  opacity: 0.6;
  margin-top: 12px;
}

.reset-button-container {
  margin-top: 20px;
}

.reset-button {
  width: 100%;
  padding: 16px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid #EF4444;
  border-radius: var(--radius-md);
  color: #EF4444;
  font-family: var(--font-burmese);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-button:hover {
  background: rgba(239, 68, 68, 0.2);
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
}
</style>