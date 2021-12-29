// 登录与注册仓库

import {reqGetCode, reqRegister, reqLogin, reqUserInfo, reqLoginOut} from '@/api'

const state = {
    code: '',
    userInfo: {},
    token: localStorage.getItem('TOKEN')
};
const mutations = {
    GETCODE(state, data) {
        state.code = data;
    },
    USERLOGIN(state, user) {
        // state.userInfo = userInfo;
        state.token = user.token;
    },
    USERINFO(state, userInfo) {
        state.userInfo = userInfo;
    } ,
    USERLOGINOUT(state) {
        state.userInfo = {};
        state.token = '';
        // 清除本地存储中的token
        localStorage.removeItem('TOKEN');
    }
};
const actions = {
    // 获取验证码
    async getCode({commit}, phone) {
        let result = await reqGetCode(phone);
        // console.log(result);
        if (result.code == 200) {
            commit('GETCODE',result.data);
            return 'success'
        }else {
            return Promise.reject(new Error('failure'));
        }
    },
    // 请求注册
    async userRegister({commit}, user) {
        let result = await reqRegister(user);
        // console.log(result)
        if(result.code == 200) {
            return 'Register success'
        }else {
            return Promise.reject(new Error(`failure! ${result.message}`));
        }
    },
    // 请求登录
    async userLogin({commit}, loginInfo) {
        let result = await reqLogin(loginInfo);
        // console.log(result)
        if (result.code == 200) {
            // 登录的一瞬间，服务器就将token令牌返回给浏览器端，用于存储用户的唯一身份标识
            commit('USERLOGIN',result.data)
            // 将token信息存储在本地存储中
            localStorage.setItem('TOKEN',result.data.token);
            return 'Login success'
        }else {
            return Promise.reject(new Error(`failure! ${result.message}`))
        }
    },
    // 获取用户信息
    async userInfo({commit}) {
        let result = await reqUserInfo();
        // console.log(result);
        if (result.code == 200) {
            commit('USERINFO', result.data)
            return 'Get userInfo success'
        }else {
            return Promise.reject(new Error(`failure! ${result.message}`))
        }
    },
    // 退出登录
    // 对于退出登录来说，需要清除token信息，以及仓库中用户的所有信息。
    async userLoginOut({commit}) {
        let result = await reqLoginOut();
        // console.log(result);
        if (result.code == 200) {
            commit('USERLOGINOUT');
            return 'User login out'
        }else {
            return Promise.reject(new Error(`failure! ${result.message}`))
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