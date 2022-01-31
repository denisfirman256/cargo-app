<template>
  <!-- sidebar -->
  <section v-if="user">
    <div class="wrapper-nav navbar-cargo">
      <!-- Sidebar -->
      <div class="navigation">
        <ul>
          <!-- Brand Navbar -->
          <div class="brand-sidebar">
            <li>
              <a href="">
                <span class="icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 10.9V4.1C22 2.6 21.36 2 19.77 2H15.73C14.14 2 13.5 2.6 13.5 4.1V10.9C13.5 12.4 14.14 13 15.73 13H19.77C21.36 13 22 12.4 22 10.9Z" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M22 19.9V18.1C22 16.6 21.36 16 19.77 16H15.73C14.14 16 13.5 16.6 13.5 18.1V19.9C13.5 21.4 14.14 22 15.73 22H19.77C21.36 22 22 21.4 22 19.9Z" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.5 13.1V19.9C10.5 21.4 9.86 22 8.27 22H4.23C2.64 22 2 21.4 2 19.9V13.1C2 11.6 2.64 11 4.23 11H8.27C9.86 11 10.5 11.6 10.5 13.1Z" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.5 4.1V5.9C10.5 7.4 9.86 8 8.27 8H4.23C2.64 8 2 7.4 2 5.9V4.1C2 2.6 2.64 2 4.23 2H8.27C9.86 2 10.5 2.6 10.5 4.1Z" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              </a>
            </li>
          </div>
          <!-- /Brand Navbar -->
          <div class="sidebar-list">
            <li v-for="image in images" :key="image.id">
              <router-link :to="image.link">
                <span class="icon"  @mouseover="image.hover = true" @mouseleave="image.hover = false" >
                  <img
                    :src="image.hover == true ? image.src_static : image.src" 
                    :alt="image.alt">
                </span>
                <span class="title">{{ image.title }}</span>
              </router-link>
            </li>
            <li>
              <a href="#" @click.prevent="logout">
                <span class="icon">
                  <img src="/libraries/images/icons/dashboard/logout.svg" alt="logout">
                </span>
                <span class="title">Keluar</span>
              </a>
            </li>
          </div>
        </ul>
      </div>
      <!-- /Sidebar -->
      <div class="main">
        <!-- Navbar -->
        <div class="topbar">
          <!-- Title -->
          <div class="title d-none d-sm-none d-md-none d-lg-block d-xl-block ml-3">
            <h5 class="font-weight-bolc">Dashboard</h5>
          </div>
          <!-- /Title -->
          <!-- search -->
          <div class="search ml-3">
            <label>
              <img src="/libraries/images/icons/search-normal.svg" alt="" class="search-icon">
              <input class="form-control" type="text" id="search" placeholder="Search Here">
            </label>
          </div>
          <!-- /search -->
          <!-- Date -->
          <div class="date ml-3">

          </div>
          <!-- /Date -->
          <!-- user img -->
          <div class="user ml-3">
            <span v-if="url+user.photo">
              <b-avatar variant="dark" :src="url+user.photo"></b-avatar>
            </span>
            <span v-else-if="!user.photo">
              <b-avatar></b-avatar>
            </span>
          </div>
          <!-- /user img -->
          <div>
            <b-dropdown :text="user.first_name+ ' ' +user.last_name" block variant="primary" class="m-2 ml-4">
              <b-dropdown-item :to="{name: 'Profile'}"><span><img src="/libraries/images/icons/profile-circle.svg" alt="Profile"></span> Profil</b-dropdown-item>
              <b-dropdown-item href="#"><span><img src="/libraries/images/icons/log.svg" alt="Profile"></span> Log Aktivitas</b-dropdown-item>
              <b-dropdown-item href="#"><span><img src="/libraries/images/icons/archive.svg" alt="Profile"></span> Pengaturan</b-dropdown-item>
              <b-dropdown-item href="#"><span><img src="/libraries/images/icons/setting.svg" alt="Profile"></span> Arsip</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item href="javascript:void(0)" @click="logout"><span><img src="/libraries/images/icons/power.svg" alt="Profile"></span> Logout</b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
        <!-- /Navbar -->
        <!-- Main Content -->
        <!-- /Main Content -->
      </div>
    </div>
  </section>
  <!-- sidebar -->
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      // URL
      url: 'http://localhost:8002',
      // State User
      user: {},
      // State Errors
      errors: {},
      // State Image
      index: 0,
      // image: null,
      images: [{
        id: 1,
        src: '/libraries/images/icons/dashboard/dashboard.svg',
        src_static:'/libraries/images/icons/dashboard/dashboard-active.svg',
        alt: 'dashboard',
        link: {name: 'App'},
        title: 'Dashboard',
        hover: null,
      },
      {
        id: 2,
        src: '/libraries/images/icons/dashboard/box-tick.svg',
        src_static:'/libraries/images/icons/dashboard/box-tick-active.svg',
        alt: 'request-item',
        link: '/',
        title: 'Permintaan Pengiriman Barang',
        hover: null,
      },{
        id: 3,
        src: '/libraries/images/icons/dashboard/box.svg',
        src_static:'/libraries/images/icons/dashboard/box-active.svg',
        alt: 'stock-item',
        link: '/',
        title: 'Stock Barang',
        hover: null,
      },{
        id: 4,
        src: '/libraries/images/icons/dashboard/send-item.svg',
        src_static:'/libraries/images/icons/dashboard/send-item-active.svg',
        alt: 'send-item',
        link: '/',
        title: 'Pengiriman Barang',
        hover: null,
      },{
        id: 5,
        src: '/libraries/images/icons/dashboard/note.svg',
        src_static:'/libraries/images/icons/dashboard/note-active.svg',
        alt: 'report',
        link: '/',
        title: 'Laporan',
        hover: null,
      },{
        id: 6,
        src: '/libraries/images/icons/dashboard/office-account.svg',
        src_static:'/libraries/images/icons/dashboard/office-account-active.svg',
        alt: 'office-account',
        link: '/',
        title: 'Akun Kantor',
        hover: null,
      },{
        id: 7,
        src: '/libraries/images/icons/dashboard/note-activity.svg',
        src_static:'/libraries/images/icons/dashboard/note-activity-active.svg',
        alt: 'note-activity',
        link: '/',
        title: 'Catatan Aktivasi Pegawai',
        hover: null,
      }
      ]
    }
  },
  mounted(){
    this.getAdmin();
  },
  methods: {
    getAdmin(){
      axios.get('/api/v1/auth/me', {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        // User Login
        this.user = response.data.authme
      }).catch((error) => {
        if (error.response.status) {
          this.$router.push({
            name: 'Login'
          })
        }
      })
    },
    logout(){
      // Remove Token
      localStorage.removeItem('authenticated', false);
      localStorage.removeItem('token');
      this.$router.push({
        name: 'Login'
      });
    },
  }
}
</script>

<style scoped>
  .dropdown {
    padding: 8px 32px;
    border-radius : 30px;
    box-shadow: -6px -6px 20px rgba(255, 255, 255, 0.8), 6px 6px 20px rgba(0, 0, 0, 0.2);
  }
</style>

