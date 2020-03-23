/*
 * @Author: your name
 * @Date: 2020-03-23 11:38:04
 * @LastEditTime: 2020-03-23 11:47:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ heima-mall\utils\async.Wx.js
 */

 /**
  * promise 形式 getSetting
  */
export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

 /**
  * promise 形式 chooseAddress
  */
 export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

 /**
  * promise 形式 openSetting
  */
 export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}