<template>
  <div class="editor-page">
    <div class="editor-header">
      <h2>Python Editor</h2>
      <p>ကုဒ်ရေးသားရန် အဆင်သင့်ဖြစ်ပြီ</p>
    </div>

    <div class="editor-toolbar">
      <input
        v-model="filename"
        type="text"
        placeholder="ဖိုင်အမည်..."
        class="filename-input glass"
      />
      <div class="toolbar-buttons">
        <button @click="saveCode" class="toolbar-button">
          <Save :size="20" />
          သိမ်းမည်
        </button>
        <button @click="runCode" class="toolbar-button run-button">
          <Play :size="20" />
          Run
        </button>
        <button @click="newFile" class="toolbar-button">
          <FilePlus :size="20" />
          အသစ်
        </button>
      </div>
    </div>

    <div class="code-editor-container glass">
      <div class="editor-header-bar">
        <div class="editor-tabs">
          <button class="tab active">main.py</button>
        </div>
        <div class="editor-actions">
          <button @click="copyCode" class="editor-action">
            <Copy :size="16" />
          </button>
          <button @click="formatCode" class="editor-action">
            <AlignLeft :size="16" />
          </button>
        </div>
      </div>
      <textarea
        v-model="code"
        class="code-editor"
        placeholder="# Python code ရေးသားပါ..."
        spellcheck="false"
      ></textarea>
    </div>

    <div class="output-container glass">
      <div class="output-header">
        <h3>Output</h3>
        <button @click="clearOutput" class="clear-output">
          <Trash2 :size="16" />
        </button>
      </div>
      <div class="output-content">
        <pre>{{ output }}</pre>
      </div>
    </div>

    <div v-if="showPermission" class="permission-modal">
      <div class="modal-content glass">
        <h3>လိုအပ်သော ခွင့်ပြုချက်</h3>
        <p>ကုဒ်ရေးသားရန် လိုအပ်သော ခွင့်ပြုချက်</p>
        <div class="modal-buttons">
          <button @click="requestPermission" class="modal-button allow">
            ခွင့်ပြုပါ
          </button>
          <button @click="showPermission = false" class="modal-button deny">
            ငြင်းပယ်ပါ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Save, Play, FilePlus, Copy, AlignLeft, Trash2 } from 'lucide-vue-next'
import { storage } from '../services/storage.service.js'

const code = ref('')
const output = ref('')
const filename = ref('')
const showPermission = ref(false)

const defaultCode = `# Python Code Editor
print("မင်္ဂလာပါ! Smart Burmese Browser")

# Fibonacci function
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# နမူနာတွက်ချက်မှု
print("Fibonacci sequence:")
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")

# စကားလုံးရေတွက်ခြင်း
text = "မြန်မာစာကို Python ဖြင့် အသုံးပြုခြင်း"
words = text.split()
print(f"\\nစကားလုံးအရေအတွက်: {len(words)}")
print("စကားလုံးများ:", words)`

onMounted(() => {
  code.value = defaultCode
  // Check if permission granted
  const hasPermission = localStorage.getItem('code_permission')
  if (!hasPermission) {
    showPermission.value = true
  }
})

const requestPermission = () => {
  localStorage.setItem('code_permission', 'true')
  showPermission.value = false
}

const saveCode = async () => {
  if (!code.value.trim()) return
  
  try {
    await storage.saveCode(code.value, filename.value || 'Untitled')
    output.value = '✅ Code saved successfully!'
  } catch (error) {
    output.value = '❌ Error saving code: ' + error.message
  }
}

