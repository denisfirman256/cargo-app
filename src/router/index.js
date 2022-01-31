import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// guest
import Login from '../views/Login.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import NotFound from '../views/NotFound.vue';
// Guest

// Admin
import App from '../admin/pages/Dashboard.vue';
import Profile from '../admin/pages/Profile.vue';

// Office CRUD
import Address_Office from '../admin/pages/address_office/index.vue';
import Add_Office from '../admin/pages/address_office/create.vue';
import Edit_Office from '../admin/pages/address_office/update.vue';

// Category Stuff
import Category_Stuff from '../admin/pages/category_stuff/index.vue'
import Add_Category from '../admin/pages/category_stuff/create.vue'
import Edit_Category from '../admin/pages/category_stuff/update.vue'

// Transportation
import Transportation from '../admin/pages/transportation/index.vue'
import Add_Transportation from '../admin/pages/transportation/create.vue'
import Edit_Transportation from '../admin/pages/transportation/update.vue'

// Courier
import Courier from '../admin/pages/courier/index.vue'
import Add_Courier from '../admin/pages/courier/create.vue'
import Edit_Courier from '../admin/pages/courier/update.vue'

// Users
import Users from '../admin/pages/users/index.vue'
import Add_Users from '../admin/pages/users/create.vue'
import Edit_Users from '../admin/pages/users/update.vue'



const routes = [{
    name: 'Login',
    path: '/login',
    component: Login,
    meta: {
      layout: "Login"
    }
  },
  {
    name: 'ForgotPassword',
    path: '/login/forgot_password',
    component: ForgotPassword,
  },
  {
    name: 'App',
    path: '/admin/dashboard',
    component: App,
    meta: {
      layout: "App"
    }
  },
  {
    name: 'Profile',
    path: '/admin/profile',
    component: Profile,
    meta: {
      layout: "App"
    },
    props: true
  },


  // Address Office
  {
    name: 'Address_Office',
    path: '/admin/address_office',
    component: Address_Office,
    meta: {
      layout: "App"
    },
    props: true
  },
  {
    name: 'Add_Office',
    path: '/admin/address_office/create',
    component: Add_Office,
    meta: {
      layout: "App"
    },
  },
  {
    name: 'Edit_Office',
    path: '/admin/address_office/edit/:id',
    component: Edit_Office,
    meta: {
      layout: "App"
    },
    props: true
  },

  // Category Stuff
  {
    name: 'Category_Stuff',
    path: '/admin/category_stuff',
    component: Category_Stuff,
    meta: {
      layout: "App"
    }
  },
  {
    name: 'Add_Category',
    path: '/admin/category_stuff/create',
    component: Add_Category,
    meta: {
      layout: "App"
    },
  },
  {
    name: 'Edit_Category',
    path: '/admin/category_stuff/edit/:id',
    component: Edit_Category,
    meta: {
      layout: "App"
    },
    props: true
  },

  // Transportation
  {
    name: 'Transportation',
    path: '/admin/transportation',
    component: Transportation,
    meta: {
      layout: "App"
    }
  },
  {
    name: 'Add_Transportation',
    path: '/admin/transportation/create',
    component: Add_Transportation,
    meta: {
      layout: "App"
    },
  },
  {
    name: 'Edit_Transportation',
    path: '/admin/transportation/edit/:id',
    component: Edit_Transportation,
    meta: {
      layout: "App"
    },
    props: true
  },

  // Courier
  {
    name: 'Courier',
    path: '/admin/courier',
    component: Courier,
    meta: {
      layout: "App"
    }
  },
  {
    name: 'Add_Courier',
    path: '/admin/courier/create',
    component: Add_Courier,
    meta: {
      layout: "App"
    },
  },
  {
    name: 'Edit_Courier',
    path: '/admin/courier/edit/:id',
    component: Edit_Courier,
    meta: {
      layout: "App"
    },
    props: true
  },

  // Users
  {
    name: 'Users',
    path: '/admin/users',
    component: Users,
    meta: {
      layout: "App"
    }
  },
  {
    name: 'Add_Users',
    path: '/admin/users/create',
    component: Add_Users,
    meta: {
      layout: "App"
    },
  },
  {
    name: 'Edit_Users',
    path: '/admin/users/edit/:id',
    component: Edit_Users,
    meta: {
      layout: "App"
    },
    props: true
  },

  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = JSON.parse(localStorage.getItem('authenticated'));

  if (to.name !== "Login" && !isAuthenticated) next({
    name: "Login"
  });
  if (to.name === "Login" && isAuthenticated) next({
    name: "App"
  });
  else next();
});

export default router