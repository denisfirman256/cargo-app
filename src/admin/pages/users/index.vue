<template>
  <section v-if="user.level == 'owner'">
    <dashboard-component></dashboard-component>
    <!-- Wrapper First -->
    <div class="wrapper-main">
      <div class="dashboard mt-5 container-fluid">
        <div class="card mb-5">
          <!-- Table Office Address -->
          <div class="card-body">
            <h5 class="card-title mb-4">Data Users</h5>
            <!-- Data Items -->
            <users-table></users-table>
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
  },
}
</script>