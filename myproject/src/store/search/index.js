import {reqSearchList} from '@/api';
const state = {
    searchList: {}
};
const actions = {
    async getSearchList({commit}, params) {
        // console.log(111)
        let result = await reqSearchList(params);
        // console.log(result);
        if (result.code == 200) {
            commit('SEARCHLIST', result.data);
        }
    }
};
const mutations = {
    SEARCHLIST(state, data) {
        state.searchList = data;
    }
};
// 存储计算属性数据，可以简化数据映射
const getters = {
    // 参数列表，默认参数为当前仓库中state
    attrsList(state) {
        // console.log(state)
        return state.searchList.attrsList || [];
    },
    // 商品列表
    goodsList() {
        return state.searchList.goodsList || [];
    },
    // 品牌列表
    trademarkList() {
        return state.searchList.trademarkList || [];
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}