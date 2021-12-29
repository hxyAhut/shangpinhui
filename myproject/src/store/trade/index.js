import {reqOrderInfo, reqUserAddress} from '@/api';

const state = {
    orderInfo:{},
    users: []
};
const mutations = {
    ORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo || {};
    },
    USERSINFO(state, users) {
        state.users = users || [];
    }
};
const actions = {
    // 获取订单交易页信息
    async getOrderInfo({commit}) {
        let result = await reqOrderInfo();
        // console.log(111,result);
        if (result.code == 200) {
            commit('ORDERINFO',result.data);
            return 'Get orderInfo success'
        }else {
            return Promise.reject(new Error(`failure! ${result.message}`))
        }
    },
    // 获取用户地址信息
    async getUsersInfo({commit}) {
        let result = await reqUserAddress();
        // console.log(222,result)
        if (result.code == 200) {
            commit('USERSINFO', result.data);
            return 'Get userInfo success';
        }else {
            return Promise.reject(new Error(`failure! ${result.message}`));
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}