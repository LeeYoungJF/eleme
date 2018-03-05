<template>

  <div class="star" :class="starType">
    <!-- <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span> -->
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index"><!--{{index}}--></span>
  </div>
  
</template>

<script type="text/ecmascript-6">

  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {//计算属性 会对计算的结果进行缓存
      starType(){
        return 'star-' + this.size // 'star-' + this.size -> starType
      },
      itemClasses() {
        let result = [] //数组 存放五个星星的类型
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = score % 1 !== 0 //判断是否有小数点（半星）
        let interge = Math.floor(score)
        for(let i = 0; i < interge; i++) {
          result.push(CLS_ON)
        }
        if(hasDecimal) {
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        return result //resualt -> itemClasses
      }
    }
  }
</script>

<style lang="stylus">

  @import "../../common/stylus/mixin.styl"

  .star
    .star-item
      display inline-block
      background-repeat no-repeat    
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')

</style>
