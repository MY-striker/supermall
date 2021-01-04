<template>
  <div >
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images='topImages'></detail-swiper>
    <detail-base-info :goods ='goods'></detail-base-info>
    <detail-shop-info :shop='shopInfo'></detail-shop-info>
    <detail-image-info :detail-info='detailInfo'></detail-image-info>
    <detail-params-info :paramInfo='itemParams'></detail-params-info>
    <detail-comment-info :commentInfo='commentInfo'></detail-comment-info>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailImageInfo from './childComps/DetailImageInfo.vue'
import DetailParamsInfo from './childComps/DetailParamsInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'

import {getDetail, Goods} from 'network/detail'



export default {
  name :'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamsInfo,
    DetailCommentInfo,
  },
  data() {
    return {
      iid : null,
      topImages: [],
      goods: {},
      shopInfo: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {}
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //1获取数据
      const data = res.result
      //2.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages

      //3.创建商品的对象
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //4.取出店铺信息
      this.shopInfo = data.shopInfo

      //5.取出详情信息
      this.detailInfo = data.detailInfo

      //6.取出参数信息
      this.itemParams = data.itemParams

      //7.取出评论信息1
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
  })
    

  },
  methods: {

  }
}
</script>

<style scoped>

</style>