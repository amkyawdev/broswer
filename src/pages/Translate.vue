<template>
  <div class="translate-page">
    <div class="translate-header">
      <h2>ဘာသာပြန်စက်</h2>
      <p>စကားလုံး၊ စာကြောင်းများ အလွယ်တကူ ဘာသာပြန်ပါ</p>
    </div>

    <div class="language-selectors">
      <div class="language-selector glass">
        <label>မှ</label>
        <select v-model="sourceLang" class="lang-select">
          <option value="auto">Auto Detect</option>
          <option value="my">မြန်မာ</option>
          <option value="en">အင်္ဂလိပ်</option>
          <option value="th">ထိုင်း</option>
          <option value="zh">တရုတ်</option>
        </select>
      </div>

      <button @click="swapLanguages" class="swap-button">
        <ArrowLeftRight :size="20" />
      </button>

      <div class="language-selector glass">
        <label>သို့</label>
        <select v-model="targetLang" class="lang-select">
          <option value="my">မြန်မာ</option>
          <option value="en">အင်္ဂလိပ်</option>
          <option value="th">ထိုင်း</option>
          <option value="zh">တရုတ်</option>
          <option value="ja">ဂျပန်</option>
          <option value="ko">ကိုရီးယား</option>
        </select>
      </div>
    </div>

    <div class="text-areas">
      <div class="text-area-container glass">
        <textarea
          v-model="sourceText"
          placeholder="ဘာသာပြန်ရန် စာသားရိုက်ထည့်ပါ..."
          class="translate-textarea"
          @input="autoTranslate"
        ></textarea>
        <div class="text-info">
          <span>{{ sourceText.length }} လုံး</span>
          <button v-if="sourceText" @click="sourceText = ''" class="clear-button">
            <X :size="16" />
          </button>
        </div>
      </div>

      <div class="text-area-container glass">
        <textarea
          v-model="translatedText"
          placeholder="ဘာသာပြန်ချက်..."
          class="translate-textarea"
          readonly
        ></textarea>
        <div class="text-info">
          <span>{{ translatedText.length }} လုံး</span>
          <button @click="copyTranslation" class="copy-button">
            <Copy :size="16" />
          </button>
        </div>
      </div>
    </div>

    <div class="translate-actions">
      <button @click="translateText" class="translate-button" :disabled="!sourceText || translating">
        <Loader2 v-if="translating" :size="20" class="spin" />
        <span v-else>ဘာသာပြန်မည်</span>
      </button>
      <button @click="speakTranslation" class="speak-button" :disabled="!translatedText">
        <Volume2 :size="20" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ArrowLeftRight, X, Copy, Loader2, Volume2 } from 'lucide-vue-next'
import { translateText, detectLanguage } from '../services/translate.service.js'

const sourceText = ref('')
const translatedText = ref('')
const sourceLang = ref('auto')
const targetLang = ref('my')
const translating = ref(false)
const autoTranslateTimeout = ref(null)

const translate = async () => {
  if (!sourceText.value.trim()) return

  translating.value = true
  try {
    const text = sourceText.value.trim()
    const detectedLang = sourceLang.value === 'auto' ? detectLanguage(text) : sourceLang.value
    
    const result = await translateText(text, targetLang.value)
    translatedText.value = result
  } catch (error) {
    translatedText.value = 'ဘာသာပြန်ခြင်း မအောင်မြင်ပါ။'
    console.error('Translation error:', error)
  }
  translating.value = false
}

const autoTranslate = () => {
  clearTimeout(autoTranslateTimeout.value)
  autoTranslateTimeout.value = setTimeout(() => {
    if (sourceText.value.trim().length > 2) {
      translate()
    }
  }, 1000)
}

const swapLanguages = () => {
  const temp = sourceLang.value
  sourceLang.value = targetLang.value
  targetLang.value = temp
  
  const tempText = sourceText.value
  sourceText.value = translatedText.value
  translatedText.value = tempText
}

const copyTranslation = async () => {
  try {
    await navigator.clipboard.writeText(translatedText.value)
    alert('ကော်ပီကူးပြီးပါပြီ!')
  } catch (error) {
    console.error('Copy failed:', error)
  }
}

const speakTranslation = () => {
  if (!translatedText.value) return
  
  const utterance = new SpeechSynthesisUtterance(translatedText.value)
  utterance.lang = targetLang.value === 'my' ? 'my-MM' : 'en-US'
  speechSynthesis.speak(utterance)
}
</script>

<style scoped>
.translate-page {
  padding: 20px 16px 100px;
  max-width: 500px;
  margin: 0 auto;
}

.translate-header {
  text-align: center;
  margin-bottom: 30px;
}

.translate-header h2 {
  font-size: 24px;
  margin-bottom: 8px;
  background: linear-gradient(135deg, var(--neon-teal), var(--neon-cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.translate-header p {
  opacity: 0.7;
  font-size: 14px;
}

.language-selectors {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.language-selector {
  flex: 1;
  padding: 16px;
  border-radius: var(--radius-md);
}

.language-selector label {
  display: block;
  font-size: 12px;
  opacity: 0.7;
  margin-bottom: 8px;
}

.lang-select {
  width: 100%;
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  font-family: var(--font-burmese);
  outline: none;
  cursor: pointer;
}

.swap-button {
  background: linear-gradient(135deg, var(--neon-teal), var(--neon-cyan));
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.swap-button:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-glow);
}

.text-areas {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

.text-area-container {
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.translate-textarea {
  width: 100%;
  min-height: 150px;
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  font-family: var(--font-burmese);
  padding: 16px;
  resize: vertical;
  outline: none;
}

.translate-textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.translate-textarea:readonly {
  background: rgba(255, 255, 255, 0.03);
}

.text-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.02);
  font-size: 12px;
  opacity: 0.7;
}

.clear-button, .copy-button {
  background: transparent;
  border: none;
  color: var(--neon-teal);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.clear-button:hover, .copy-button:hover {
  background: rgba(0, 255, 224, 0.1);
}

.translate-actions {
  display: flex;
  gap: 16px;
}

.translate-button {
  flex: 1;
  background: linear-gradient(135deg, var(--neon-teal), var(--neon-cyan));
  border: none;
  border-radius: var(--radius-pill);
  color: #0B0F14;
  padding: 16px 32px;
  font-weight: bold;
  font-family: var(--font-burmese);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.translate-button:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: var(--shadow-glow);
}

.translate-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.speak-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--neon-teal);
  border-radius: var(--radius-pill);
  color: var(--neon-teal);
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.speak-button:hover:not(:disabled) {
  background: rgba(0, 255, 224, 0.1);
  box-shadow: var(--shadow-glow);
}

.speak-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>