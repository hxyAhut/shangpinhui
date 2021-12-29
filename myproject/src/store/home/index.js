import {reqCategoryList, mockBannersList, mockFloorsList} from '@/api'


const state = {
    // state中的数据默认初始值别瞎写，服务器返回的数据是啥，就初始化什么类型的数据
    // home仓库中存储的三级菜单的数据
    categoryList: [],
    // 轮播图的数据
    mockBannerList: [],
    // floor数据
    mockFloorsList: []
};
const actions = {
    // 通过API里面的接口函数调用，向服务器发出请求，获取服务器的数据
    async categoryList(context) {
        // this指向Store对象
        // console.log(111,this)
        let result = await reqCategoryList();
        if (result.code == 200) {
            this.commit('CATEGORYLIST', result.data);
        }
    },
    async mockBannerList() {
        let result = await mockBannersList();
        // console.log(result);
        if (result.code == 200) {
            // console.log(this)
            this.commit('MOCKBANNERLIST', result.data);
        }
    },
    async mockFloorsList() {
        let result = await mockFloorsList();
        // console.log(result)
        if (result.code == 200) {
            this.commit('MOCKFLOORSLIST', result.data);
        }
    }
};
const mutations = {
    CATEGORYLIST(state, data) {
        // console.log(333, this)
        state.categoryList = data;
    },
    MOCKBANNERLIST(state, data) {
        state.mockBannerList = data;
    },
    MOCKFLOORSLIST(state, data) {
        state.mockFloorsList = data;
    }
};
const getters = {};

export default {
    state,
    actions,
    mutations,
    getters
}
