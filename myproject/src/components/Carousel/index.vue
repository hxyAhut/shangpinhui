<template>
  <div class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in List" :key="index">
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
import Swiper from 'swiper';
export default {
    name: 'Carousel',
    props: ['List'],
    watch: {
        // 1.对象写法
        List: {
            inmediate: true,
            // 该函数若执行了，则证明数据一定发生变化了。
            handler() {
                // 虽然数据发生变化了，但是v-for不一定结束，因此此时页面结构很可能还没有更新
                // nextTick可以保证下次DOM更新循环结束之后再执行其回调函数。换句话说，该方法可以保证v-for已经结束，数据完全请求完毕，并且页面结构已经发生变化
                this.$nextTick(() => {
                    var mySwiper = new Swiper('.swiper-container', {
                        // 自动播放:
                        autoplay: true,
                        // 循环播放
                        loop: true,
                        // 分页器
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev'
                        }
                    })
                })
            }
        }
    }
};
</script>

<style scoped lang="less">
</style>