/*
 * @Author: your name
 * @Date: 2020-03-16 10:56:11
 * @LastEditTime: 2020-03-24 22:47:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ heima-mall\pages\pay\index.js
 */
/**
 * 1 页面加载的时候
 *   1 从缓存中获取购物车数据 渲染到页面中
 *     这些数据 checked=true
 * 2 微信支付
 *   1 哪些人 哪些账号 可以实现微信支付
 *     1 企业账号
 *     2 企业账号的小程序后台中 必须 给开发者 添加上白名单
 *       1 一个appid可以同时绑定多个开发者
 *       2 这些开发者就可以共用这个appid和它的开发权限
 * 3 支付按钮
 *   1 先判断缓存中有没有token
 *   2 没有 跳转授权页面 进行获取token
 *   3 有token
 *   4 创建订单 获取订单编号
 *   5 已经完成了微信支付
 *   6 手动删除缓存中 已经被选中了的商品
 *   7 删除后的购物车数据 填充回缓存
 *   8 再跳转页面
 */
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from "../../utils/asyncWx.js";
import {
  request
} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    // 1 获取缓存中的收获地址信息
    const address = wx.getStorageSync("address");
    // 1 获取缓存中的数据
    let cart = wx.getStorageSync("cart") || [];
    cart = cart.filter(v => v.checked)
    // 1 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
    wx.setStorageSync("cart", cart);
  },
  // 点击 收获地址
  async handleChooseAddress() {
    try {
      // 1 获取 权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      // 2 判断 权限状态
      if (scopeAddress === false) {
        const res2 = await openSetting();
      }
      // 4 调用获取收获地址的api
      const address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo

      // 5 存入到缓存中
      wx.setStorageSync("address", address)
    } catch (err) {
      console.log(err)
    }
  },
  // 点击 支付
  async handleOrderPay() {
    // 1 判断缓存中有没有token
    const token = wx.getStorageSync("token");
    // 2 判断
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    // 3 创建订单
    // 3.1 准备 请求头参数
    const header = { Authorization: token };
    // 3.2 准备 请求体参数
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart;
    let goods = [];
    cart.forEach(v => goods.push({
      goods_id: v.goods_id,
      goods_number: v.num,
      goods_price: v.goods_price
    }))
    const orderParams = { order_price, consignee_addr, goods };
    // 4 准备发送请求 创建订单 获取订单编号
    const order_number = await request({ url: "/my/orders/create", method: "POST", data: orderParams, header });
    // 5 发起预支付页面
  }

})