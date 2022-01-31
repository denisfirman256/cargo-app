<template>
  <section v-if="user">
    <dashboard-component></dashboard-component>
    <!-- Wrapper First -->
    <div class="wrapper-main">
      <div class="dashboard mt-5 container-fluid">
        <div class="card mb-5">
          <!-- COURIER EDIT -->
          <div class="card-body">
            <h5 class="card-title mb-3">Edit Data Courier</h5>
              <b-form @submit.prevent="handleUpdate">
                <!-- Courier -->
              <b-form-group label="User">
                <b-form-select 
                v-model="selectedData.user_id" 
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
                v-model="selectedData.transportation_id" 
                :options="optTransportation"
                class="mb-3"
                value-field="id"
                text-field="transportation_type"
                placeholder="Choose Courier"
                >
                </b-form-select>
              </b-form-group>
              <!-- /Transportation -->
                <hr>
                <div class="d-flex mt-3">
                  <router-link class="btn btn-danger mr-4" :to="{name: 'Courier'}">Back</router-link>
                  <button class="btn btn-success" type="submit">Edit Data</button>
                </div>
              </b-form>
          </div>
          <!-- /COURIER EDIT -->
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
        user_id : '',
        transportation_id: '',
        status: ''
      },

      // Option courier
      optUser: [],
      optTransportation: [],

    }
  },
  mounted(){
    this.getAdmin();
    this.getCourier();
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
    // Get Courier
    getCourier() {
      axios.get("/api/v1/courier/"+ this.id, {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        this.selectedData = {
          user_id : response.data.data.user_id.id,
          transportation_id : response.data.data.transportation_id.id,
          status : response.data.data.status
        }

      });
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

    // Update
    handleUpdate() {
      axios.put('/api/v1/courier/' +this.id, this.selectedData, {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        if(response.status == 200){
          // Notification Error
          this.$notify({
            title: 'Edit success!!',
            type: 'success',
            text: 'Update has been successfull'
          });
          this.$router.push({
            name: 'Courier'
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