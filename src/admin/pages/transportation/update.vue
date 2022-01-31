<template>
  <section v-if="user">
    <dashboard-component></dashboard-component>
    <!-- Wrapper First -->
    <div class="wrapper-main">
      <div class="dashboard mt-5 container-fluid">
        <div class="card mb-5">
          <!-- OFFICE EDIT -->
          <div class="card-body">
            <h5 class="card-title mb-3">Edit Data Transportation</h5>
              <b-form @submit.prevent="handleUpdate">
                <!-- Transportation Type -->
                <b-form-group label="Transportation Type">
                  <b-form-input id="name_office" v-model="selectedData.transportation_type"></b-form-input>
                </b-form-group>
                <!-- /Transportation Type -->
                <!-- Capacity -->
                <b-form-group label="Capacity">
                  <b-form-input id="capacity" v-model="selectedData.capacity"></b-form-input>
                </b-form-group>
                <!-- /Capacity -->
                <!-- Unit Weight -->
                <b-form-group label="Unit Weight">
                  <b-form-input id="unit_weight" v-model="selectedData.unit_weight"></b-form-input>
                </b-form-group>
                <!-- /Unit Weight -->
                <!-- License Plate -->
                <b-form-group label="License Plate">
                  <b-form-input id="license_plate" v-model="selectedData.license_plate"></b-form-input>
                </b-form-group>
                <!-- /License Plate -->
                <hr>
                <div class="d-flex mt-3">
                  <router-link class="btn btn-danger mr-4" :to="{name: 'Transportation'}">Back</router-link>
                  <button class="btn btn-success" type="submit">Edit Data</button>
                </div>
              </b-form>
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
export default {
  props: ["id"],
  data(){
    return {
      user: {},
      // Selected Edit
      selectedData: {
        status: '',
        transportation_type: '',
        capacity: '',
        unit_weight: '',
        license_plate: ''
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
    this.getTransportation();
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
    // Get Transportation
    getTransportation() {
      axios.get("/api/v1/transportation/"+ this.id, {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        this.selectedData = {
          transportation_type : response.data.data.transportation_type,
          capacity : response.data.data.capacity,
          unit_weight : response.data.data.unit_weight,
          license_plate : response.data.data.license_plate,
          status : response.data.data.status
        }
      });
    },
    // Update
    handleUpdate() {
      axios.put('/api/v1/transportation/' +this.id, this.selectedData, {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        if(response.status == 200){
          // Notification Error
          this.$notify({
            title: 'Edit success!!',
            type: 'success',
            text: 'Update has been successfull'
          });
          this.$router.push({
            name: 'Transportation'
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