<template>
  <div class="search-container fade-in">
    <div class="search-bar glass">
      <div class="search-icon">
        <Search :size="20" />
      </div>
      <input
        v-model="query"
        type="text"
        :placeholder="placeholder"
        @keyup.enter="performSearch"
        class="search-input"
      />
      <button @click="performSearch" class="search-button">
        ရှာမည်
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from 'lucide-vue-next'
import { useSearch } from '../services/search.service.js'

const { placeholder, performSearch: search } = useSearch()
const query = ref('')

const performSearch = () => {
  if (query.value.trim()) {
    search(query.value)
  }
}
</script>

<style scoped>
.search-container {
  margin: 24px 0;
  padding: 0 16px;
}

.search-bar {
  display: flex;
  align-items: center;
  padding: 4px 4px 4px 20px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 224, 0.2);
}

.search-icon {
  color: var(--neon-teal);
  margin-right: 12px;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 16px;
  font-family: var(--font-burmese);
  padding: 12px 0;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-button {
  background: linear-gradient(135deg, var(--neon-teal), var(--neon-cyan));
  border: none;
  border-radius: var(--radius-pill);
  color: #0B0F14;
  padding: 12px 24px;
  font-weight: bold;
  font-family: var(--font-burmese);
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-button:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-glow);
}
</style>