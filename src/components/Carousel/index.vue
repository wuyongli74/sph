<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入Swiper
import Swiper from 'swiper'

export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    list: {
      /**
       * 立即监听：不管你数据有没有变化，我上来立即监听一次
       * 为什么watch监听不到list？
       * 因为这个数据从来没有发生变化（数据是父亲给的，父亲给的时候就是一个对象，对象里面该有的数据都是有的）
       */
      immediate: true,
      handler() {
        /**
         * 现在通过watch监听bannerList属性的属性值的变化
         * 如果执行handler方法，代表组件实例身上这个属性已经有了【数组：四个元素】
         * 当前这个函数执行：只能保证bannerList数据已经有了，但是你没有办法保证v-for已经执行结束了
         * v-for执行完毕，才有结构【你现在在watch当中没有办法保证的】
         *
         * nextTick:在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
         */
        // 只能监听到数据已经有了，但是v-for动态渲染结构我们还是没有办法确定的，因此还是需要用nextTick
        // 当你执行这个回调的时候：保证服务器数据回来了，v-for执行完毕了【一定轮播图的结构一定有了】
        var mySwiper = new Swiper(this.$refs.mySwiper, {
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        })
      },
    },
  },
}
</script>

<style scoped></style>
