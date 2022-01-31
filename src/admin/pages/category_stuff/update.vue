<template>
  <section v-if="user">
    <dashboard-component></dashboard-component>
    <!-- Wrapper First -->
    <div class="wrapper-main">
      <div class="dashboard mt-5 container-fluid">
        <div class="card mb-5">
          <!-- OFFICE EDIT -->
          <div class="card-body">
            <h5 class="card-title mb-3">Edit Data Category Stuff</h5>
              <b-form @submit.prevent="handleUpdate">
                <!-- Category Stuff -->
                <b-form-group label="Category Name">
                  <b-form-input id="category_stuff" v-model="selectedData.name_category"></b-form-input>
                </b-form-group>
                <!-- /Category Stuff -->
                <hr>
                <div class="d-flex mt-3">
                  <router-link class="btn btn-danger mr-4" :to="{name: 'Category_Stuff'}">Back</router-link>
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
        name_category: ''
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
    this.getCategory();
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
    // Get Category
    getCategory() {
      axios.get("/api/v1/category_stuff/"+ this.id, {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        this.selectedData = {
          name_category : response.data.data.name_category,
        }
      });
    },
    // Update
    handleUpdate() {
      axios.put('/api/v1/category_stuff/' +this.id, this.selectedData, {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        if(response.status == 200){
          // Notification Error
          this.$notify({
            title: 'Edit success!!',
            type: 'success',
            text: 'Update has been successfull'
          });
          this.$router.push({
            name: 'Category_Stuff'
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