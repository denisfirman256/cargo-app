<template>
  <div id="app" v-if="this.$route.meta.layout==='Login'">
    <notifications />
    <router-view></router-view>
  </div>
</template>