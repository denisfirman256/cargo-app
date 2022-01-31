<template>
  <section v-if="user">
    <dashboard-component></dashboard-component>
    <!-- Wrapper First -->
    <div class="wrapper-main">
      <div class="dashboard mt-5 container-fluid">
        <div class="card mb-5">
          <!-- OFFICE EDIT -->
          <div class="card-body">
            <h5 class="card-title mb-3">Add Data Office Address</h5>
            <div class="row">
              <div class="col-sm-12 col md-12 col-lg-8 col-xl-8">
                <div id="map"></div>
              </div>
              <div class="col-sm-12 col md-12 col-lg-4 col-xl-4">
                <b-form @submit.prevent="handleUpdate">
                  <b-container>
                    <!-- Name_office -->
                    <b-form-group label="Name Office">
                      <b-form-input id="name_office" v-model="selectedUser.name_office"></b-form-input>
                    </b-form-group>
                    <!-- /Name_office -->
                    <!-- address Office -->
                    <b-form-group label="Address Office">
                      <b-form-input id="address_office" v-model="selectedUser.address_office"></b-form-input>
                    </b-form-group>
                    <!-- /address Office -->
                    <!-- No Telp Office -->
                    <b-form-group label="No Telp Office">
                      <b-form-input id="no_telp_office" v-model="selectedUser.no_telp_office"></b-form-input>
                    </b-form-group>
                    <!-- No Telp Office -->
                    <!-- Latitude -->
                    <b-form-group label="Latitude">
                      <b-form-input id="latitude" v-model="selectedUser.latitude"></b-form-input>
                    </b-form-group>
                    <!-- Latitude -->
                    <!-- Longitude -->
                    <b-form-group label="Longitude">
                      <b-form-input id="longitude" v-model="selectedUser.longtitude"></b-form-input>
                    </b-form-group>
                    <!-- Longitude -->
                    <hr>
                    <div class="d-flex mt-3">
                      <router-link class="btn btn-danger mr-4" :to="{name: 'Address_Office'}">Back</router-link>
                      <button class="btn btn-success" type="submit">Edit Data</button>
                    </div>
                  </b-container>
                </b-form>
              </div>
            </div>
          </div>
          <!-- /OFFICE EDIT -->
        </div>
      </div>
    </div>
    <!-- /Wrapper First -->
  </section>
</template>

<script>
import axios from "axios";
import mapboxgl from "mapbox-gl";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
export default {
  props: ["id"],
  data(){
    return {
      user: {},
      // Selected Edit
      selectedUser: {
        name_office: '',
        address_office: '',
        no_telp_office: '',
        latitude: '',
        longtitude: ''
      },

      // Mapbox
      map: {},
      loading: false,
      access_token: 'pk.eyJ1IjoiZGVuaXNmaXJtYW4yNTYiLCJhIjoiY2t3cW80OWl5MDE4ZTJvcWh6N3RlMGpyYiJ9.fiWAKU1g39I_8s0Bqi4iXA', // your access token. Needed if you using Mapbox maps
      location: "",
      center: [107.60583448503166, -6.931875624104535],

      // State Map
      selectedMap: {}
    }
  },
  mounted(){
    this.getAdmin();
    this.getOffice();
    this.createMap();
  },
  methods: {
    // GetAdmin
    getAdmin(){
      axios.get('/api/v1/auth/me', {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        this.user = response.data.authme
      }).catch((error) => {
        if(error.response.status) {
          this.$router.push({
            name: 'Login'
          })
        }
      })
    },
    getOffice() {
      axios.get("/api/v1/address_office/"+ this.id +"/edit", {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        this.selectedUser = {
          name_office : response.data.data.name_office,
          address_office: response.data.data.address_office,
          no_telp_office: response.data.data.no_telp_office,
          latitude: response.data.data.latitude,
          longtitude: response.data.data.longtitude
        }
      });
    },
    createMap(){
      try {
        axios.get("/api/v1/address_office/"+ this.id +"/edit", {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
          this.selectedUser = {
            name_office : response.data.data.name_office,
            address_office: response.data.data.address_office,
            no_telp_office: response.data.data.no_telp_office,
            latitude: response.data.data.latitude,
            longtitude: response.data.data.longtitude
          }

          mapboxgl.accessToken = this.access_token;
          this.map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: this.center, // starting position [lng, lat]
            zoom: 9 // starting zoom
          });

          // Map on click to edit data
          this.map.on('click', (e) => {
            this.selectedUser.longtitude = e.lngLat.lng
            this.selectedUser.latitude = e.lngLat.lat
          }) 

          // create Geojson const
          const geoJson = {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "geometry": {
                  "coordinates": [
                    this.selectedUser.longtitude,
                    this.selectedUser.latitude
                  ],
                  "type": "Point"
                },
                "properties": {
                  "name": this.selectedUser.name_office,
                  "address": this.selectedUser.address_office,
                }
              }
            ]
          }

          // Foreach from Geojson const
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
        }).catch((error) => {
          console.log(error)
        })
      } catch (err) {
        console.log(err)
      }
    },
    handleUpdate() {
      axios.put('/api/v1/address_office/' +this.id, this.selectedUser, {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        if(response.status == 200){
          // Notification Error
          this.$notify({
            title: 'Edit success!!',
            type: 'success',
            text: 'Update has been successfull'
          });
          this.$router.push({
            name: 'Address_Office'
          })
        }
      }).catch((error) => {
        // Notification Error
        this.$notify({
          title: 'Edit Data Not Successfull!!',
          type: 'danger',
          text: error.response.data.message
        });
      });
    },
  }
}
</script>

<style scoped>
  #map {
    height: 50vh;
  }
</style>