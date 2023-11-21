var earth;

function initialize() {
    var earth = new WE.map('earth_div');
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: '© OpenStreetMap contributors'
    }).addTo(earth);
  
    const ISS_API_URL = 'https://api.wheretheiss.at/v1/satellites/25544';
  
    // Marcador personalizado representando a ISS

    const marker = WE.marker([0, 0], issIcon, 50, 50).addTo(earth);
  
    function fetchData() {
      fetch(ISS_API_URL)
        .then(response => response.json())
        .then(data => {
          const { latitude, longitude } = data;
  
          // Atualiza as coordenadas do marcador da ISS
          marker.setLatLng([latitude, longitude]);
          earth.setView([latitude, longitude], 2);
        })
        .catch(error => console.error('Erro ao obter dados da ISS:', error));
    }
    async function getIss() {
      var dados = await fetch(ISS_API_URL);
      var dadosConvertidos = await dados.json();
      var { latitude, longitude, altitude, velocity } = dadosConvertidos;
      earth.setView([latitude, longitude]);
      document.getElementById('lat').innerHTML = latitude + '°';
      document.getElementById('lon').innerHTML = longitude + '°';
      document.getElementById('vel').innerHTML = Math.round(velocity) + ' Km/H';
      document.getElementById('alt').innerHTML = altitude;
  }
  
    fetchData(); // Obtém dados pela primeira vez ao carregar a página
  
    setInterval(fetchData, 5000); // Atualização a cada 5 segundos (5000 milissegundos)
  }
