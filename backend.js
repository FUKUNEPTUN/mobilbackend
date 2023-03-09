const express = require('express')
var cors = require('cors')
const mysql = require('mysql')
const app = express()
const port = 3000
var connection
function kapcsolat() {
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
app.use(express.static('profilkep'))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Szia Világ!')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})
/*----------------------------------Író profilhoz tartozó lekérdezések-------------------------------------------------------*/
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
  connection.query('SELECT iro_profil.iro_id,iro_profil.iro_kep,iro_profil.iro_leiras,iro_profil.iro_neve FROM iro_profil WHERE iro_profil.iro_id = ' + req.body.bevitel1, function (err, rows, fields) {
    if (err)
      console.log(err)
    else {
      console.log(rows)
      res.send(rows)
    }

  })

  connection.end()

})
app.post('/iroprofilkonyv', (req, res) => {
  kapcsolat()
  connection.query('SELECT * FROM iro_profil INNER JOIN konyv_profil ON konyv_profil.iro_id=iro_profil.iro_id WHERE iro_profil.iro_id = ' + req.body.bevitel1, function (err, rows, fields) {
    if (err)
      console.log(err)
    else {
      console.log(rows)
      res.send(rows)
    }

  })

  connection.end()

})
/*----------------------------------Műfajokhoz tartozó lekérdezések-------------------------------------------------------*/

app.get('/mufaj', (req, res) => {
  kapcsolat()
  connection.query('SELECT DISTINCT(konyv_profil.mufaj1),mufaj.mufaj_kep,mufaj.mufaj_nev FROM `mufaj` INNER JOIN konyv_profil ON mufaj.mufaj_id = konyv_profil.mufaj1 ORDER BY `mufaj`.`mufaj_nev` ASC ', (err, rows, fields) => {
    if (err) throw err
    res.send(rows)
  })
  connection.end()
})
app.post('/mufajkonyv', (req, res) => {
  kapcsolat()
  connection.query('SELECT konyv_profil.kp_id,konyv_profil.konyv_cime,konyv_profil.kp_kep,konyv_profil.alcim FROM konyv_profil WHERE `mufaj1` = ' + req.body.mufajid, function (err, rows, fields) {
    if (err)
      console.log(err)
    else {
      console.log(rows)
      res.send(rows)
    }

  })

  connection.end()

})
/*----------------------------------Könyvprofilhoz tartozó lekérdezések-------------------------------------------------------*/

app.post('/konyvprofil', (req, res) => {
  kapcsolat()
  connection.query('SELECT * FROM konyv_profil INNER JOIN mufaj ON mufaj.mufaj_id = konyv_profil.mufaj1 INNER JOIN iro_profil ON iro_profil.iro_id = konyv_profil.iro_id WHERE konyv_profil.kp_id = ' + req.body.konyvid, function (err, rows, fields) {
    if (err)
      console.log(err)
    else {
      console.log(rows)
      res.send(rows)
    }

  })

  connection.end()

})

