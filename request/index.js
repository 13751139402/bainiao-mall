/*
 * @Author: your name
 * @Date: 2020-03-17 10:37:01
 * @LastEditTime: 2020-03-19 17:16:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ heima-mall\request\index.js
 */
export const request = (params) => {
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
      }
    })
  })
}