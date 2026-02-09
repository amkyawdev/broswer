const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

export async function generateAIResponse(prompt) {
  if (!API_KEY) {
    throw new Error('API key not configured')
  }

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Respond in Burmese: ${prompt}`
          }]
        }]
      })
    })

    const data = await response.json()
    return data.candidates[0].content.parts[0].text
  } catch (error) {
    console.error('AI Error:', error)
    return 'တောင်းပန်ပါတယ်၊ အဖြေမရနိုင်ပါ။ နောက်မှထပ်ကြိုးစားပါ။'
  }
}