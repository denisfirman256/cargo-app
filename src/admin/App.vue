<template>
  <div id="admin" v-if="this.$route.meta.layout==='App'">
    <router-view>
    </router-view>
    <notifications/>
  </div>
</template>