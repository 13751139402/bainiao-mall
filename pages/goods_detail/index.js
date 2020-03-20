/*
 * @Author: your name
 * @Date: 2020-03-19 21:03:47
 * @LastEditTime: 2020-03-20 23:41:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \heima-mall\pages\goods_detail\index.js
 */

/*
    1 发送请求获取数据
    2 点击轮播图 预览大图
      1 给轮播图绑定点击事件
      2 调用小程序的api previewImage
 */
import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';

Page({
  data: {
    goodsObj: {}
  },
  // 商品对象
  GoodsInfo: {},
  onLoad: function({ goods_id }) {
    this.getGoodsDetail(goods_id);
  },
  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({
      url: '/goods/detail',
      data: {
        goods_id
      }
    });
    const { goods_name, goods_price, goods_introduce, pics } = goodsObj;
    this.GoodsInfo = goodsObj;
    this.setData({
      goodsObj: {
        goods_name,
        goods_price,
        // iphone不分手 不知别 webp图片格式
        // 最好找到后台 让他们进行修改
        // 临时自己改 确保后台存在 1.webp=>1.jpg
        goods_introduce: goods_introduce.replace(/\.webp/g, '.jpg'),
        pics
      }
    });
  },
  // 点击轮播图 放大预览
  handlePrevewImage({ currentTarget:{dataset:{url:current}}}) {
    // 1 先构造要预览的图片数组
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    wx.previewImage({
      current,
      urls
    });
  }
});
