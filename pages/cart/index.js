/*
 * @Author: your name
 * @Date: 2020-03-16 10:56:11
 * @LastEditTime: 2020-03-23 16:43:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ heima-mall\pages\cart\index.js
 */
// pages/cart/index.js

/**
 * 1 获取用户的收获地址
 *   1 绑定点击事件
 *   2 调用小程序内置 api 获取用户的收获的地址 wx.chooseAddress
 *   
 *   2 获取 用户 对小程序 所授予 获取地址的 权限 状态 scope
 *      1 假设 用户 点击获取收获地址的提示框 确认 authSetting scope.address
 *        scope 值 true
 *      2 假设 用户 从来没有调用过 收货地址的 api
 *        scope 值 undefined
 *      3 假设 用户 点击获取收获地址的提示框 取消 
 *        scope 值 false
 *      1 诱导用户 自己 打开 授权设置页面(wx.openSetting) 当用户重新给与 获取地址权限的时候
 *      2 获取收获地址
 *      3 把获取到的收获地址 存入到 本地存储中
 *      提示：chooseAddress拒绝授权之后再次调用无效,要通过openSetting授权才能获取数据
 * 2 页面加载完毕
 *   0 onLoad onShow
 *   1 获取本地存储中的地址数据
 *   2 把数据设置给data中的一个变量
 * 3 onShow
 *   1 获取缓存中的购物车数组
 *   2 把购物车中的数据填充到data中
 */
import {
  getSetting,
  chooseAddress,
  openSetting
} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({
  data: {
    address: {},
    cart:[]
  },
  onShow() {
    // 1 获取缓存中的收获地址信息
    const address = wx.getStorageSync("address");
    // 1 获取缓存中的数据
    const cart=wx.getStorageSync("cart");
    // 2 给data赋值
    this.setData({
      address,
      cart
    })
  },
  onLoad: function (options) {

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
  }
})