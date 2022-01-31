<template>
  <div id="map" class="my-4">
  </div>
</template>

<script>
import axios from "axios";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default {
  
  data() {
    return {
      // StateData
      datas: {},
      // Mapbox
      map: {},
      loading: false,
      access_token: 'pk.eyJ1IjoiZGVuaXNmaXJtYW4yNTYiLCJhIjoiY2tsYWQyNnFlMm9hZzJxcWpwNzVmdGFhaiJ9._rK7QqIpWp30bAIZtasbsQ', // your access token. Needed if you using Mapbox maps
      location: "",
      center: [107.60583448503166, -6.931875624104535],
      // Geocoding Service
      geocodingService: {},
    }
  },
  mounted(){
    this.createMap();
  },
  methods: {
    createMap(){
      try {
        axios.get('/api/v1/address_office', {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
          this.number++
          this.datas = response.data[0].address_office


          mapboxgl.accessToken = this.access_token;
          this.map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: this.center, // starting position [lng, lat]
            zoom: 9 // starting zoom
          });

          let geocoder =  new MapboxGeocoder({
            accessToken: this.access_token,
            mapboxgl: mapboxgl,
            marker: false,
            placeholder: 'Search Here...'
          });

          // Add the geocoder to the map
          this.map.addControl(geocoder);

          this.datas.forEach((data) => {
            const geoJson = {
              "type": "FeatureCollection",
              "features": [
                {
                  "type": "Feature",
                  "geometry": {
                    "coordinates": [
                      data.longtitude,
                      data.latitude
                    ],
                    "type": "Point"
                  },
                  "properties": {
                    "id": data.id,
                    "name": data.name_office,
                    "address": data.address_office,
                  }
                }
              ]
            }
            geoJson.features.forEach((location) => {
              const {geometry, properties} = location
              const {name, address} = properties

              const content = `
              <div style="overflow-y, auto;max-height:400px,width:100%">
                <table>
                  <tbody>
                    <tr>
                      <td>Office</td>
                      <td>${name}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>${address}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              `

              const popUp = new mapboxgl.Popup({
                offset:25
              }).setHTML(content).setMaxWidth("400px")

              new mapboxgl.Marker({
                draggable: true,
                color: "#D80739",
              })
              
              .setLngLat(geometry.coordinates)
              .setPopup(popUp)
              .addTo(this.map)
            })
          })

          // this.map.on('load', () => {
          //   this.map.addSource('single-point', {
          //     'type': 'geojson',
          //     'data': {
          //       'type': 'FeatureCollection',
          //       'features': []
          //     }
          //   });
            
          //   this.map.addLayer({
          //     'id': 'point',
          //     'source': 'single-point',
          //     'type': 'circle',
          //     'paint': {
          //       'circle-radius': 10,
          //       'circle-color': '#448ee4'
          //     }
          //   });
            
            // Listen for the `result` event from the Geocoder // `result` event is triggered when a user makes a selection
            //  Add a marker at the result's coordinates
            geocoder.on('result', (event) => {
              this.map.setData(event.result.geometry);
            });
          // });
        }).catch((error) => {
          console.log(error.response)
        })
      } catch (err) {
        console.log(err)
      }
    },
  }
}
</script>