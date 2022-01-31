<template>
  <section v-if="user.level == 'owner'">
    <dashboard-component></dashboard-component>
    <div class="wrapper-main">
      <div class="dashboard mt-5 container-fluid">
        <div class="card mb-5">
          <!-- OFFICE ADD -->
          <div class="card-body">
            <h5 class="card-title mb-3">Add Data Users</h5>
            <b-form @submit.prevent="addData">
              <!-- Name -->
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <b-form-group label="First Name">
                    <b-form-input id="first_name" v-model="form.first_name"></b-form-input>
                  </b-form-group>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <b-form-group label="Last Name">
                    <b-form-input id="last_name" v-model="form.last_name"></b-form-input>
                  </b-form-group>
                </div>
              </div>
              <!-- /Name -->
              <!-- Gender -->
              <b-form-group label="Gender">
                <b-form-select 
                v-model="form.gender" 
                :options="optGender"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
                  </template>
                </b-form-select>
              </b-form-group>
              <!-- /Gender -->

              <!-- No Telp -->
              <b-form-group label="No Handphone">
                <b-form-input id="no_telp" v-model="form.no_telp" type="number"></b-form-input>
              </b-form-group>
              <!-- /No Telp -->

              <!-- Email -->
              <b-form-group label="Email">
                <b-form-input id="email" v-model="form.email" type="email"></b-form-input>
              </b-form-group>
              <!-- /Email -->

              <!-- Level -->
              <b-form-group label="Level">
                <b-form-select
                v-model="form.level"
                :options="optLevel"
                >
                </b-form-select>
              </b-form-group>
              <!-- /Level -->

              <!-- Gender -->
              <b-form-group label="Name Office">
                <b-form-select 
                v-model="form.office_id" 
                :options="optOffice"
                value-field="id"
                text-field="name_office"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
                  </template>
                </b-form-select>
              </b-form-group>
              <!-- /Gender -->

              <!-- password -->
              <b-form-group label="Password">
                <b-form-input id="password" v-model="form.password" type="password"></b-form-input>
              </b-form-group>
              <!-- /Password -->

              <!-- Confirm Password -->
              <b-form-group label="Confirm Password">
                <b-form-input id="confirm_password" v-model="form.confirm_password" type="password"></b-form-input>
              </b-form-group>
              <!-- /Confirm Password -->

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
        photo: null,
        office_id: '',
        first_name: '',
        last_name: '',
        gender: '',
        no_telp: '',
        email: '',
        level: '',
        password: '',
        confirm_password: '',
      },

      optOffice: [],

      // Option Users
      optGender: [
        {value: 'Laki - laki', text: 'Laki - laki'},
        {value: 'Perempuan', text: 'Perempuan'}
      ],
      optLevel: [
        {value: 'owner', text: 'Owner'},
        {value: 'head office', text: 'Head Office'},
        {value: 'branch office', text: 'Branch Office'},
        {value: 'courier', text:'Courier'}
      ],

      // State User
      user: {},

      // State Errors
      errors: {},
    }
  },
  mounted() {
    this.getAdmin();
    this.getAllOffice();
  },
  methods: {
    // GetAdmin
    getAdmin(){
      axios.get('/api/v1/auth/me', {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        if (response.data.authme.level == 'owner') {
          this.user = response.data.authme
        } else {
          this.$router.push({
            name: 'App'
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },

    // Get All Office
    getAllOffice(){
      axios.get('/api/v1/address_office', {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        this.optOffice = response.data[0].address_office
      }).catch((error) => {
        console.log(error)
      })
    },
    
    // Add Data
    addData(){
      axios.post('/api/v1/users', this.form, {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
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
