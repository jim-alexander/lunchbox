const CryptoJS = require('crypto-js')
const fs = require('fs')

let file = 'my.lunch'

module.exports = {
  load: (master) => {
    try {
      let hash = fs.readFileSync(file, { encoding: 'utf-8' })
      let bytes = CryptoJS.AES.decrypt(hash, master) // Decrypt
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    } catch (err) {
      console.error('Wrong master password, please try again.')
    }
  },
  save: (master, data) =>
    new Promise((res, rej) => {
      if (data) {
        try {
          let hash = CryptoJS.AES.encrypt(JSON.stringify(data), master).toString() // Encrypt
          fs.writeFileSync(file, hash)
          res()
        } catch (err) {
          rej('data is null')
        }
      } else rej('data is null')
    })
}
