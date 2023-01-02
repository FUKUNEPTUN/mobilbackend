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


app.use(express.static('mufajkep'))
app.use(express.static('irokep'))
app.use(express.static('konyvkep'))
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
    connection.query('SELECT * FROM iro_profil ORDER BY `iro_profil`.`iro_neve` ASC', (err, rows, fields) => {
      if (err) throw err
      res.send(rows)
    })
    connection.end()
  })

  app.post('/iroprofil', (req, res) => {
kapcsolat()
    connection.query('SELECT iro_profil.iro_id,iro_profil.iro_kep,iro_profil.iro_leiras,iro_profil.iro_neve FROM iro_profil WHERE iro_profil.iro_id = '+req.body.bevitel1, function (err, rows, fields) {
      if (err) 
        console.log( err)
      else{
      console.log(rows)
      res.send(rows)}
      
    })
    
    connection.end()
    
  })
  app.post('/iroprofilkonyv', (req, res) => {
    kapcsolat()
        connection.query('SELECT iro_profil.iro_id,iro_profil.iro_kep,iro_profil.iro_leiras,konyv_profil.kp_kep,iro_profil.iro_neve,konyv_profil.konyv_cime,konyv_profil.kp_id FROM iro_profil INNER JOIN konyv_profil ON konyv_profil.iro_id=iro_profil.iro_id WHERE iro_profil.iro_id = '+req.body.bevitel1, function (err, rows, fields) {
          if (err) 
            console.log( err)
          else{
          console.log(rows)
          res.send(rows)}
          
        })
        
        connection.end()
        
      })

  app.get('/mufaj', (req, res) => {
    kapcsolat()
    connection.query('SELECT DISTINCT(konyv_profil.mufaj1),mufaj.mufaj_kep,mufaj.mufaj_nev FROM `mufaj` INNER JOIN konyv_profil ON mufaj.mufaj_id = konyv_profil.mufaj1;', (err, rows, fields) => {
      if (err) throw err
      res.send(rows)
    })
    connection.end()
  })
  app.post('/mufajkonyv', (req, res) => {
    kapcsolat()
        connection.query('SELECT konyv_profil.kp_id,konyv_profil.konyv_cime,konyv_profil.kp_kep FROM konyv_profil WHERE `mufaj1` = '+req.body.mufajid, function (err, rows, fields) {
          if (err) 
            console.log( err)
          else{
          console.log(rows)
          res.send(rows)}
          
        })
        
        connection.end()
        
      })

      app.post('/konyvprofil', (req, res) => {
        kapcsolat()
            connection.query('SELECT * FROM konyv_profil WHERE konyv_profil.kp_id =  '+req.body.konyvid, function (err, rows, fields) {
              if (err) 
                console.log( err)
              else{
              console.log(rows)
              res.send(rows)}
              
            })
            
            connection.end()
            
          })
    

      app.get('/login', (req, res) => {
        kapcsolat()
        connection.query('SELECT * FROM tag_profil', (err, rows, fields) => {
          if (err) throw err
          res.send(rows)
        })
        connection.end()
      })