/*----------------------------------Felhasználóhoz tartozó lekérdezések pl login, update,regisztráció-------------------------------------------------------*/
app.post('/foryou', (req, res) => {
  kapcsolat()
  connection.query('SELECT * FROM konyv_profil WHERE konyv_profil.mufaj1 = (SELECT tag_profil.kedvenc_m1 FROM tag_profil WHERE tag_profil.tp_id = 1) OR konyv_profil.mufaj1 = (SELECT tag_profil.kedvenc_m2 FROM tag_profil WHERE tag_profil.tp_id = 1) OR konyv_profil.mufaj1 = (SELECT tag_profil.kedvenc_m3 FROM tag_profil WHERE tag_profil.tp_id = 1)  ', function (err, rows, fields) {
    if (err)
      console.log(err)
    else {
      console.log(rows)
      res.send(rows)
    }

  })

  connection.end()

})
app.post('/kedvenckonyv', (req, res) => {
  kapcsolat()
  connection.query('SELECT * FROM mufaj WHERE mufaj_id = (SELECT tag_profil.kedvenc_m1 FROM tag_profil WHERE tag_profil.tp_id = 1) OR mufaj_id = (SELECT tag_profil.kedvenc_m2 FROM tag_profil WHERE tag_profil.tp_id = 1) OR mufaj_id = (SELECT tag_profil.kedvenc_m3 FROM tag_profil WHERE tag_profil.tp_id = 1)', function (err, rows, fields) {
    if (err)
      console.log(err)
    else {
      console.log(rows)
      res.send(rows)
    }

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
app.post('/tagprofil', (req, res) => {
  kapcsolat()
  connection.query('SELECT * FROM tag_profil WHERE tag_profil.tp_id = '+req.body.tagprofilid, function (err, rows, fields) {
    if (err)
      console.log(err)
    else {
      console.log(rows)
      res.send(rows)
    }

  })

  connection.end()

})

app.post('/tagprofilkonyv', (req, res) => {
  kapcsolat()
  connection.query('SELECT * FROM kolcsonzes INNER JOIN konyv_profil AS fika ON fika.kp_id = kolcsonzes.kp_id INNER JOIN tag_profil AS akif on kolcsonzes.tp_id = akif.tp_id WHERE akif.tp_id ='+req.body.tagprofilid, function (err, rows, fields) {
    if (err)
      console.log(err)
    else {
      console.log(rows)
      res.send(rows)
    }

  })

  connection.end()

})
app.post('/foglalasupdate', (req, res) => {
  kapcsolat()
  connection.query('UPDATE kolcsonzes SET k_lejar = "2023-01-28" WHERE kolcsonzes.k_id = '+req.body.kolcsid+' AND kolcsonzes.tp_id = '+req.body.tagprofilid, function (err, rows, fields) {
    if (err)
      res.send(result.affectedRows + " record(s) updated")

    else {
      console.log(rows)
      res.send(rows)
    }

  })

  connection.end()

})
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.get('/kotelezo', (req, res) => {
    
  kapcsolat()
  
  connection.query('SELECT `konyv_cime`,`kp_kep`,`kp_id` FROM `konyv_profil` WHERE `kotelezoolvasmany` = 1 ', function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    res.send(rows)
  })
  
  connection.end()


})


app.get('/osszes', (req, res) => {
  
  kapcsolat()
  
  connection.query('SELECT `kp_kep`,`konyv_cime`,`kp_id` FROM `konyv_profil`', function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    res.send(rows)
  })
  
  connection.end()


})

app.post('/osszeskereso', (req, res) => {
  kapcsolat()
  let parancs = 'SELECT * FROM `konyv_profil` INNER JOIN iro_profil ON iro_profil.iro_id = konyv_profil.iro_id INNER JOIN mufaj ON konyv_profil.mufaj1 = mufaj.mufaj_id WHERE iro_profil.iro_neve LIKE "%'+req.body.bevitel1+'%%" OR mufaj.mufaj_nev LIKE "%'+req.body.bevitel1+'%%" OR konyv_profil.konyv_cime LIKE "%'+req.body.bevitel1+'%%" OR mufaj.mufaj_nev LIKE "%'+req.body.bevitel1+'%%" OR konyv_profil.alcim LIKE "%'+req.body.bevitel1+'%%"  ORDER BY `konyv_profil`.`konyv_cime` ASC'
  connection.query(parancs, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    res.send(rows)
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



    app.post('/ujkolcsonzes', (req, res) => {

      kapcsolat()
      let parancs = "INSERT INTO kolcsonzes VALUES (NULL, '"+req.body.bevitel2+"', '1', '" + req.body.bevitel1  + "', '" + req.body.bevitel1  + "'+INTERVAL 14 DAY)";
      connection.query(parancs, function (err, rows, fields) {
        if (err) throw err
      
        console.log(rows)
        res.send(rows)
      })
      
      connection.end()
  
  
    })





