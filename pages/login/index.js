/*
 * @Author: your name
 * @Date: 2020-03-16 10:56:11
 * @LastEditTime: 2020-03-25 10:56:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ heima-mall\pages\login\index.js
 */
// pages/login/index.js
Page({
  handleGetUserInfo(e) {
    const { userInfo } = e.detail;
    wx.setStorageSync("userInfo", userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
})