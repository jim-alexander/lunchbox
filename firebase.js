const admin = require('firebase-admin')

const serviceAccount = require('./simpson-construction-2feffee529fd.json')

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })

const db = admin.firestore()

module.exports = { db }
