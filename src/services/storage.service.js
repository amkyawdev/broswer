const DB_NAME = 'SmartBurmeseDB'
const DB_VERSION = 1

export class StorageService {
  constructor() {
    this.db = null
    this.initDB()
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onupgradeneeded = (event) => {
        const db = event.target.result
        
        // Create object stores
        if (!db.objectStoreNames.contains('code_snippets')) {
          db.createObjectStore('code_snippets', { keyPath: 'id', autoIncrement: true })
        }
        
        if (!db.objectStoreNames.contains('history')) {
          db.createObjectStore('history', { keyPath: 'id', autoIncrement: true })
        }
        
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' })
        }
      }

      request.onsuccess = (event) => {
        this.db = event.target.result
        resolve()
      }

      request.onerror = (event) => {
        reject(event.target.error)
      }
    })
  }

  async saveCode(code, title = 'Untitled') {
    return this.add('code_snippets', {
      title,
      code,
      timestamp: Date.now(),
      language: 'python'
    })
  }

  async getCodeSnippets() {
    return this.getAll('code_snippets')
  }

  async addHistory(query, type = 'search') {
    return this.add('history', {
      query,
      type,
      timestamp: Date.now()
    })
  }

  async getHistory() {
    return this.getAll('history')
  }

  async clearHistory() {
    return this.clear('history')
  }

  async saveSetting(key, value) {
    return this.add('settings', { key, value })
  }

  async getSetting(key) {
    return this.get('settings', key)
  }

  // Generic DB methods
  add(storeName, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.add(data)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  get(storeName, key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.get(key)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  getAll(storeName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  clear(storeName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.clear()

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }
}

export const storage = new StorageService()