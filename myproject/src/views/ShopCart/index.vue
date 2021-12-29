<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart, index) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked == 1" @change="changeIsChecked(cart, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="changeNum(-1,cart)">-</a>
            <input autocomplete="off" type="text" minnum="1" @change="changeNum($event.target.value,cart)" class="itxt" :value="cart.skuNum">
            <a class="plus" @click="changeNum(1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuPrice * cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCard(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isCheckAll&&cartInfoList.length > 0" @change="CheckAll">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import throttle from 'lodash/throttle';

  export default {
    name: 'ShopCart',
    mounted() {
      // 获取购物车信息(仅在挂载完毕后派发一次请求)
      this.$store.dispatch('getShopcartList');
    },
    computed: {
      ...mapGetters(['shopcartList']),
      cartInfoList() {
        return this.shopcartList.cartInfoList || []
      },
      // 总价
      totalPrice() {
        let sum = 0;
          this.cartInfoList.forEach(item => {
            sum += item.skuNum * item.skuPrice
        })
        return sum
      },
      // 检测全选
      isCheckAll() {
        return this.cartInfoList.every(item => {
          return item.isChecked == 1
        })
      }
    },
    methods: {
      // 修改商品数量
      changeNum: throttle(async function (num,cart) {
        // console.log(num,cart)
        let disNum = 0;
        if (num == -1) {
          // 用户点击-1
          // disNum = -1;
          if (cart.skuNum < 2) {
            disNum = 0;
          }else {
            disNum = -1;
          }
          
        }else if (num == 1) {
          // 用户点击1
          disNum = 1;
        }else {
          // 用户通过输入数字来修改商品数量
          if (isNaN(num) || num < 1) {
            disNum = 0;
          }else {
            disNum = parseInt(num) - cart.skuNum;
          }
        }
        // 需要派发action，发送请求
        // 由于是通知服务器存储数据，所以不需返回值。但由于可能请求失败，于是需要捕获错误
        try{
          await this.$store.dispatch('addOrUpdateShopcart', {skuId: cart.skuId, skuNum: disNum});
          // 上面这种情况只是通知服务器存储数据，并没有在仓库里做修改，因此仓库的值此时还没有变化，用户在浏览器中看到的也只是没有修改之前的数据，
          // 所以需要再次向服务器发送请求，获取新的数据。
          this.$store.dispatch('getShopcartList');
        }catch(err) {
          console.log(err)
        }
      }, 1000),
      // 删除购物车中的某一个商品
      async deleteCard(cart) {
        try {
          // 派发action，向服务器发送删除请求
          await this.$store.dispatch('deleteShopCartList', cart.skuId);
          this.$store.dispatch('getShopcartList');
        } catch (error) {
          console.log(error.message)
        }
      },
      // 改变商品选中状态
      async changeIsChecked(cart, e) {
        // console.log(cart, e)
        // event事件中的e.target.checked属性可以监听到当前按钮是否被选中
        try {
          // 派发action，通知服务器，改变商品选中状态
          await this.$store.dispatch('changeCartIsChecked', {skuId: cart.skuId, isChecked: e.target.checked ? 1:0});
          // 向服务器发送请求，获取购物车数据
          this.$store.dispatch('getShopcartList');
        } catch (error) {
          console.log(error.message);
        }
      },
      // 删除选中商品
      async deleteAllChecked() {
        // 派发action, 通知服务器删除选中商品。因此需配置action
        try {
          await this.$store.dispatch('deleteAllChecked')
          this.$store.dispatch('getShopcartList')
        } catch (error) {
          console.log(error.message)
        }
      },
      // 选择全部商品
      async CheckAll(e) {
        // console.log(e)
          try {
            let checked = e.target.checked ? 1 : 0;
            // console.log(checked) 
            await this.$store.dispatch('checkAll', checked);
            this.$store.dispatch('getShopcartList');
          } catch (error) {
            console.log(error.message)
          }
          
      }
    }
  }
</script>

<style lang="less" scoped>
* {
  // margin: 0;
  // padding: 0;
  list-style: none;
}
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 17.1667%;
          }

          .cart-list-con2 {
            width: 33%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }


          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 15%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 7px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 7px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 5.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>