<template>
<!-- 接口: http://39.98.123.211/api/product/getBaseCategoryList -->
  <div id="app">
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <!-- <router-link></router-link> -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer'


export default({
  mounted() {
    // 通知vuex发请求，获取数据，存储于仓库中
        this.$store.dispatch('categoryList');
  },
  components: {
    Header,
    Footer
  }
})
</script>


<style lang="less">

</style>
