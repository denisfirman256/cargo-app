<template>
  <section v-if="user">
    <dashboard-component></dashboard-component>
    <!-- Wrapper First -->
    <div class="wrapper-main">
      <div class="dashboard mt-5 container-fluid">
        <div class="card mb-5">
          <!-- Table Office Address -->
          <div class="card-body">
            <h5 class="card-title mb-4">Data Courier</h5>
            <!-- Data Items -->
            <courier-table></courier-table>
            <!-- /Data Items -->
          </div>
          <!-- /Table Office Address -->
        </div>
      </div>
    </div>
    <!-- /Wrapper First -->

  </section>
</template>
<script>

import axios from "axios";

export default {
  data(){
    return{
      // StateUser
      user: {},
      number: 2,
      // State Errors
      errors: {},
    }
  },
  mounted(){
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
  },
}
</script>

<style scoped>
  #map {
    width: 100%;
    height: 362px;
  }
</style>