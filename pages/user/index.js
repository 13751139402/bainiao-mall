/*
 * @Author: your name
 * @Date: 2020-03-16 10:56:11
 * @LastEditTime: 2020-03-26 15:51:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ heima-mall\pages\user\index.js
 */
// pages/user/index.js
Page({
  data: {
    userInfo: {},
    // 被收藏的商品的数量
    collectNums: 0
  },
  onShow() {
    const userInfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync("collect") || [];
    this.setData({ userInfo, collectNums: collect.length })
  }
})