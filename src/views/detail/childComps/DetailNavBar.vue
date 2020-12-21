<template>
  <div>
    <nav-bar class="fix">
      <div slot='left' class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" :key="index" 
             class="title-item" :class="{active: index === currentIndex}"
             @click="titleClick(index)">
             {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../../components/common/navbar/NavBar.vue'
export default {
  name : 'DetailNavBar',
  components: { 
    NavBar 
  },
  data() {
    return {
      titles: ['商品','参数','评论','评价'],
      currentIndex: 0
    }
  },
  methods :{
    titleClick(index) {
      this.currentIndex = index
    },
    backClick() {
      this.$router.back() //或者this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: red;
  }
  .back img {
    margin: 10px;
  }
  .fix {
    display: flex;
    line-height: 44px;
    height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100, 0.1);
    background-color: #fff;
    position: fixed;
    height: 44px;
    z-index: 9;
    width: 100%;
  }
</style>