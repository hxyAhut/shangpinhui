<template>
    <div>
        <!-- 我是首页 -->
        <Typenav/>
        <List-container/>
        <Today-recommend/>
        <Rank/>
        <Like/>
        <Floor v-for="floor in mockFloorsList" :key="floor.id" :list="floor"/>
        <Brand/>
    </div>
    
</template>

<script>
import ListContainer from '@/views/Home/ListContainer'
import TodayRecommend from '@/views/Home/TodayRecommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/Like'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'
import {mapState} from 'vuex'

export default {
    name: 'Homepage',
    components: {
        ListContainer,
        TodayRecommend,
        Rank,
        Like,
        Floor,
        Brand
    },
    mounted() {
        // 获取mook数据
        this.$store.dispatch('mockFloorsList');
        // 获取用户信息
        this.$store.dispatch('userInfo')
    },
    computed: {
        ...mapState({
            mockFloorsList: state => state.home.mockFloorsList
        })
    }
}
</script>

<style scoped lang="less">

</style>