<template>
  <div class="outer">
    <!-- 窗口侧边栏 -->
    <div class="toolbar toolbar-wrap">
      <div class="content"></div>
      <div class="but list"></div>
      <div class="toolist">
        <div class="pull">
          <i class="tab-ico vip"></i>
          <em class="tab-text">商品会员</em>
        </div>
        <div class="pull">
          <i class="tab-ico cart"></i>
          <em class="tab-text">购物车</em>
        </div>
        <div class="pull">
          <i class="tab-ico follow"></i>
          <em class="tab-text">我的关注</em>
        </div>
        <div class="pull">
          <i class="tab-ico history"></i>
          <em class="tab-text">我的足迹</em>
        </div>
        <div class="pull">
          <i class="tab-ico message"></i>
          <em class="tab-text">我的消息</em>
        </div>
        <div class="pull">
          <i class="tab-ico jimi"></i>
          <em class="tab-text">咨询</em>
        </div>
      </div>
      <div class="back pull">
        <i class="tab-ico top"></i>
        <em class="tab-text">顶部</em>
      </div>
    </div>
    <Typenav />
    <!--list-content-->
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="params.categoryname">{{params.categoryname}}<i @click="removeCategoryName">×</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="params.keyword">{{params.keyword}}<i @click="removeKeyword">×</i></li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="params.trademark">{{params.trademark.split(':')[1]}}<i @click="removeTrademark">×</i></li>
            <!-- 商品属性的面包屑 -->
            <li class="with-x" v-for="(prop, index) in params.props" :key="index">{{prop.split(':')[1]}}<i @click="removeProp(index)">×</i></li>
          </ul>
        </div>
        <!--selector-->
        <Selector @trademarkHandler="trademrakInfo" @getPropsInfo="getPropsInfo"/>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active: isOne}" @click="changeOrder('1')">
                  <a>综合 <span v-show="isOne" class="iconfont" :class="{'icon-down': isDesc, 'icon-arrowup': isAsc}"></span> </a>
                </li>
                <li :class="{active: isTwo}" @click="changeOrder('2')">
                  <a>价格 <span v-show="isTwo" class="iconfont" :class="{'icon-down': isDesc, 'icon-arrowup': isAsc}"></span> </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      v-text="good.title"
                    ></a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <!-- <div class="fr page"> -->
            
            <Pagination :pageNo='params.pageNo' :total='total' :continues=5 :pageSize='params.pageSize' @getPageNo='getPageNo' />
          <!-- </div> -->
        </div>
        <!--hotsale-->
        <div class="clearfix hot-sale">
          <h4 class="title">热卖商品</h4>
          <div class="hot-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_01.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_03.png" />
                  </div>
                  <div class="attr">
                    <em>金属A面，360°翻转，APP下单省300！</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_04.png" />
                  </div>
                  <div class="attr">
                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4068.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有20人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Selector from "@/views/Search/Selector";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Searchpage",
  components: {
    Selector,
  },
  data() {
    return {
      params: {
        category1id: '',
        category2id: '',
        category3id: '',
        categoryname: '',
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  beforeMount() {
    // 发请求之前，要修改参数
    Object.assign(this.params, this.$route.query, this.$route.params);
  },
  mounted() {
    this.$store.dispatch("getSearchList", this.params);
  },
  computed: {
    ...mapGetters(["goodsList", "attrsList", "trademarkList"]),
    ...mapState({
      total: state=>state.search.searchList.total
    }),
    isOne() {
      // console.log(111)
      return this.params.order.split(':')[0] == 1;
    },
    isTwo() {
      // console.log(222)
      return this.params.order.split(':')[0] == 2;
    },
    isDesc() {
      return this.params.order.indexOf('desc') != -1;
    },
    isAsc() {
      return this.params.order.indexOf('asc') != -1;
    }
  },
  watch: {
    // 监听路由变化，只要路由发生变化，就发起请求
    $route(newVal, oldVal) {
      // console.log(newVal, oldVal)
      // 再次发请求之前整理带给服务器参数
      Object.assign(this.params, this.$route.query, this.$route.params);
      this.$store.dispatch('getSearchList', this.params);     
      // 每一次请求前，将前一次的三级分类的id置空
      this.params.catagory1id = undefined;
      this.params.category2id = undefined;
      this.params.category3id = undefined;
      
    }
  },
  methods: {
    // 删除分类名字
    removeCategoryName() {
      this.params.categoryname = undefined;
      this.params.catagory1id = undefined;
      this.params.category2id = undefined;
      this.params.category3id = undefined;
      this.$router.push({name: '/search'})
      this.$store.dispatch('getSearchList', this.params);

    },
    // 移除关键字
    removeKeyword() {
      // this.params.keyword = undefined;
      this.params.keyword = undefined;
      this.params.catagory1id = undefined;
      this.params.category2id = undefined;
      this.params.category3id = undefined;
      this.$router.push({name: '/search',params: this.params})
      // 通知兄弟组件Header清除关键字
      this.$bus.$emit('clear');
    },
    // 移除品牌关键字
    removeTrademark() {
      this.params.trademark = undefined;
      this.$store.dispatch('getSearchList', this.params);
    },
    // 品牌信息
    trademrakInfo(trademark) {
      // 整理品牌字段的参数  接口就是这样的："ID:品牌名称"
      this.params.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // this.$router.push({name: '/search', params: this.params})
      this.$store.dispatch('getSearchList', this.params);
    },
    // 商品属性信息
    getPropsInfo(attr, attVal) {
      // console.log(111)
      let str = `${attr.attrId}:${attVal}:${attr.attrName}`;
      // console.log(str)
      // 数组去重
      if (this.params.props.indexOf(str) === -1) {
        this.params.props.push(str);
      }
      
      this.$store.dispatch('getSearchList', this.params);
    },
    // 移除商品属性
    removeProp(index) {
      // console.log(index)
      // 删除对应的prop数据
      this.params.props.splice(index,1);
      this.$store.dispatch('getSearchList', this.params);
    },
    // 改变数据属性
    changeOrder(flag) {
      // flag:代表用户点击的是综合还是价格(用户点击时传递过来的)
      // console.log(flag)
      // 取原始的数据属性
      let originOrder = this.params.order.split(':')[0];
      let originSort = this.params.order.split(':')[1];
      let newOrder = '';
      // 如果用户点击的flag与原始order相同，那么一定点击的是综合，此时需要更改排序方式
      if (flag == originOrder) {
        newOrder = `${originOrder}:${originSort == "desc" ? "asc" : "desc"}`
      }else {
        // 否则点击的是价格
        newOrder = `${flag}:"desc"`;
      }
      this.params.order = newOrder;
      this.$store.dispatch('getSearchList', this.params);
    },
    // 获取当前页
    getPageNo(pageNo) {
      this.params.pageNo = pageNo;
      // console.log(pageNo);
      // 发送请求
      this.$store.dispatch('getSearchList', this.params);
    }
  }
};
</script>

<style scoped lang="less">
@import "./css/search.less";
</style>