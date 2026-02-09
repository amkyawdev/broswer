import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Pages
import Home from './pages/Home.vue'
import AI from './pages/AI.vue'
import Translate from './pages/Translate.vue'
import PythonEditor from './pages/PythonEditor.vue'
import Settings from './pages/Settings.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/ai', component: AI },
  { path: '/translate', component: Translate },
  { path: '/python', component: PythonEditor },
  { path: '/settings', component: Settings }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')