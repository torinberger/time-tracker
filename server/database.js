const { Client } = require('pg')

// clients will also use environment variables
// for connection information
const client = new Client()
await client.connect()
