<template>
  
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" v-for="(item, index) in goods" :key="index" 
        :class="{'current':currentIndex===index}" @click="selectMenu(index)">
          <span class="text border-1px">
            <icon v-show="item.type > 0" :size="3" :type="goods[index].type"></icon>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="food-list food-list-hook" v-for="(item, index) in goods" :key="index">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item border-1px" v-for="(food, index) in item.foods" 
            :key="index" @click="selectFood(food)">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>                
                <div class="cartcontrol-wrapper">
                  <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" 
    :min-price="seller.minPrice"></shopcart>
    <food @add="addFood" :food="selectedFood" ref="food"></food>
  </div>
  
</template>

<script type="text/ecmascript-6">

  import BScroll from 'better-scroll'
  import icon from '@/components/icon/icon.vue'
  import shopcart from '@/components/shopcart/shopcart.vue'
  import cartcontrol from '@/components/cartcontrol/cartcontrol.vue'
  import food from '@/components/food/food.vue'

  const ERR_OK = 0  

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      icon,
      shopcart,
      cartcontrol,
      food
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: [],
        selectedFood: {}
      }
    },
    created() {
      this.$http.get('/apis/goods')
      .then((response) => {
        response = response.body
        // console.log(response)
        if(response.errno === ERR_OK){
          this.goods = response.data
        // console.log(this.goods)

          this.$nextTick(() => {  //dom更新渲染 
            this._intiScroll()
            this._calculateHeight()
          })       
        }
      })
      .catch(e => {
        console.log(e)
      })
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i+1] 
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {//height2不存在时，即遍历到最后一个，直接返回i
            return i
          }
        }
        return 0  //什么都没有的话返回0，(如果listHeight.length没有。。)
      },
      selectFoods() {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    methods: {
      selectMenu(index) {
        // console.log(index)
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index] 
        this.foodsScroll.scrollToElement(el, 300)
      },
      selectFood(food) {
        this.selectedFood = food
        this.$refs.food.show()
      },
      addFood(target) {
        this._drop(target)
      },
      _drop(target) {
        // 体验优化，异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })   
      },
      _intiScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3  //检测实时滚动
        })
        this.foodsScroll.on('scroll', (pos) => {  //监听滚动事件
          this.scrollY = Math.abs(Math.round(pos.y))  //获取实时滚动位置  //abs相反数 round四舍五入
          // console.log(this.scrollY)
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0;i < foodList.length; i++) {
          let item = foodList[i] //获取每个类别区块的高度
          height += item.clientHeight
          this.listHeight.push(height)
          // console.log(height)
        }
      }
    }
  }
</script>

<style lang="stylus">

  @import "../../common/stylus/mixin.styl"

  .goods
    position absolute
    display flex
    top 174px
    bottom 46px
    width 100%
    overflow hidden 
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        width 56px
        height 54px
        // margin 0 auto
        padding 0 12px
        line-height 14px
        &.current
          position relative
          z-index 10
          margin-top -1px
          background #fff
          .text
            border-none()
            font-weight 700
        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size 12px
    .foods-wrapper
      flex 1     
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1 
        font-size 12px
        color rgb(147,153,159)
        background #f3f5f7
      .food-item
        display flex
        margin  18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1  
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px 
            color rgb(7,17,27)
          .desc, .extra
            line-height 10px
            font-size 10px
            color rgb(147,153,159)  
          .desc
            line-height 12px
            margin-bottom 8px  
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px    
            .now
              margin-right 8px
              font-size 14px
              color rgb(240,20,20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147,153,159)  
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 12px

</style>