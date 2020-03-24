/*
 * @Author: your name
 * @Date: 2020-03-16 10:56:11
 * @LastEditTime: 2020-03-24 22:36:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ heima-mall\pages\auth\index.js
 */
// pages/auth/index.js
import {
  request
} from '../../request/index.js'
import {
  login
} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js'

Page({
  // 获取用户信息
  // 1 用户授权 button open-type="getUserInfo"
  // 2 wx.login获取code
  // 3 code 传到服务器中 换取用户数据
  async handleGetUserInfo(e) {
    try {
      // 1 获取用户信息
      const {
        encrypetdData,
        rawData,
        iv,
        signature
      } = e.detail;
      // 2 获取小程序登录成功后的code
      const { code } = await login();
      // 3 发送请求 获取用户的token
      const token = await request({
        url: "/users/wxlogin", data: {
          encrypetdData,
          rawData,
          iv,
          signature,
          code
        },
        method: "post"
      })
      // 4 把token存入缓存中 同时跳回上一个页面
      wx.setStorageSync("token", token || 'adwdoahsnodas5616');
      wx.navigateBack({
        delta: 1
      });

    } catch (error) {
      console.log(error)
    }
  }
})