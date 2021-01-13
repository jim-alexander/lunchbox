const CryptoJS = require('crypto-js')
const fs = require('fs')

const { db } = require('./firebase')

const encrypt = (master, data) => CryptoJS.AES.encrypt(JSON.stringify(data), master).toString()

const decrypt = (master, data) => {
  let bytes = CryptoJS.AES.decrypt(data, master)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}

module.exports = {
  load: async (uid, master) => {
    try {
      const hash = await db.collection('users').doc(uid).get()
      return decrypt(master, hash.data().lunch)
    } catch (err) {
      console.error('Wrong master password, please try again.')
    }
  },
  save: (uid, master) =>
    new Promise(async (res, rej) => {
      if (data) {
        try {
          let hash = encrypt(master, data)
          const docRef = db.collection('users').doc(uid)
          await docRef.set({ lunch: hash })
          res()
        } catch (err) {
          rej('data is null')
        }
      } else rej('data is null')
    })
}
