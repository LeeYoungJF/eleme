<template>
  
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" 
      v-show="food.count>0" @click.stop.prevent="decreaseCart"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>

</template>

<script type="text/ecmascript-6">

  import Vue from 'vue'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart() {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
          // console.log(this.food.count)
        }
        // console.log(event.target)
        this.$emit('add', event.target)
      },
      decreaseCart() {
        if(this.food.count){
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus">

  .cartcontrol
    font-size 0
    .cart-decrease, .cart-add
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)       
    .cart-count
      display: inline-block;
      vertical-align: top;
      width: 12px;
      line-height: 36px; 
      text-align center
      font-size: 10px;
      color rgb(147, 153, 159)
     .cart-decrease
        transform translateX(0) rotate(0deg)
        &.move-enter-active, &.move-leave-active
          transition all 0.4s linear 
        &.move-enter, &.move-leave-active
          opacity 0
          transform translateX(24px) rotate(180deg)
              
</style>
