/*
 * @Author: your name
 * @Date: 2020-03-17 10:37:01
 * @LastEditTime: 2020-03-20 16:05:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ heima-mall\request\index.js
 */
// 同时发送异步代码的次数
let ajaxTimes = 0;


export const request = (params) => {
  ajaxTimes++;
  // 显示加载中 效果
  wx.showLoading({
    title: '加载中',
    mask: true
  })

  // 定义公共的url
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve, reject) => {
    console.log(baseUrl + params.url)
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result.data.message);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes === 0) {
          // 关闭正在等待的图标
          wx.hideLoading()
        }
      }
    })
  })
}