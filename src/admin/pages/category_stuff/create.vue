<template>
  <section>
    <dashboard-component></dashboard-component>
    <div class="wrapper-main">
      <div class="dashboard mt-5 container-fluid">
        <div class="card mb-5">
          <!-- OFFICE ADD -->
          <div class="card-body">
            <h5 class="card-title mb-3">Add Data Category Stuff</h5>
            <b-form @submit.prevent="addData">
              <!-- Name_office -->
              <b-form-group label="Name Category">
                <b-form-input id="name_office" v-model="form.name_category"></b-form-input>
              </b-form-group>
              <!-- /Name_office -->
              <hr>
              <div class="d-flex mt-3">
                <router-link class="btn btn-danger mr-4" :to="{name: 'Category_Stuff'}">Back</router-link>
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
        name_category: '',
      },
      // State User
      user: {},
      // State Error
      errors: {},

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
      axios.post('/api/v1/category_stuff', this.form, {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        // Notification Success
        this.$notify({
          title: 'Data Has Been Added!!',
          type: 'success',
          text: response.data[0].message
        });
        this.$router.push({
          name: 'Category_Stuff'
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
