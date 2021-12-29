<template>
  <div class="spec-preview" ref="spec" @mousemove="move">
    <img :src="skuInfo.skuImageList[currentIndex].imgUrl"/>
    <div class="event"></div>
    <div class="big">
      <img :src="skuObj.imgUrl" ref="img" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props: ['skuInfo'],
    data() {
      return {
        currentIndex: 0
      }
    },
    computed: {
      skuObj() {
        return this.skuInfo.skuImageList[this.currentIndex] || []
      }
    },
    methods: {
      move(e) {
        // console.log(e)
        // 获取遮罩层元素
        let mask = this.$refs.mask;
        let spec = this.$refs.spec;
        let img = this.$refs.img;
        // console.log(mask);
        // console.log(mask.offsetWidth);
        let left = e.offsetX - mask.offsetWidth / 2;
        let top = e.offsetY - mask.offsetHeight / 2;
        // console.log(left)
        
        // 判断边界
        if (left < 0) {
          left = 0;
        }
        if (left > mask.offsetWidth / 2) {
          left = spec.offsetWidth / 2;
        }
        if (top < 0 ) {
          top = 0;
        }
        if (top >mask.offsetHeight / 2) {
          top = spec.offsetHeight / 2;
        }
        mask.style.left = left + 'px';
        mask.style.top = top + 'px';
        img.style.top = - top * 2 + 'px';
        img.style.left = - left * 2 + 'px';
      }
    },
    mounted() {
      // 全局事件总线，获取兄弟传过来的index
      this.$bus.$on('getImg', (index) => {
        // skuInfo.skuImageList
        this.currentIndex = index;
      })
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>