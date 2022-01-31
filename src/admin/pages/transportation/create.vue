<template>
  <section>
    <dashboard-component></dashboard-component>
    <div class="wrapper-main">
      <div class="dashboard mt-5 container-fluid">
        <div class="card mb-5">
          <!-- OFFICE ADD -->
          <div class="card-body">
            <h5 class="card-title mb-3">Add Data Transportation</h5>
            <b-form @submit.prevent="addData">
              <!-- Transportation Type -->
              <b-form-group label="Transportation Type">
                <b-form-input id="name_office" v-model="form.transportation_type"></b-form-input>
              </b-form-group>
              <!-- /Transportation Type -->
              <!-- Capacity -->
              <b-form-group label="Capacity">
                <b-form-input id="capacity" v-model="form.capacity"></b-form-input>
              </b-form-group>
              <!-- /Capacity -->
              <!-- Unit Weight -->
              <b-form-group label="Unit Weight">
                <b-form-input id="unit_weight" v-model="form.unit_weight"></b-form-input>
              </b-form-group>
              <!-- /Unit Weight -->
              <!-- License Plate -->
              <b-form-group label="License Plate">
                <b-form-input id="license_plate" v-model="form.license_plate"></b-form-input>
              </b-form-group>
              <!-- /License Plate -->
              <hr>
              <div class="d-flex mt-3">
                <router-link class="btn btn-danger mr-4" :to="{name: 'Transportation'}">Back</router-link>
                <button class="btn btn-success" type="submit">Add Data</button>
              </div>
            </b-form>
          </div>
          <!-- /OFFICE ADD -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return {
      // State Form
      form: {
        status: 'not used',
        transportation_type: '',
        capacity: '',
        unit_weight: '',
        license_plate: ''
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
      axios.post('/api/v1/transportation', this.form, {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        // Notification Success
        this.$notify({
          title: 'Data Has Been Added!!',
          type: 'success',
          text: response.data[0].message
        });
        this.$router.push({
          name: 'Transportation'
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
  }
}
</script>
