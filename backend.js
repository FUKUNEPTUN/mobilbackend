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

app.get('/konyv', (req, res) => {

    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'konyvtarbl'
    })
    
    connection.connect()
    
    connection.query('SELECT konyv.konyv_nev,iro.iro_nev,mufaj.mufaj_nev,konyv.konyv_oldalszam,konyv.konyv_kiadaseve,konyv.konyv_kep FROM `konyv` INNER JOIN iro on iro.iro_id=konyv.konyv_iro INNER JOIN mufaj ON mufaj.mufaj_id = konyv.konyv_mufaj ', (err, rows, fields) => {
      if (err) throw err
      res.send(rows)
    })
    
    connection.end()
    
  })