const runCode = () => {
  if (!code.value.trim()) {
    output.value = '❌ Please write some code first!'
    return
  }

  output.value = '🚀 Running Python code...\n\n'
  
  // Simulate Python execution (client-side simulation)
  try {
    // Simple Python-like evaluation (for demo only)
    const lines = code.value.split('\n')
    let result = ''
    
    for (const line of lines) {
      if (line.includes('print(')) {
        const match = line.match(/print\(["'](.+)["']\)/)
        if (match) {
          result += match[1] + '\n'
        }
      } else if (line.includes('def ')) {
        const match = line.match(/def (\w+)\(/)
        if (match) {
          result += `✅ Function ${match[1]} defined\n`
        }
      } else if (line.trim() && !line.trim().startsWith('#')) {
        result += `📝 Executed: ${line.trim()}\n`
      }
    }
    
    output.value += result + '\n✅ Code execution completed!'
  } catch (error) {
    output.value += '❌ Execution error: ' + error.message
  }
}

const newFile = () => {
  code.value = '# New Python file\nprint("Hello from Smart Burmese Browser!")'
  filename.value = ''
  output.value = ''
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(code.value)
    output.value = '✅ Code copied to clipboard!'
  } catch (error) {
    output.value = '❌ Failed to copy code'
  }
}

const formatCode = () => {
  // Simple formatting - add proper indentation
  const lines = code.value.split('\n')
  let formatted = ''
  let indent = 0
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.endsWith(':')) {
      formatted += '  '.repeat(indent) + trimmed + '\n'
      indent++
    } else if (trimmed.startsWith('return') || trimmed.startsWith('pass') || trimmed.startsWith('break')) {
      indent = Math.max(0, indent - 1)
      formatted += '  '.repeat(indent) + trimmed + '\n'
    } else {
      formatted += '  '.repeat(indent) + line + '\n'
    }
  }
  
  code.value = formatted
  output.value = '✅ Code formatted!'
}

const clearOutput = () => {
  output.value = ''
}
</script>

<style scoped>
.editor-page {
  padding: 20px 16px 100px;
  max-width: 500px;
  margin: 0 auto;
}

.editor-header {
  text-align: center;
  margin-bottom: 24px;
}

.editor-header h2 {
  font-size: 24px;
  margin-bottom: 8px;
  background: linear-gradient(135deg, var(--neon-teal), var(--neon-cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.editor-header p {
  opacity: 0.7;
  font-size: 14px;
}

.editor-toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: center;
}

.filename-input {
  flex: 1;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  border: none;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-family: var(--font-burmese);
  outline: none;
}

.filename-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.toolbar-buttons {
  display: flex;
  gap: 8px;
}

.toolbar-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-family: var(--font-burmese);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.toolbar-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.run-button {
  background: linear-gradient(135deg, #10B981, #34D399);
  font-weight: bold;
}

.run-button:hover {
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
}

.code-editor-container {
  border-radius: var(--radius-lg);
  margin-bottom: 20px;
  overflow: hidden;
}

.editor-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.editor-tabs {
  display: flex;
  gap: 8px;
}

.tab {
  padding: 6px 12px;
  background: rgba(0, 255, 224, 0.1);
  border: 1px solid var(--neon-teal);
  border-radius: 6px;
  color: var(--neon-teal);
  font-size: 12px;
  cursor: pointer;
}

.tab.active {
  background: var(--neon-teal);
  color: #0B0F14;
}

.editor-actions {
  display: flex;
  gap: 8px;
}

.editor-action {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.editor-action:hover {
  color: var(--neon-teal);
  background: rgba(0, 255, 224, 0.1);
}

.code-editor {
  width: 100%;
  min-height: 300px;
  background: #1E1E1E;
  color: #D4D4D4;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
  padding: 16px;
  border: none;
  outline: none;
  resize: vertical;
  tab-size: 2;
}

.code-editor::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.output-container {
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.output-header h3 {
  font-size: 16px;
  font-weight: bold;
}

.clear-output {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-output:hover {
  color: #EF4444;
  background: rgba(239, 68, 68, 0.1);
}

.output-content {
  padding: 16px;
  min-height: 100px;
  max-height: 200px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.3);
}

.output-content pre {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.permission-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-content {
  max-width: 400px;
  width: 100%;
  padding: 30px;
  border-radius: var(--radius-lg);
  text-align: center;
}

.modal-content h3 {
  font-size: 20px;
  margin-bottom: 12px;
  color: var(--neon-teal);
}

.modal-content p {
  margin-bottom: 24px;
  opacity: 0.8;
}

.modal-buttons {
  display: flex;
  gap: 12px;
}

.modal-button {
  flex: 1;
  padding: 14px 24px;
  border-radius: var(--radius-md);
  border: none;
  font-family: var(--font-burmese);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-button.allow {
  background: linear-gradient(135deg, var(--neon-teal), var(--neon-cyan));
  color: #0B0F14;
}

.modal-button.deny {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.modal-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}
</style>