/*
 * @Author: your name
 * @Date: 2020-03-16 10:56:11
 * @LastEditTime: 2020-03-27 15:59:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ heima-mall\pages\search\index.js
 */
/**
 * 1 输入框绑定 值改变事件 input事件
 *   1 获取到输入框的值
 *   2 合法性判断
 *   3 检验通过 把输入框的值 发送到后台
 *   4 返回的数据打印到页面上
 * 2 防抖(防止抖动)如果不设置界面会一直抖动 定时器
 *   0 防止 一般 输入框中 防止重复输入 重复发送请求
 *   1 节流 一般用于在页面下拉和上拉
 *   1 定义全局的定时器id
 */

import {
  request
} from '../../request/index.js'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime.js'
Page({
  data: {
    goods: [],
    // 取消 按钮 是否显示
    isFocus: false,
    // 输入框的值
    inpValue: ""
  },
  TimeId: -1,
  // 输入框的值改变 就会触发的事件
  handleInput(e) {
    // 1 获取输入框的值
    const { value } = e.detail;
    // 2 检验合法性
    if (!value.trim()) {
      // 值不合法
      this.setData({
        goods: [],
        isFocus: true
      })
      clearTimeout(this.TimeId);
      return;
    }
    // 3 准备发送请求获取数据
    this.setData({
      isFocus: true
    })
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000)
  },
  // 发送请求获取搜索建议 数据
  async qsearch(query) {
    const res = await request({ url: "/goods/qsearch", data: { query } });
    this.setData({
      goods: res
    })
  },
  // 点击 取消按钮
  handleCancel() {
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
  }
})