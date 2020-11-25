<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :cbanners="banners"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from "./childComps/HomeSwiper";


import {getHomeMultidata} from 'network/home'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
  },
  data() {
    return {
      banners:[],
      recommends:[]
    }
  },
  created() {
    // 1请求多个数据
    getHomeMultidata().then(res => {
      //console.log(res);
      this.banners = res.data.banner.list //this是组件
      this.recommends =res.data.recommend.list
    })
  }
}
</script>

<style>
  .home-nav{
    background-color: var(--color-tint);
  }
</style>
