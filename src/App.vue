<template>
  <div id="app">

    <v-header :seller="seller"></v-header>

    <!-- flex布局 -->
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <keep-alive>
        <router-view :seller="seller" keep-alive></router-view>
      </keep-alive>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">

  import {urlParse} from '@/common/js/util.js'
  import header from '@/components/header/header.vue'

  const ERR_OK = 0

  export default {
    name: 'app',
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse()
            return queryParam.id
          })()
        }
      }
    },
    components: {
      'v-header': header
    },
    created () {
      this.$http.get('/apis/seller/?id=' + this.seller.id)
      .then((response) => {
        response = response.body 
        if(response.errno === ERR_OK){
          // this.seller = response.data
          // consolo.log(this.seller.id)
          this.seller = Object.assign({},this.seller,response.data) //扩展新属性
        }
      })
      .catch(e => {
        console.log(e)
      })
    }
  }
</script>

<style lang="stylus">

  @import './common/stylus/mixin.styl'

  #app
    .tab
      display flex
      width 100%
      height 40px
      line-height 40px
      // border-bottom 1px solid rgba(7,17,27,0.1)
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex 1  
        text-align center
        &>a
          display block
          font-size 14px
          color rgb(77,85,93)
          &.active
            color rgb(240,20,20)  
                 
</style>