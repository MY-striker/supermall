<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :cbanners="banners" />
    <recommond-view :crecommends="recommends" />
    <feature-view />
    <tab-control :ctitle="['流行', '新款', '精选']" @tabclick="tabClick"/>
    <goods-list :cgoods="goods[currentType].list" />

    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </div>
</template>

<script>
//导入子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommondView from "./childComps/RecommondView";
import FeatureView from "./childComps/FeatureView";

//导入公关组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from  "components/content/goods/GoodsList"

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommondView,
    FeatureView,
    TabControl,
    GoodsList
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType:'pop'
    };
  },
  created() {
    // 1请求多个数据
    getHomeMultidata().then((res) => {
      //console.log(res);
      this.banners = res.data.banner.list; //this是组件
      this.recommends = res.data.recommend.list;
    }),

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    //事件监听相关方法
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    //网络请求相关方法
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then((res) => {
        console.log(res.data);
          this.goods[type].list.push(...res.data.list) 
          this.goods[type].page += 1
      });
    },
  },
};
</script>

<style>
#home {
  padding-bottom: 0px;
}
.home-nav {
  background-color: var(--color-tint);
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>
