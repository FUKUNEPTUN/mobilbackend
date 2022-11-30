const express = require('express')
var cors = require('cors')
const mysql = require('mysql')
const app = express()
const port = 3000
app.use(express.static('kepek2'))
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Szia Világ!')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})

app.get('/iro', (req, res) => {

    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'library'
    })
    
    connection.connect()
    
    connection.query('SELECT * FROM `iro_profil` ', (err, rows, fields) => {
      if (err) throw err
      res.send(rows)
    })
    
    connection.end()
    
  })