// 当前这个模块，API进行统一管理。避免在项目中所有需要发送请求的地方一个个去找，这样不易管理。
// 因此可将这些请求封装在一个函数文件中，每隔函数向外暴漏接口，到时直接使用即可。
import requests from './request';
import mockRequests from './mockRequest';

// 三级联动接口
//  地址：/api/product/getBaseCategoryList   get请求   无参数
export const reqCategoryList = () => {
    // 发请求:axios发请求返回结果为Promise对象
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}

// mock数据,发请求（浏览器拦截），获取轮播图数据
export const mockBannersList = () => {
    return mockRequests({
        url: '/banners',
        method: 'GET'
    })
}

// mock数据，发请求（浏览器拦截），获取floor数据
export const mockFloorsList = () => {
    return mockRequests({
        url: '/floors',
        method: 'GET'
    })
}

// search接口  /api/list  请求方式：post
export const reqSearchList = (params) => {
    return requests({
        url: '/list',
        method: 'POST',
        // 请求体参数
        data: params
    })
}

// 发送商品详情请求 /api/item/{skuid}   get请求
export const reqGoodList = (skuid) => {
    return requests({
        url: `/item/${skuid}`,
        method: 'GET'
    })
}


// 加入购物车的请求(或者对已有物品进行数量改动)
// /api/cart/addToCart/{ skuId }/{ skuNum }    POST
export const reqAddOrUpdateShopcart = (skuId, skuNum) => {
    return requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'POST'
    })
}


// 查看购物车接口
// /api/cart/cartList    GET
export const reqShopCart = () => {
    return requests({
        url: '/cart/cartList',
        method: 'GET'
    })
}

// 删除购物车中的某一个商品
// /api/cart/deleteCart/{skuId}      DELETE
export const reqDeleteCardBySkuId = (skuId) => {
    return requests({
        url: `/cart/deleteCart/${skuId}`,
        method: 'DELETE'
    })
}


// 改变商品选中状态
// /api/cart/checkCart/{skuID}/{isChecked}   GET
export const reqCartIsChecked = (skuId, isChecked) => {
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'GET'
    })
}

// 登录
// /api/user/passport/login   POST
export const reqLogin = (data) => {
    return requests({
        url: '/user/passport/login',
        method: 'POST',
        data
    })
}



// 退出登录
// /api/user/passport/logout     GET请求
export const reqLoginOut = () => {
    return requests({
        url: '/user/passport/logout',
        method: 'GET'
    })
}



// 注册
// /api/user/passport/register   POST
export const reqRegister = (data) => {
    return requests({
        url: '/user/passport/register',
        method: 'POST',
        data
    })
}


// 获取验证码
// /api/user/passport/sendCode/{phone}     get
export const reqGetCode = (phone) => {
    return requests({
        url: `/user/passport/sendCode/${phone}`,
        method: 'GET'
    })
}


// 获取用户信息
// 添加了token校验获取用户登录信息，用户登录只保存用户的token
// token校验
// http://182.92.128.115/api/user/passport/auth/getUserInfo    GET请求
export const reqUserInfo = () => {
    return requests({
        url: '/user/passport/auth/getUserInfo',
        method: 'GET'        
    })
}



// 获取订单交易页信息
// /api/order/auth/trade     GET请求
export const reqOrderInfo = () => {
    return requests({
        url: '/order/auth/trade',
        method: 'GET'
    })
}



// /api/user/userAddress/auth/findUserAddressList
// 获取用户地址信息
// get
export const reqUserAddress = () => {
    return requests({
        url: '/user/userAddress/auth/findUserAddressList',
        method: 'GET'
    })
}


// 提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}    POST请求
export const reqSubmitOrder = (tradeNo,data) => {
    return requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method: 'POST'
    })
}


// 获取订单支付信息
//  /api/payment/weixin/createNative/{orderId}   GET请求
export const reqorderPaymentInfo = (orderId) => {
    return requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'GET'
    })
}


// 查询订单支付状态
// /api/payment/weixin/queryPayStatus/{orderId}    GET请求
export const reqPayStatus = (orderId) => {
    return requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: 'GET'
    })
}


// 获取订单列表信息
// /api/order/auth/{page}/{limit}   GET请求
export const reqOrderList = (page, limit) => {
    return requests({
        url: `/order/auth/${page}/${limit}`,
        method: 'GET'
    })
}