const express = require('express')
var cors = require('cors')
const mysql = require('mysql')
const app = express()
const port = 3000
var connection 
function kapcsolat(){
connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 's62_db'
})
connection.connect()
}


app.use(express.static('kepek2'))
app.use(express.static('konyvkep'))
app.use(express.static('irokep'))
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Szia Világ!')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})

app.get('/iro', (req, res) => {
  kapcsolat()  
    connection.query('SELECT * FROM `iro_profil` ', (err, rows, fields) => {
      if (err) throw err
      res.send(rows)
    })
    connection.end()
  })
  app.get('/mufaj', (req, res) => {
    kapcsolat()
    connection.query('SELECT * FROM `mufaj` ', (err, rows, fields) => {
      if (err) throw err
      res.send(rows)
    })
    connection.end()
  })
  app.post('/irokonyv', (req, res) => {
    kapcsolat()
    connection.query('SELECT * FROM konyv_profil WHERE iro_id = '+req.body.bevitel1+';', (err, rows, fields) => {
      if (err) throw err
      res.send(rows)
    })
    connection.end()
  })