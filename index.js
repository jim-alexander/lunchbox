const { load, save } = require('./functions.js')
const { v4: uuidv4 } = require('uuid')

let master = 'password' //password

let data = load(master)

let add = (type, entry) => {
  data[type].push({ id: uuidv4(), ...entry })
  return save(master, data)
}

let remove = (type, id) => {
  let index = data[type].findIndex((r) => r.id === id)
  if (index >= 0) {
    data[type].splice(index, 1)
    console.log(data)
    return save(master, data)
  }
}

// add('passwords', {
//   name: 'Google',
//   address: 'https://www.facebook.com.au',
//   password: '_123123',
//   tags: []
// })

// remove('passwords', '614ce233-95e6-419b-aa8a-7e5c2705d026')

console.log(data)
