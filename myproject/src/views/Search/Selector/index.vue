<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <!-- 品牌面包屑 -->
        <ul class="logo-list">
          <li @click="getTradeMark(trademark)" v-text="trademark.tmName" v-for="(trademark, index) in trademarkList" :key="trademark.tmId" ></li>
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div>
    </div>
    <div class="type-wrap" v-for="(attr, index) in attrsList" :key="attr.attrId">
      <div class="fl key" v-text="attr.attrName"></div>
      <div class="fl value">
        <ul class="type-list">
          <li v-for="(atVal, index) in attr.attrValueList" :key="index" @click="getProps(attr, atVal)">
            <a v-text="atVal"></a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Selector",
  computed: {
    ...mapGetters(["attrsList", "trademarkList"]),
  },
  methods: {
    // 品牌的事件处理函数
    getTradeMark(trademark) {
      // trademarkList.tmName = trademark;
      console.log(this,trademark)
      this.$emit('trademarkHandler', trademark);
    },
    // 获取商品属性的数组
    getProps(attr, atVal) {
      // console.log(attr, atVal)
      this.$emit('getPropsInfo', attr,atVal);
    }
  }
};
</script>

<style scoped lang="less">
@import "../css/selector.less";
</style>