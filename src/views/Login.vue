<template>
<div class="container-fluid">
  <div class="row login-page">
    <!-- Form Login -->
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 d-flex justify-content-center align-items-center login-form">
      <div>
        <div class="mb-5 d-flex justify-content-center">
          <img :src="'libraries/images/LOGO.png'" width="210" class="img-fluid">
        </div>
        <div class="text-center mb-5">
          <h4 class="font-weight-bold">Pantau Pengiriman Paketmu!</h4>
          <p>Lakukan login untuk melanjutkan<br>pemantauan paketmu !</p>
        </div>
        <form @submit.prevent="login" action="/login" method="POST">
          <div class="form-group input-icon">
            <img src="libraries/images/icons/email.svg">
            <input type="text" placeholder="Email" class="form-control" v-model="form.email">
          </div>
          <div class="form-group input-icon">
            <img :src="'libraries/images/icons/password.svg'">
            <input type="password" placeholder="Password" class="form-control" v-model="form.password">
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
            <label class="form-check-label" for="flexCheckChecked">
              Ingatkan Saya!
            </label>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <router-link :to="{ name: 'ForgotPassword' }">Forgot Password</router-link>
            <button type="submit" class="btn btn-success">Login</button>
          </div>
        </form>
      </div>
    </div>
    <!-- Form Login -->
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 d-xs-none d-sm-none d-md-block">
      <section id="img">
        <div class="polygon-1"></div>
        <div class="polygon-2"></div>
        <div class="polygon-3"></div>
      </section>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      form : {
        email : '',
        password : ''
      },
      errors: {}
    }
  },
  methods : {
    login() {
      console.log(this.form)
      axios.post('/api/v1/login', this.form).then((response) => {
        if (response.data.status_code) {
          localStorage.setItem('authenticated', true);
          localStorage.setItem('token', response.data.token);
          this.$router.push({
            name: 'App'
          })
        }
      }).catch((error) => {
        this.$notify({
          title: 'Gagal Login',
          type: 'error',
          text: error.response.data.message
        });
      });
    }
  }
}
</script>

<style scoped>
  .btn {
    padding: 12px 42px;
    border-radius : 26px;
    box-shadow: -6px -6px 20px rgba(255, 255, 255, 0.8), 6px 6px 20px rgba(0, 0, 0, 0.2);
  }
</style>