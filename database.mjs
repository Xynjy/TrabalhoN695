import { MongoClient } from 'mongodb'
import config from './config.mjs'

// Connection URL
const client = new MongoClient(config.mongoURL)

// Database Name
const dbName = 'trabalhon695'

async function connect() {
  // Use connect method to connect to the server
  await client.connect()
  console.log('Connected successfully to server')

  return client.db(dbName)
}

export {
  connect
}