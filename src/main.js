import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Import global styles
import './style.css'

// Import components (if needed globally)
import BottomNav from './components/BottomNav.vue'

// Import pages
import Home from './pages/Home.vue'
import AI from './pages/AI.vue'
import Translate from './pages/Translate.vue'
import PythonEditor from './pages/PythonEditor.vue'
import Settings from './pages/Settings.vue'
import Permissions from './pages/Permissions.vue'

// Import services
import { storage } from './services/storage.service.js'
import { setupApp } from './utils/app-init.js'

// Create router with routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Smart Browser - Home',
      requiresAuth: false
    }
  },
  {
    path: '/ai',
    name: 'AI',
    component: AI,
    meta: {
      title: 'မြန်မာ AI လက်ထောက်',
      requiresAuth: false
    }
  },
  {
    path: '/translate',
    name: 'Translate',
    component: Translate,
    meta: {
      title: 'ဘာသာပြန်စက်',
      requiresAuth: false
    }
  },
  {
    path: '/python',
    name: 'PythonEditor',
    component: PythonEditor,
    meta: {
      title: 'Python Editor',
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      title: 'ဆက်တင်များ',
      requiresAuth: false
    }
  },
  {
    path: '/permissions',
    name: 'Permissions',
    component: Permissions,
    meta: {
      title: 'ခွင့်ပြုချက်များ',
      requiresAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Global navigation guards
router.beforeEach(async (to, from, next) => {
  // Update page title
  document.title = to.meta.title || 'Smart Burmese Browser'
  
  // Check if route requires authentication (PIN)
  if (to.meta.requiresAuth) {
    const isAuthenticated = await checkAuth()
    if (isAuthenticated) {
      next()
    } else {
      // Redirect to home or show PIN input
      next('/')
    }
  } else {
    next()
  }
})

// Check authentication (PIN)
async function checkAuth() {
  const savedPIN = localStorage.getItem('app_pin')
  if (!savedPIN) return true // No PIN set
  
  // In a real app, you would show a PIN input modal
  // For now, return true if PIN exists
  return true
}

// Create Vue app
const app = createApp(App)

// Use router
app.use(router)

// Register global components
app.component('BottomNav', BottomNav)

// Add global properties
app.config.globalProperties.$storage = storage
app.config.globalProperties.$formatDate = (date) => {
  return new Date(date).toLocaleDateString('my-MM', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Error handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err, info)
  
  // Show error to user
  const errorMessage = err.message || 'အမှားတစ်ခုဖြစ်နေပါသည်'
  showErrorNotification(errorMessage)
  
  // Send to error tracking service (in production)
  if (process.env.NODE_ENV === 'production') {
    // logErrorToService(err, vm, info)
  }
}

// Global notification function
function showErrorNotification(message) {
  // Create error notification element
  const notification = document.createElement('div')
  notification.className = 'global-error-notification'
  notification.innerHTML = `
    <div class="error-content">
      <span class="error-icon">⚠️</span>
      <span class="error-text">${message}</span>
      <button class="error-dismiss" onclick="this.parentElement.parentElement.remove()">✕</button>
    </div>
  `
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #EF4444;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-family: 'Pyidaungsu', sans-serif;
    z-index: 10001;
    max-width: 90%;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    animation: slideDown 0.3s ease-out;
  `
  
  const style = document.createElement('style')
  style.textContent = `
    @keyframes slideDown {
      from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    .global-error-notification .error-content {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .global-error-notification .error-dismiss {
      background: none;
      border: none;
      color: white;
      font-size: 18px;
      cursor: pointer;
      padding: 0 5px;
    }
  `
  
  document.head.appendChild(style)
  document.body.appendChild(notification)
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideUp 0.3s ease-out'
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove()
        }
      }, 300)
    }
  }, 5000)
}

// Performance monitoring
if (process.env.NODE_ENV === 'development') {
  // Log performance metrics
  window.addEventListener('load', () => {
    if ('performance' in window) {
      const perfData = window.performance.timing
      const loadTime = perfData.loadEventEnd - perfData.navigationStart
      console.log(`📊 App loaded in ${loadTime}ms`)
      
      // Log memory usage if available
      if ('memory' in performance) {
        console.log(`💾 Memory: ${Math.round(performance.memory.usedJSHeapSize / 1048576)}MB used`)
      }
    }
  })
}

// PWA installation detection
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('✅ Service Worker registered:', registration.scope)
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          console.log('🔄 Service Worker update found')
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, show update notification
              showUpdateNotification()
            }
          })
        })
      })
      .catch(error => {
        console.warn('⚠️ Service Worker registration failed:', error)
      })
  })
}

function showUpdateNotification() {
  if (document.getElementById('update-notification')) return
  
  const notification = document.createElement('div')
  notification.id = 'update-notification'
  notification.innerHTML = `
    <div class="update-content">
      <span>🔄 အသစ်ထွက်ရှိပြီး။ မွမ်းမံချင်ပါသလား?</span>
      <button onclick="location.reload()">မွမ်းမံမည်</button>
    </div>
  `
  
  notification.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #00FFE0, #00D4FF);
    color: #0B0F14;
    padding: 12px 20px;
    border-radius: 12px;
    font-family: 'Pyidaungsu', sans-serif;
    z-index: 10000;
    box-shadow: 0 4px 20px rgba(0, 255, 224, 0.3);
    animation: slideUp 0.3s ease-out;
    max-width: 90%;
  `
  
  document.body.appendChild(notification)
  
  // Auto hide after 10 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 10000)
}

// Initialize app
async function initializeApp() {
  try {
    // Initialize storage
    await storage.initDB()
    console.log('💾 Storage initialized')
    
    // Load user settings
    const settings = JSON.parse(localStorage.getItem('app_settings') || '{}')
    
    // Apply theme
    if (settings.darkMode !== false) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
    }
    
    // Apply language
    document.documentElement.lang = settings.language || 'my'
    
    // Check for first run
    const isFirstRun = !localStorage.getItem('app_first_run')
    if (isFirstRun) {
      localStorage.setItem('app_first_run', 'true')
      console.log('🎉 First run detected')
      
      // You could show a welcome tutorial here
    }
    
    // Mount the app
    app.mount('#app')
    
    // Hide loading screen
    const loadingScreen = document.getElementById('loadingScreen')
    if (loadingScreen) {
      loadingScreen.style.opacity = '0'
      setTimeout(() => {
        loadingScreen.style.display = 'none'
      }, 500)
    }
    
    console.log('🚀 App mounted successfully')
    
  } catch (error) {
    console.error('❌ App initialization failed:', error)
    
    // Show error screen
    const errorBoundary = document.getElementById('errorBoundary')
    const errorMessage = document.getElementById('errorMessage')
    
    if (errorBoundary && errorMessage) {
      errorMessage.textContent = 'အက်ပ်စတင်ခြင်းမအောင်မြင်ပါ။ ကျေးဇူးပြု၍ ပြန်လည်ကြိုးစားပါ။'
      errorBoundary.style.display = 'flex'
    }
    
    // Hide loading screen
    const loadingScreen = document.getElementById('loadingScreen')
    if (loadingScreen) {
      loadingScreen.style.display = 'none'
    }
  }
}

// Start the app
initializeApp()

// Export app instance for debugging
if (process.env.NODE_ENV === 'development') {
  window.$vue = app
}

// Global event listeners for app lifecycle
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    console.log('📱 App became visible')
    // Resume any paused activities
  } else {
    console.log('📱 App became hidden')
    // Pause intensive activities
  }
})

// Handle app suspension
let suspendTimeout
window.addEventListener('blur', () => {
  // Will suspend after 30 seconds of inactivity
  clearTimeout(suspendTimeout)
  suspendTimeout = setTimeout(() => {
    console.log('⏸️ App suspended due to inactivity')
    // Save state, pause timers, etc.
  }, 30000)
})

window.addEventListener('focus', () => {
  clearTimeout(suspendTimeout)
})

// Export router for programmatic navigation
export { router }