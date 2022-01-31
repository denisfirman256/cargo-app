<template>
  <section>
    <dashboard-component></dashboard-component>
    <div class="wrapper-main">
      <div class="dashboard mt-5 container-fluid">
        <div class="card mb-5">
          <!-- OFFICE ADD -->
          <div class="card-body">
            <h5 class="card-title mb-3">Add Data Office Address</h5>
            <div class="row">
              <div class="col-sm-12 col md-12 col-lg-8 col-xl-8">
                <div id="map"></div>
              </div>
              <div class="col-sm-12 col md-12 col-lg-4 col-xl-4">
                <b-form @submit.prevent="addData">
                  <b-container>
                    <!-- Name_office -->
                    <b-form-group label="Name Office">
                      <b-form-input id="name_office" v-model="form.name_office"></b-form-input>
                    </b-form-group>
                    <!-- /Name_office -->
                    <!-- address Office -->
                    <b-form-group label="Address Office">
                      <b-form-input id="address_office" v-model="form.address_office"></b-form-input>
                    </b-form-group>
                    <!-- /address Office -->
                    <!-- No Telp Office -->
                    <b-form-group label="No Telp Office">
                      <b-form-input id="no_telp_office" v-model="form.no_telp_office"></b-form-input>
                    </b-form-group>
                    <!-- No Telp Office -->
                    <!-- Latitude -->
                    <b-form-group label="Latitude">
                      <b-form-input id="latitude" v-model="form.latitude"></b-form-input>
                    </b-form-group>
                    <!-- Latitude -->
                    <!-- Longitude -->
                    <b-form-group label="Longitude">
                      <b-form-input id="longitude" v-model="form.longtitude"></b-form-input>
                    </b-form-group>
                    <!-- Longitude -->
                    <hr>
                    <div class="d-flex mt-3">
                      <router-link class="btn btn-danger mr-4" :to="{name: 'Address_Office'}">Back</router-link>
                      <button class="btn btn-success" type="submit">Add Data</button>
                    </div>
                  </b-container>
                </b-form>
              </div>
            </div>
          </div>
          <!-- /OFFICE ADD -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import mapboxgl from "mapbox-gl";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default {
  data(){
    return {
      // State Form
      // StateUser
      user: {},

      form: {
        name_office: '',
        address_office: '',
        no_telp_office: '',
        latitude: '',
        longtitude: ''
      },
      errors: {},
      // Mapbox
      map: {},
      loading: false,
      access_token: 'pk.eyJ1IjoiZGVuaXNmaXJtYW4yNTYiLCJhIjoiY2t3cW80OWl5MDE4ZTJvcWh6N3RlMGpyYiJ9.fiWAKU1g39I_8s0Bqi4iXA', // your access token. Needed if you using Mapbox maps
      location: "",
      center: [107.60583448503166, -6.931875624104535]
    }
  },
  mounted() {
    this.createMap();
    this.getAdmin();
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
    // Add Data
    addData(){
      axios.post('/api/v1/address_office', this.form, {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        // Notification Success
        this.$notify({
          title: 'Data Has Been Added!!',
          type: 'success',
          text: response.data[0].message
        });
        this.$router.push({
          name: 'Address_Office'
        })
      }).catch((error) => {
        // Notification Error
        this.$notify({
          title: 'Add Data Not Successfull!!',
          type: 'danger',
          text: error.response.data.message
        });
      })
    },
    // Create Map
    createMap(){
      try {
        
        mapboxgl.accessToken = this.access_token;
        this.map = new mapboxgl.Map({
          container: 'map', // container ID
          style: 'mapbox://styles/mapbox/streets-v11', // style URL
          center: this.center, // starting position [lng, lat]
          zoom: 9 // starting zoom
        });

        this.map.on('click', (e) => {
          this.form.longtitude = e.lngLat.lng
          this.form.latitude = e.lngLat.lat
        })
        
        // geocoder.on("result", (e) => {
        //   const marker = new mapboxgl.Marker({
        //     draggable: false,
        //     color: "#D80739",
        //   })
        //   .setLngLat(e.result.center)
        //   .addTo(this.map);
        //   this.center = e.result.center;
        //   marker.on('click', (e) => {
        //     console.log(Object.values(e.target.getLngLat()))
        //   });
        // });
      } catch (err) {
        console.log(err)
      }
    },
  }
}
</script>

<style scoped>
  #map {
    width: 100%;
    height: 50vh;
  }
</style>