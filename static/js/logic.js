function createMap(Earthquakes) {

    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
  
    // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
      "Street Map": streetmap
    };
  
    // Create an overlayMaps object to hold the bikeStations layer.
    let overlayMaps = {
      "Earthquakes": Earthquakes
    };
  
    // Create the map object with options.
    let map = L.map("map", {
      center: [0, 0],
      zoom: 2.5,
      layers: [streetmap, Earthquakes],
      noWrap:true
    });


    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
  function createMarkers(response) {
  
    // Pull the "features" property from response.data.
    let earthquakes = response.features;
  
    // Initialize an array to hold bike markers.
    let quakes = [];
  
    // Loop through the stations array.
    for (let index = 0; index < earthquakes.length; index++) {
      let earthquake = earthquakes[index];

      let latitude = earthquake.geometry.coordinates[1];
      let longitude = earthquake.geometry.coordinates[0];

      // For each station, create a marker, and bind a popup with the station's name.
      // properties.mag,
//geometry.coordinates[2]
      // Conditionals for country gdp_pc
    let color = "";
    if (earthquake.geometry.coordinates[2] > 110) {
        color = "#26B63C";
    }
    else if (earthquake.geometry.coordinates[2] > 90) {
      color = "#581766";
  }
    else if (earthquake.geometry.coordinates[2] > 70) {
        color = "#581766";
    }
    else if (earthquake.geometry.coordinates[2] > 50) {
        color = "#693934";
    }
    else if (earthquake.geometry.coordinates[2] > 30) {
        color = "#ab2316";
    }
    else if (earthquake.geometry.coordinates[2] > 10) {
            color = "#d68d06";
    }
    else {
        color = "#d6d606";
    }


        let quake = L.circle([latitude, longitude], {
        color: color,
        fillColor: color,
        fillOpacity: 0.25,
        radius: earthquake.properties.mag**3 * 1500
      })
        .bindPopup("<h3>Location of earthquake: " + earthquake.properties.place + "<h3><h3> Depth of earthquake: " + earthquake.geometry.coordinates[2]+ "m<h3><h3> Magnitude of earthquake: " + earthquake.properties.mag);
  
      // Add the marker to the bikeMarkers array.
      quakes.push(quake);
    }

  
    // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
    createMap(L.layerGroup(quakes));
  }
  
  
//   Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);


  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
        .then(function(data) {
        console.log("Data:", data);});




