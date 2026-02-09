export async function translateText(text, targetLang = 'my') {
  // Using Google Translate via public API
  const encodedText = encodeURIComponent(text)
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodedText}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data[0][0][0]
  } catch (error) {
    console.error('Translation error:', error)
    return text
  }
}

export function detectLanguage(text) {
  // Simple Burmese detection
  const burmeseRegex = /[\u1000-\u109F]/
  return burmeseRegex.test(text) ? 'my' : 'en'
}