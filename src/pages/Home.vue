<template>
  <div class="home-page">
    <!-- Header -->
    <header class="header-section fade-in">
      <div class="app-icon glow-effect">
        <Globe :size="40" />
      </div>
      <h1 class="app-title">Smart Browser</h1>
      <p class="app-subtitle">မြန်မာ AI Browser & Web App</p>
    </header>

    <!-- Search Bar -->
    <SearchBar />

    <!-- Quick Access -->
    <QuickIcons />

    <!-- Security Status -->
    <div class="security-card glass fade-in">
      <div class="security-header">
        <Shield class="shield-icon" :size="24" />
        <div class="security-status">
          <span class="security-dot"></span>
          <span>လုံခြုံရေးအပြည့်အဝ</span>
        </div>
      </div>
      <p class="security-text">HTTPS ဖြင့် လုံခြုံစွာ အသုံးပြုနိုင်သည်</p>
    </div>

    <!-- Feature Cards Grid -->
    <div class="features-grid">
      <FeatureCard
        :icon="Bot"
        title="AI Chat"
        subtitle="မြန်မာ AI"
        icon-bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        route="/ai"
      />
      <FeatureCard
        :icon="Languages"
        title="ဘာသာပြန်"
        subtitle="ဘာသာစကားပြန်"
        icon-bg="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        route="/translate"
      />
      <FeatureCard
        :icon="Code"
        title="Python Editor"
        subtitle="ကုဒ်ရေး"
        icon-bg="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        route="/python"
      />
      <FeatureCard
        :icon="Settings"
        title="ဆက်တင်"
        subtitle="စိတ်ကြိုက်ပြင်"
        icon-bg="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
        route="/settings"
      />
    </div>

    <!-- Device Integration -->
    <div class="device-card glass fade-in" @click="$router.push('/permissions')">
      <div class="device-header">
        <div class="device-icon">
          <Cpu :size="24" />
        </div>
        <div>
          <h3>စက်ပစ္စည်း ချိတ်ဆက်မှု</h3>
          <p>GPS, Mic, Brightness, Sound</p>
        </div>
      </div>
      <ChevronRight class="chevron" :size="20" />
    </div>
  </div>
</template>

<script setup>
import { Globe, Shield, Bot, Languages, Code, Settings, Cpu, ChevronRight } from 'lucide-vue-next'
import SearchBar from '../components/SearchBar.vue'
import QuickIcons from '../components/QuickIcons.vue'
import FeatureCard from '../components/FeatureCard.vue'
</script>

<style scoped>
.home-page {
  padding: 20px 16px 80px;
  max-width: 500px;
  margin: 0 auto;
}

.header-section {
  text-align: center;
  margin-bottom: 30px;
}

.app-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--neon-teal), var(--neon-cyan));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: #0B0F14;
}

.app-title {
  font-size: 28px;
  font-weight: bold;
  background: linear-gradient(135deg, var(--neon-teal), var(--neon-cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
}

.app-subtitle {
  font-size: 14px;
  opacity: 0.8;
}

.security-card {
  padding: 20px;
  border-radius: var(--radius-lg);
  margin: 20px 0;
  border-left: 4px solid #10B981;
}

.security-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.security-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  color: #10B981;
}

.security-dot {
  width: 8px;
  height: 8px;
  background: #10B981;
  border-radius: 50%;
  animation: glow 2s infinite;
}

.security-text {
  font-size: 14px;
  opacity: 0.7;
  padding-left: 36px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 24px 0;
}

.device-card {
  padding: 20px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.device-card:hover {
  transform: translateX(5px);
  box-shadow: var(--shadow-glow);
}

.device-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.device-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.device-header h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.device-header p {
  font-size: 12px;
  opacity: 0.7;
}

.chevron {
  opacity: 0.5;
}
</style>
