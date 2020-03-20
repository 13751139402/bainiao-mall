/*
 * @Author: your name
 * @Date: 2020-03-16 10:56:11
 * @LastEditTime: 2020-03-20 16:00:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ heima-mall\pages\goods_list\index.js
 */
// pages/goods_list/index.js

/*
 1 用户上滑页面 滚动条触底 开始加载下一页数据
   1 找到滚动条触底事件 微信官网小程序中寻找
   2 判断还有没有下一页数据
     1 获取到总页数 只有总条数
       总页数 = Math.ceil(总条数 / 页容量 pageSize)
       总页数 = Math.ceil( 23 / 10 ) = 3
     2 获取到当前的页码 pagenum
     3 判断一下 当前的页码是否大于等于 总页数
        表示 没有下一页数据
   3 假如没有下一页数据 弹出一个提示
   4 假如还有下一页数据 来加载下一页数据
     1 当前的页码 ++
     2 重新发送请求
     3 数据请求回来 对data中的数据 进行 拼接 而不是替换
 */

import {
  request
} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js'

Page({
  data: {
    tabs: [{
      id: 0,
      value: "综合",
      isActive: true
    },
    {
      id: 1,
      value: "销售",
      isActive: false
    },
    {
      id: 2,
      value: "价格",
      isActive: false
    },
    ],
    goodsList: []
  },
  // 接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 1,
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },

  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({
      url: "/goods/search",
      data: this.QueryParams
    });
    // 获取 总条数
    const total = res.total;
    // 计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods]
    })
  },
  // 页面上滑 滚动条触底事件
  onReachBottom() {
    // 1 判断还有没有下一页数据
    if (this.QueryParams.pagenum >= this.totalPages) {
      // 没有下一页数据
      wx.showToast({
        title: '没有下一页数据'
      });
    } else {
      // 还有下一页数据
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
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