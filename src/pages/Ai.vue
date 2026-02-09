<template>
  <div class="ai-page">
    <div class="ai-header">
      <h2>မြန်မာ AI လက်ထောက်</h2>
      <p>စိတ်ကြိုက်မေးမြန်းနိုင်ပါသည်</p>
    </div>

    <div class="chat-container" ref="chatContainer">
      <div v-for="(msg, index) in messages" :key="index" 
           :class="['message', msg.type]">
        <div class="message-content">
          {{ msg.text }}
          <span v-if="msg.type === 'ai' && msg.loading" class="typing-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </span>
        </div>
        <div class="message-time">
          {{ formatTime(msg.timestamp) }}
        </div>
      </div>
    </div>

    <div class="input-container glass">
      <input
        v-model="userInput"
        type="text"
        placeholder="မေးခွန်းမေးရန် ရိုက်ထည့်ပါ..."
        @keyup.enter="sendMessage"
        class="ai-input"
      />
      <button @click="sendMessage" class="send-button" :disabled="loading">
        <Send :size="20" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Send } from 'lucide-vue-next'
import { generateAIResponse } from '../services/ai.service.js'

const userInput = ref('')
const messages = ref([])
const loading = ref(false)
const chatContainer = ref(null)

onMounted(() => {
  // Initial greeting
  messages.value.push({
    type: 'ai',
    text: 'မင်္ဂလာပါ! Smart Burmese Browser AI မှ ကြိုဆိုပါတယ်။ ဘာကူညီပေးရမလဲ?',
    timestamp: new Date()
  })
})

const sendMessage = async () => {
  if (!userInput.value.trim() || loading.value) return

  const userMessage = userInput.value.trim()
  userInput.value = ''

  // Add user message
  messages.value.push({
    type: 'user',
    text: userMessage,
    timestamp: new Date()
  })

  // Add loading AI message
  const loadingMessage = {
    type: 'ai',
    text: '',
    loading: true,
    timestamp: new Date()
  }
  messages.value.push(loadingMessage)

  loading.value = true
  scrollToBottom()

  try {
    const response = await generateAIResponse(userMessage)
    
    // Replace loading message with actual response
    const index = messages.value.indexOf(loadingMessage)
    messages.value[index] = {
      type: 'ai',
      text: response,
      loading: false,
      timestamp: new Date()
    }
  } catch (error) {
    const index = messages.value.indexOf(loadingMessage)
    messages.value[index] = {
      type: 'ai',
      text: 'တောင်းပန်ပါတယ်၊ အဖြေမရနိုင်ပါ။ နောက်မှထပ်ကြိုးစားပါ။',
      loading: false,
      timestamp: new Date()
    }
  }

  loading.value = false
  scrollToBottom()
}

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

const formatTime = (date) => {
  return date.toLocaleTimeString('my-MM', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}
</script>

<style scoped>
.ai-page {
  padding: 20px 16px 100px;
  max-width: 500px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.ai-header {
  text-align: center;
  margin-bottom: 20px;
}

.ai-header h2 {
  font-size: 24px;
  margin-bottom: 8px;
  background: linear-gradient(135deg, var(--neon-teal), var(--neon-cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.ai-header p {
  opacity: 0.7;
  font-size: 14px;
}

.chat-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px 0;
}

.message {
  margin-bottom: 20px;
  max-width: 80%;
}

.message.user {
  margin-left: auto;
}

.message.ai {
  margin-right: auto;
}

.message-content {
  padding: 12px 16px;
  border-radius: 20px;
  font-size: 14px;
  line-height: 1.5;
}

.message.user .message-content {
  background: linear-gradient(135deg, var(--neon-teal), var(--neon-cyan));
  color: #0B0F14;
  border-bottom-right-radius: 4px;
}

.message.ai .message-content {
  background: rgba(255, 255, 255, 0.1);
  border-bottom-left-radius: 4px;
}

.message-time {
  font-size: 11px;
  opacity: 0.5;
  margin-top: 4px;
  text-align: right;
}

.message.ai .message-time {
  text-align: left;
}

.typing-dots {
  display: inline-block;
  margin-left: 4px;
}

.dot {
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--neon-teal);
  margin: 0 2px;
  animation: bounce 1.4s infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-4px);
  }
}

.input-container {
  display: flex;
  align-items: center;
  padding: 8px 8px 8px 20px;
  border-radius: var(--radius-pill);
  margin-top: 20px;
}

.ai-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
  font-family: var(--font-burmese);
  padding: 12px 0;
}

.ai-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.send-button {
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

.send-button:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: var(--shadow-glow);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>