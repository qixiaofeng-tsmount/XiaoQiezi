// pages/release/status.js

const { usdt, oneMinute } = require('../../utils/util')
const { addresses, carTypes, possibleSeats } = usdt

Page({

  data: {
    addresses, carTypes, possibleSeats,
    canBeCanceled: true,
    isTimePassed: false
  },

  cancel() {
    wx.showModal({
      title: '确认操作',
      content: '您确认撤销本次行程？',
      showCancel: true,
      success({ confirm }) {
        if (confirm) {
          usdt.cancelReleased()
          wx.reLaunch({ url: '/pages/index/index' })
        }
      }
    })
  },
  complete() {

  },

  onLoad() {
    const released = usdt.getReleased()
    if (undefined === released) {
      wx.reLaunch({ url: '/pages/index/index' })
      return
    }
    const {
      route, time,
      seatsCount, carType,
      tailNum, phoneNum
    } = released
    this.setData({
      route, time,
      seatsCount, carType,
      tailNum, phoneNum
    })
  }
})
