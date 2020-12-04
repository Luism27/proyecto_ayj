window.onload = function(){
    var lat, lon, fecha, hora, mensaj, poli;
    var f1,f2,h1,h2,btn,def;
    def = this.document.getElementById("dtp")
    var road=[];
    btn = this.document.getElementById("button");
    let map = L.map('map').setView([11.3764, -72.2455], 12);
    const tileurl2 = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png';
    L.tileLayer(tileurl2).addTo(map);
    
    marcador = L.marker([0, 0]);
    marcador.addTo(map);
    const date = new Date();
    var mes = (date.getMonth()+1)*0.01;
    def.value= date.getFullYear()+ "-" + mes.toString().slice(2,5) + "-" + date.getDate();
    $(function() {
        $('input[name="datetimes"]').daterangepicker({
          timePicker: true,
          timerFormat: 'HH:mm:ss',
          singleDatePicker: false,
          startDate: moment().subtract(12, 'hour'),
          endDate: moment(),
          timePicker24Hour: false,
          timePickerIncrement: 1,
          timePickerSeconds: true,
          "maxDate": moment(),
          startValue: moment(),
          locale: {
            format: 'YYYY-MM-DD HH:mm:ss A'
          },
          
        },function(start,end) {
        });
        $('#dtp').html(moment().subtract('days', 29).format('D MMMM YYYY') + ' - ' + moment().format('D MMMM YYYY'));
       
    });

    btn.addEventListener("click",()=>{ 
        f1 = def.value.slice(0,19);
        f2 = def.value.slice(24,44);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("f1", f1);
        urlencoded.append("f2", f2);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };
        fetch("/ht", requestOptions)
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            road=[];
            if (poli){
                map.removeLayer(poli)
            }
            if (data.length ==0){
                alert("Datos vacios, no hay nada que mostrar")
            } else {
                data.map((d,i)=>{               
                    road[i]={
                        lat: d.latitud,
                        lon: d.longitud,
                    } 
                });


                poli = L.polyline(road).addTo(map);
            }
        })
        .catch(error => console.log('error', error));

    });

}


