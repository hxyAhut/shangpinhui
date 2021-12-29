import {reqShopCart, reqDeleteCardBySkuId, reqCartIsChecked} from '@/api'


const state = {
    shopcartList: [],
    
};
const mutations = {
    SHOPCARTLIST(state, data) {
        state.shopcartList = data;
    }
};
const actions = {
    // 获取购物车列表
    async getShopcartList({commit}) {
        let result = await reqShopCart();
        console.log(result)
        // 捞不到数据。因为此时服务器端并不知道是谁在查看购物车，不知道返回谁的购物车的数据。
        // 所以需要我们传递一个唯一的身份标识，用于服务器识别
        if (result.code == 200) {
            commit('SHOPCARTLIST', result.data)
        }
    },
    // 删除购物车中的某一个商品
    async deleteShopCartList({commit}, skuId) {
        let result = await reqDeleteCardBySkuId(skuId);
        if (result.code == 200) {
            return 'success'
        }else {
            return Promise.reject(new Error('failure'));
        }
    },
    // 改变商品选中状态
    async changeCartIsChecked({commit}, {skuId, isChecked}) {
        let result = await reqCartIsChecked(skuId, isChecked);
        if (result.code == 200) {
            return 'success';
        }else {
            return Promise.reject(new Error('failure'));
        }
    },
    // 删除选中商品
    deleteAllChecked({dispatch, getters}) {
        // actions中的方法的参数默认为store，即仓库，其中包含当前仓库的所有信息。
        // 所以可以该store中的dispatch派发本仓库中的actions方法。
        // console.log(getters);
        // Promise.all()方法中，参数为一个数组，数组中的每一个元素为promise对象
        let PromiseAll = [];
        getters.shopcartList.cartInfoList.forEach(item => {
            if (item.isChecked == 1) {
              var promise = dispatch('deleteShopCartList', item.skuId);
            }
            PromiseAll.push(promise);
        })
        // promise的all方法，若其中promise对象均返回成功，则为true,若有一个失败，则为false
        return Promise.all(PromiseAll);
    },
    // 选择全部商品
    checkAll({dispatch, getters}, isChecked) {
        // console.log(getters)
        let PromiseAll = [];
        getters.shopcartList.cartInfoList.forEach(item => {
            // var promise = item.isChecked ? 1: 0;
            var promise = dispatch('changeCartIsChecked', {skuId:item.skuId, isChecked})
            PromiseAll.push(promise);
        })
        return Promise.all(PromiseAll)
    }
};
const getters = {
    shopcartList() {
        return state.shopcartList[0] || {}
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}