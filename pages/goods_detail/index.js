import {
  request
} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js'

// pages/goods_detail/index.js
Page({
  data: {
    goodsObj: {}
  },
  onLoad: function({
    goods_id
  }) {
    this.getGoodsDetail(goods_id);
  },
  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    const res = await request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    })
    this.setData({
      goodsObj: res
    })
  }
})