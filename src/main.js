import Vue from 'vue'
import Login from './App.vue'
import Admin from './admin/App.vue'
// Notifications
import Notifications from 'vue-notification'
// Import Router
import router from './router'
// bootstrap import
import {
  BootstrapVue
} from 'bootstrap-vue';



// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// style main.js
import '../public/libraries/css/costum.css';

// Axios
import './axios.js';

// component
Vue.component("dashboard-component", require("./components/dashboardComponent.vue").default);

// component-table
Vue.component("office-table", require("./components/table/officeTable.vue").default);
Vue.component("category-table", require("./components/table/categoryTable.vue").default);
Vue.component("transportation-table", require("./components/table/transportationTable.vue").default);
Vue.component("courier-table", require("./components/table/courierTable.vue").default);
Vue.component("users-table", require("./components/table/allUsersTable.vue").default);

// Component Map
Vue.component("mapbox-gl", require("./components/map/mapbox-gl.vue").default);

Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(Admin)
}).$mount('#admin')

new Vue({
  router,
  render: h => h(Login)
}).$mount('#app')