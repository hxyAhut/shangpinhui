<template>
      <!--列表-->
        <div class="list-container">
            <div class="sortList clearfix">
                <div class="center">
                    <!--banner轮播-->
                    <Carousel :List="mockBannerList"/>
                </div>
                <div class="right">
                    <div class="news">
                        <h4>
                            <em class="fl">尚品汇快报</em>
                            <span class="fr tip">更多 ></span>
                        </h4>
                        <div class="clearix"></div>
                        <ul class="news-list unstyled">
                            <li>
                                <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                            </li>
                            <li>
                                <span class="bold">[公告]</span>备战开学季 全民半价购数码
                            </li>
                            <li>
                                <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                            </li>
                            <li>
                                <span class="bold">[公告]</span>备战开学季 全民半价购数码
                            </li>
                            <li>
                                <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                            </li>
                        </ul>
                    </div>
                    <ul class="lifeservices">
                        <li class=" life-item ">
                            <i class="list-item"></i>
                            <span class="service-intro">话费</span>
                        </li>
                        <li class=" life-item ">
                            <i class="list-item"></i>
                            <span class="service-intro">机票</span>
                        </li>
                        <li class=" life-item ">
                            <i class="list-item"></i>
                            <span class="service-intro">电影票</span>
                        </li>
                        <li class=" life-item ">
                            <i class="list-item"></i>
                            <span class="service-intro">游戏</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">彩票</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">加油站</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">酒店</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">火车票</span>
                        </li>
                        <li class=" life-item ">
                            <i class="list-item"></i>
                            <span class="service-intro">众筹</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">理财</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">礼品卡</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">白条</span>
                        </li>
                    </ul>
                    <div class="ads">
                        <img src="./images/ad1.png" />
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import {mapState} from 'vuex';


export default {
    name: 'ListContainer',
    components: {
        // Carousel
    },
    // 派发action:通知vuex发送ajax请求，将数据存储在仓库中
    mounted() {
        this.$store.dispatch('mockBannerList');
    },
    computed: {
        ...mapState({
            mockBannerList: state => state.home.mockBannerList
        })
    }
}
</script>

<style scoped lang="less">
@import "./css/ListContainer.less";
</style>