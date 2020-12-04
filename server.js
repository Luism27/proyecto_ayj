require ("./app/sniffer");

//MySQL
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "database-1.cnef34ajqcez.us-east-1.rds.amazonaws.com",
  user: "Proyecto",
  password: "IntroduccionIngElectronica",
  database: "proyecto"
});
//WEB-SERVER
//Importaciones
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const cons = require('consolidate');
//Configuraciones
app.engine('html',cons.swig)
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('views'))
app.use(express.static('static'))
//rutas de pagina web
app.get('/', (req, res) => {
  res.send(`Datos del celular: ${datos} `)
})

app.get('/mapa',(req,res)=>{
  res.render('mapa.html');
})
app.get('/historico',(req,res)=>{
  res.render('historico.html')
})
app.post('/datos',(req,res)=>{
    console.log(req.body)
    res.sendFile('index.html')
})
app.get('/rt',(req,res)=>{
  if(con){
    var sql = "SELECT * FROM datos ORDER BY id DESC limit 1";
    con.query(sql, function (err, result) {
      if (err) throw err;
      sniffer = result.toString("utf8");

      res.json(result[0]);
      //console.log('La base de datos es: ',result);
    })
  
  } else {
    console.log("Error with DB")
  }
})
app.post('/ht',(req,res)=>{
  console.log(req.body);
  if (con) {
    console.log("Connected!");
    var sql = "SELECT * FROM datos where date BETWEEN ? AND ?";
    var value = [
      req.body.f1,
      req.body.f2,
    ];
    console.log(value)
    con.query(sql, value, function (err, result) {
      if (err) throw err;
      res.json(result);
      //con.end();
    });
  } else {
    console.log("Error conection with db");
  }

})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
