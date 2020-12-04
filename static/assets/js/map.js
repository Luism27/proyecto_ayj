let latitud, longitud, date, humedad, temperatura;

const map = L.map('map').setView([11.3764, -72.2455], 13);
var group = new L.LayerGroup();
map.addLayer(group);
const tileurl = 'https://a.tile.openstreetmap.de/{z}/{x}/{y}.png';
const tileurl2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
L.tileLayer(tileurl).addTo(map);
marcador = L.marker([100000, 100000]);
marcador.addTo(map);
let actualizar2 = setInterval(actualizar, 2000)

async function actualizar(){
    let http = await fetch('/rt');
    let data = await http.json();
    console.log(data.latitud)
    latitud = data.latitud;
    longitud = data.longitud
    date = new Date(data.date);
    humedad = data.humedad;
    temperatura = data.temperatura;
    let NewLatLong = new L.LatLng(latitud,longitud);
    marcador.setLatLng(NewLatLong);
    let variable = `humedad: ${humedad}%-----temperatura: ${temperatura}°C----fecha:${date}  `
    marcador.bindPopup(`${variable}`);
}

