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
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'
    }).then((result) => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },

  // 获取 分类导航数据
  getCateList() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'
    }).then((result) => {
      this.setData({
        catesList: result.data.message
      })
    })
  },

  // 获取 楼层数组
  getFloorList() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'
    }).then((result) => {
      this.setData({
        floorList: result.data.message
      })
    })
  }
})