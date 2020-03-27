/*
 * @Author: your name
 * @Date: 2020-03-16 10:56:11
 * @LastEditTime: 2020-03-26 11:52:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ heima-mall\pages\order\index.js
 */
// pages/order/index.js

/*
1 页面被打开的时候 onShow
  0 onShow 不同于onLoad 无法在形参上接受 options 参数
  0 判断缓存中又没有token
    1 没有 直接跳转到授权页面
    2 有 直接往下进行
  1 获取url上的参数type
  2 根据type来决定页面标题的数组元素哪个被激活选中
  2 根据type 去发送请求获取订单数据
  3 渲染页面
2 点击不同标题 重新发送请求来获取和渲染数据
*/
import {
  request
} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: "全部",
      isActive: true
    },
    {
      id: 1,
      value: "待付款",
      isActive: false
    },
    {
      id: 2,
      value: "待发货",
      isActive: false
    },
    {
      id: 3,
      value: "退款",
      isActive: false
    },
    ],
  },
  onShow() {
    // 1 获取当前的小程序的页面栈 - 羽毛球筒  长度最大是10页面 页面栈最多只保留十个页面
    var pages = getCurrentPages();
    // 2 数组中索引最大的页面就是当前页面
    // 3 获取url上的type参数
    let { options: { type } } = pages[pages.length - 1];
    // 4 激活选中页面标题
    this.chnageTitleByIndex(type - 1);
    this.getOrders(type);
  },
  // 获取订单列表的方法
  async getOrders(type) {
    const res = await request({ url: "/my/orders/all", data: { type } })
    console.log(res);
  },
  // 根据标题索引来激活选中 标题数组
  chnageTitleByIndex(index) {
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
  // 标签点击事件，从子组件传递过来
  handleTabsItemChange(e) {
    // 1 获取被点击的标签索引
    const {
      index
    } = e.detail;
    this.chnageTitleByIndex(index)
    // 2 重新发送请求 type=1 index=0
    this.getOrders(index + 1);
  }
})