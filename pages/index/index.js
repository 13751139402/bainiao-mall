/*
 * @Author: your name
 * @Date: 2020-03-16 10:42:54
 * @LastEditTime: 2020-03-19 16:21:21
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ heima-mall\pages\index\index.js
 */
// 0 引入 用来发送请求的 方法
import {
  request
} from '../../request/index.js'

Page({

  data: {
    // 轮播图数据
    swiperList: [],
    // 导航数组
    catesList: [],
    // 楼层数组
    floorList: []
  },
  // 页面开始加载 就会触发
  onLoad: function(options) {
    // 1.发送异步请求获取轮播图数据
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },

  // 获取轮播图数据
  getSwiperList() {
    request({
      url: '/home/swiperdata'
    }).then((result) => {
      this.setData({
        swiperList: result
      })
    })
  },

  // 获取 分类导航数据
  getCateList() {
    request({
      url: '/home/catitems'
    }).then((result) => {
      this.setData({
        catesList: result
      })
    })
  },

  // 获取 楼层数组
  getFloorList() {
    request({
      url: '/home/floordata'
    }).then((result) => {
      this.setData({
        floorList: result
      })
    })
  }
})