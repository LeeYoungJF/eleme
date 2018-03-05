<template>

  <span class="icon" :class="sizeType"></span>

</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      size: {
        type: Number
      },
      type: {
        type: Number
      }
    },
    computed: {
      sizeType() {
        let classMap = this.classMap
        let type = this.type
        let size = this.size
        return ['icon_' + size, classMap[type] + '_' + size]
      }
    },
    created() {
      this.classMap = ['decrease','discount','special','invoice','guarantee']
    },
  }
</script>

<style lang="stylus" scoped>

  @import "../../common/stylus/mixin.styl"

  .icon
    display inline-block
    vertical-align top
    background-size 100% 100%
    background-repeat no-repeat
    &.icon_1
      width 12px
      height 12px
      margin-right 4px
      &.decrease_1
        bg-image('decrease_1')
      &.discount_1
        bg-image('discount_1')
      &.special_1
        bg-image('special_1')
      &.invoice_1
        bg-image('invoice_1')
      &.guarantee_1
        bg-image('guarantee_1')
    &.icon_2
      width 16px
      height 16px
      margin-right 6px
      &.decrease_2
        bg-image('decrease_2')
      &.discount_2
        bg-image('discount_2')
      &.special_2
        bg-image('special_2')
      &.invoice_2
        bg-image('invoice_2')
      &.guarantee_2
        bg-image('guarantee_2')    
    &.icon_3
      width 12px
      height 12px
      margin-right 2px
      &.decrease_3
        bg-image('decrease_3')
      &.discount_3
        bg-image('discount_3')
      &.special_3
        bg-image('special_3')
      &.invoice_3
        bg-image('invoice_3')
      &.guarantee_3
        bg-image('guarantee_3') 
    &.icon_4
      width 16px
      height 16px
      margin-right 6px
      &.decrease_4
        bg-image('decrease_4')
      &.discount_4
        bg-image('discount_4')
      &.special_4
        bg-image('special_4')
      &.invoice_4
        bg-image('invoice_4')
      &.guarantee_4
        bg-image('guarantee_4') 

 
</style>
