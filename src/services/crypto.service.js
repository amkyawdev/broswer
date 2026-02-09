import CryptoJS from 'crypto-js'

const SECRET_KEY = 'smart-burmese-browser-2024'

export function encryptData(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
}

export function decryptData(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}

export function generatePINHash(pin) {
  return CryptoJS.SHA256(pin).toString()
}