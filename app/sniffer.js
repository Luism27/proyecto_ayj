//UDP-SERVER (sniffer)

//My SQL

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "database-1.cnef34ajqcez.us-east-1.rds.amazonaws.com",
  user: "Proyecto",
  password: "IntroduccionIngElectronica",
  database: "proyecto"
});


let datos = "", lat, long, date, hum, temp;
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg) => {
  //GUARDAS BASE DE DATOS
  datos=msg.toString().split(';');
  console.log(datos);
  datos = msg;
  lat = datos[0];
  long = datos[1];
  date = datos[2];
  hum = datos[3];
  temp = datos[4];

  if(con){
    console.log("Connected!");
    var sql = "INSERT INTO datos (latitud, longitud, date, humedad, temperatura) VALUES ?";
    let values = [
    [lat,long,date,hum,temp]
    ];
    con.query(sql,[values], function (err) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  } else {
    console.log("Error con la db");
  }

    
    
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(5000);



