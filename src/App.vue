<template>
  <div id="app">
    <!-- <router-view></router-view>  和下面效果一样-->
    <!-- keepalive是为了让路由跳转后不销毁，可使用active和deactive函数 -->
    <keep-alive exclude="Detail"> 
      <router-view/>
    </keep-alive>
    <main-tar-bar v-show="$route.meta.navShow"/>
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
