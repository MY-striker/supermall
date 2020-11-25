<template>
  <div id="app">
    <!-- <router-view></router-view>  和下面效果一样-->
    <router-view/>
    <main-tar-bar/>
  </div>
</template>

<script>
import MainTarBar from 'components/content/maintarbar/MainTarBar.vue'

export default {
  name: 'App',
  components: {
    MainTarBar,
  }
}
</script>

<style>
  @import 'assets/css/base.css';
</style>
