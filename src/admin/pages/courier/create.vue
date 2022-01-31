<template>
  <section>
    <dashboard-component></dashboard-component>
    <div class="wrapper-main">
      <div class="dashboard mt-5 container-fluid">
        <div class="card mb-5">
          <!-- OFFICE ADD -->
          <div class="card-body">
            <h5 class="card-title mb-3">Add Data Courier</h5>
            <b-form @submit.prevent="addData">
              <!-- Courier -->
              <b-form-group label="User">
                <b-form-select 
                v-model="form.user_id" 
                :options="optUser"
                class="mb-3"
                value-field="id"
                text-field="first_name"
                >
                </b-form-select>
              </b-form-group>
              <!-- /Courier -->
              <!-- Transportation -->
              <b-form-group label="Transportation">
                <b-form-select 
                v-model="form.transportation_id" 
                :options="optTransportation"
                class="mb-3"
                value-field="id"
                text-field="transportation_type"
                
                >
                </b-form-select>
              </b-form-group>
              <!-- /Transportation -->
              <hr>
              <div class="d-flex mt-3">
                <router-link class="btn btn-danger mr-4" :to="{name: 'Courier'}">Back</router-link>
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
        user_id: '',
        transportation_id: '',
        status: 'available',
      },

      // Option Users
      optUser: [],
      optTransportation: [],

      // State User
      user: {},

      // State Errors
      errors: {},
    }
  },
  mounted() {
    this.getAdmin();
    this.getDataUsers();
    this.getDataTransportation();
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
    // Get All Only Courier
    getDataUsers(){
      axios.get('/api/v1/users', {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        // Filter Only Courier
        this.optUser = response.data.data.filter(data => data.level == 'courier')

      }).catch((error) => {
        console.log(error)
      })
    },
    // Get All Transportation
    getDataTransportation(){
      axios.get('/api/v1/transportation', {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        if (response.status == 200) {
          this.optTransportation = response.data[0].data
        } else {
          // Notification Success
          this.$notify({
            title: 'Data Error!!',
            type: 'info',
            text: 'Please Try Again!!'
          });
        }
      }).catch((error) => {
        if(error.response.status) {
          this.$router.push({
            name: 'Dashboard'
          })
        }
      })
    },
    
    // Add Data
    addData(){
      axios.post('/api/v1/courier', this.form, {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        // Notification Success
        this.$notify({
          title: 'Data Has Been Added!!',
          type: 'success',
          text: response.data[0].message
        });
        this.$router.push({
          name: 'Courier'
        })
      }).catch((error) => {
        // Notification Error
        this.$notify({
          title: 'Add Data Not Successfull!!',
          type: 'error',
          text: error.response.data[0].message
        });
      })
    },
  }
}
</script>
