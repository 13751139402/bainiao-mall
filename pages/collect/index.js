/*
 * @Author: your name
 * @Date: 2020-03-16 10:56:11
 * @LastEditTime: 2020-03-26 16:26:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ heima-mall\pages\collect\index.js
 */
// pages/collect/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    collect: [],
    tabs: [{
      id: 0,
      value: "商品收藏",
      isActive: true
    },
    {
      id: 1,
      value: "品牌收藏",
      isActive: false
    },
    {
      id: 2,
      value: "店铺收藏",
      isActive: false
    },
    {
      id: 3,
      value: "浏览器足迹",
      isActive: false
    },
    ],
  },
  // 标签点击事件，从子组件传递过来
  handleTabsItemChange(e) {
    // 1 获取被点击的标签索引
    const {
      index
    } = e.detail;
    // 2 修改原数组
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },
  onShow() {
    const collect = wx.getStorageSync("collect") || [];
    this.setData({
      collect
    })
  }
})