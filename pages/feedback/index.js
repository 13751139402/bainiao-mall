/*
 * @Author: your name
 * @Date: 2020-03-16 10:56:11
 * @LastEditTime: 2020-03-27 16:58:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ heima-mall\pages\feedback\index.js
 */
// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: "体验问题",
      isActive: true
    },
    {
      id: 1,
      value: "商品,商家投诉",
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
  }
})