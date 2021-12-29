import { reqGoodList, reqAddOrUpdateShopcart } from "../../api";
import {getUUID} from '@/utils/uuid_token'

// 详情页的仓库
const state = {
    goodList: {},
    // getUUID()方法可以随机生成一个唯一的字符串。（且该方法要保证每次请求时不变）
    uuid_token: getUUID()
};
const mutations = {
    GETGOODLIST(state, data) {
        state.goodList = data;
    }
};
const actions = {
    async getGoodList({commit}, skuid) {
        let result = await reqGoodList(skuid);
        // console.log(result)
        if (result.code == 200) {
            commit('GETGOODLIST', result.data);
        }
    },
    // 添加到购物车或者修改商品数量接口
    async addOrUpdateShopcart({commit}, {skuId, skuNum}) {
        let result = await reqAddOrUpdateShopcart(skuId, skuNum);
        // console.log(result);
        // 由于是将商品通知服务器存储，因此没有返回结果，所以不需将结果存储在仓库中。
        // 但在将商品通知服务器存储即发请求时，可能请求失败，因此需要将成功或者失败的结果返回
        if (result.code == 200) {
            return 'success';
        }else {
            return Promise.reject(new Error('failure'))
        }
    }
};
const getters = {
    categoryView() {
        return state.goodList.categoryView || {}
    },
    skuInfo() {
        return state.goodList.skuInfo || {}
    },
    spuSaleAttrList() {
        return state.goodList.spuSaleAttrList || []
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}