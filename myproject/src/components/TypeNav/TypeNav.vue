<template>
  <!-- 商品分类导航 -->
        <div class="type-nav">
            <div class="container">
                <!-- 事件委派 | 事件代理 -->
                <div @mouseleave="leaveIndex">
                    <h2 class="all"  @mouseenter="enterShow">全部商品分类</h2>
                    <transition name="sort">
                        <div class="sort" v-show="show">
                            <div class="all-sort-list2">
                                <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId" :class="{cur: currentIndex == index}">
                                    <h3  @mouseenter="enterIndex(index)" @click="goSearch" :data-categoryName="c1.categoryName">
                                        <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                    </h3>
                                    <div class="item-list clearfix">
                                        <div class="subitem">
                                            <dl class="fore" @mouseenter="enterIndex(index2)" @click="goSearch" v-for="(c2, index2) in c1.categoryChild" :key="c2.categoryId">
                                                <dt>
                                                    <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                                </dt>
                                                <dd>
                                                    <em @mouseenter="enterIndex(index3)" @click="goSearch" v-for="(c3, index3) in c2.categoryChild" :key="c3.categoryId">
                                                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                    </em>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
            </div>
        </div>
</template>

<script>
import {mapState} from 'vuex';
import throttle from 'lodash/throttle'
// console.log(throttle)

export default {
    name: 'Typenav',
    data() {
        return {
            currentIndex: -1,
            show: true
        }
    },
    // 组件挂载完毕，可以项服务器发出请求
    mounted() {
        // console.log(222, this)
        // 通知vuex发请求，获取数据，存储于仓库中
        // this.$store.dispatch('categoryList');
        // 当组件挂载完毕，让show属性变为false
        // 如果不是home路由组件，将Typenav隐藏
        if (this.$route.path != '/home') {
            this.show = false;
        }
    },
    computed: {
        ...mapState({
            categoryList: state => state.home.categoryList
        })
    },
    methods: {
        // enterIndex(index) {
        //     // console.log(index)
        //     this.currentIndex = index;
        // },
        enterIndex: throttle(function(index) {
            this.currentIndex = index;
        }, 50),
        leaveIndex() {
            this.currentIndex = -1;
            if (this.$route.path != '/home') {
                this.show = false;
            }
        },
        // 事件委派 + 编程式导航
        goSearch(e) {
            // console.log(e.target);
            // dataset可以获取标签属性值
            let {categoryname, category1id, category2id, category3id} = e.target.dataset;
            // console.log(categoryname)
            // 如果categoryname存在，则一定是a标签(自定义属性一定要以data-开头)
            if (categoryname) {
                // console.log(111)
                // 一级标签
                let url = {name: '/search'};
                let query = {categoryname: categoryname};
                if (category1id) {
                    query.category1id = category1id;
                }else if(category2id) {
                    // 二级标签
                    query.category2id = category2id;
                }else {
                    // 三级标签
                    query.category3id = category3id;
                }
                url.query = query;
                if (this.$route.params) {
                    // console.log(111)
                    url.params = this.$route.params;
                }
                // this.$router.push({name: url,query: query});
                this.$router.push(url);
            }
        },
        // 当鼠标移入时，让商品
        enterShow() {
            this.show = true;
        }

    }
}
</script>

<style scoped lang="less">
@import "./css/Typenav.less";
</style>