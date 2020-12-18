const CryptoJS = require('crypto-js')

const getHashedString = (str, salt) => {
  const enc = CryptoJS.enc.Base64
  const iterations = 1000

  if (!salt) salt = CryptoJS.lib.WordArray.random(128 / 8).toString(enc)

  const hashedString = CryptoJS.PBKDF2(str, salt, {
    keySize: 512 / 32,
    iterations,
  }).toString(enc)

  return { hashedString, salt }
}

module.exports = { getHashedString }
