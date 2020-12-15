<template>
  <div id="home">
    <div style="height:44px"><nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar></div>
    <tab-control :ctitle="['流行', '新款', '精选']" 
        @tabclick="tabClick"  ref="TabControl"  v-show="isTabFixed"/>
    <my-scroll
      ref="MyScroll"
      :page="page"
      :on-refresh="onRefresh"
      :on-pull="onPull"
      :get-scroll-top="getTop"
      :scrollState="isScrollState"
      @reLoadData="reLoadData"
      @LoadMoreData="LoadMoreData"
    >
      <ul slot="scrollList">
        <home-swiper :cbanners="banners" @swiperImageLoad='swiperImageLoad'/>
        <recommond-view :crecommends="recommends" />
        <feature-view />
        <tab-control :ctitle="['流行', '新款', '精选']" 
        @tabclick="tabClick"  ref="TabControl" />
        <goods-list :cgoods="goods[currentType].list" />
      </ul>
    </my-scroll>
    <!-- <img src="~assets/img/loading/Load2.gif" :class="{active:isActive}" alt=""> -->
    <!-- 组件想要监听原生事件，需要添加.native 
         不仅仅是click可以使用
    -->
    <back-top v-show="btnFlag" @click.native="backClick()" />
  </div>
</template>

<script>
//导入子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommondView from "./childComps/RecommondView";
import FeatureView from "./childComps/FeatureView";

//导入公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backtop/BackTop.vue";
import MyScroll from "@/components/common/myscroll/MyScroll.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommondView,
    FeatureView,
    TabControl,
    GoodsList,
    BackTop,
    MyScroll,
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
      currentType: "pop",
      btnFlag: false, //回到顶部的图片
      isScrollState: false, //下拉刷新是否可以使用
      pullUpLoad: {
        //下拉加载更多
        type: Boolean,
        default: false,
      },
      tabOffSetTop: 0, //tabcontrol设置附顶效果
      isTabFixed : false,
      //下拉刷新
      page: {
        counter: 1,
        pageStart: 1,
        pageEnd: 1,
        total: 5,
      },
      saveY: 0 //离开时保留当前位置
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
  mounted() {
    window.addEventListener("scroll", this.scrollToTop, false);
  },
  destoryed() {
    window.removeEventListener("scroll", this.scrollToTop, false);
  },
  activated() {
    document.documentElement.scrollTop = document.body.scrollTop = this.saveY
  },
  deactivated() {
    this.saveY = this.scrollTop
  },
  methods: {
    //事件监听相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      const that = this;
      //console.log(this) VueComponent
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        //scrollTop 元素顶部与可见内容底部的度量
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    //为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 1000) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
      if (that.scrollTop < 450) {
        that.isScrollState = true;
      } else {
        that.isScrollState = false;
      }

      //判断tabcontrol是否position：fixed
      // console.log(this.tabOffSetTop);
       if (that.scrollTop > 575) {
        that.isTabFixed = true;
      } else {
        that.isTabFixed = false;
      }
      
    },
    //下拉刷新相关方法
    onRefresh(mun) {
      //刷新回调
      setTimeout(() => {
        this.$refs.MyScroll.setState(3);
      }, 500);
    },
    onPull(mun) {
      //加载回调
      setTimeout(() => {
        this.page.counter++;
        this.$refs.MyScroll.setState(5);
      }, 500);
    },
    getTop(y) {
      //滚动条位置
      this.indexScrollTop = y;
    },
    reLoadData() {
      //刷新后重新加载数据
      let currentType = this.currentType;
      this.goods[currentType].page = 1
      const page = 1;
      getHomeGoods(currentType, page).then((res) => {
        this.goods[currentType].list = [];
        this.goods[currentType].list.push(...res.data.list);
        this.goods[currentType].page += 1;
      });
    },
    swiperImageLoad() {
      //赋值 获取tabcontrol的offsetTop
      //所有的组件都有一个属性$el：用于获取组件中元素,控件是没有offsetTop的
      this.tabOffSetTop = this.$refs.TabControl.$el.offsetTop
    },
    LoadMoreData() {
      let currentType = this.currentType;
      const page = this.goods[currentType].page + 1;
      getHomeGoods(currentType, page).then((res) => {
        this.goods[currentType].list.push(...res.data.list);
        this.goods[currentType].page += 1;
      });
      // this.IsActive = false
    },
    //网络请求相关方法
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        console.log(res.data);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
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
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 40px;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 40px;
  z-index: 10;
  background-color: pink;
}
/* .fixed {
  position: fixed;
  top: 50px;
 
} */
</style>
