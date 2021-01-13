const dotenv = require('dotenv')
dotenv.config()

const { load, save } = require('./functions.js')
const { v4: uuidv4 } = require('uuid')

let master = process.env.pass || null // pass=password npm start
let uid = 'rksZowocCsNdsTws4vQjX0EvWin2'

let data = []

let add = (type, entry) => {
  data[type].push({ id: uuidv4(), ...entry })
  return save(uid, master, data)
}

let remove = (type, id) => {
  let index = data[type].findIndex((r) => r.id === id)
  if (index >= 0) {
    data[type].splice(index, 1)
    return save(uid, master, data)
  }
}

let app = async () => {
  await load(uid, master).then((decrypted) => (data = decrypted))
  // await add('bookmarks', { label: 'github', address: 'https://github.com.au' })
  // await remove('bookmarks', 'd10a6481-87ed-44fb-82fd-5f1fb7c60680')
  // await save(uid, master, data)
  console.log(data)
}

app()

// const crypto = require('crypto')
// const assert = require('assert')

// // Generate Alice's keys...
// const alice = crypto.createDiffieHellman(2048)
// const aliceKey = alice.generateKeys()

// // Generate Bob's keys...
// const bob = crypto.createDiffieHellman(alice.getPrime(), alice.getGenerator())
// const bobKey = bob.generateKeys()

// // Exchange and generate the secret...
// const aliceSecret = alice.computeSecret(bobKey)
// const bobSecret = bob.computeSecret(aliceKey)

// // OK
// assert.strictEqual(aliceSecret.toString('hex'), aliceSecret.toString('hex'))
