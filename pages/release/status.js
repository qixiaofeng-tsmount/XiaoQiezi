// pages/release/status.js

const {
  usdt, oneMinute, formatDateTime
} = require('../../utils/util')
const { addresses, carTypes, possibleSeats } = usdt

Page({

  data: {
    addresses, carTypes, possibleSeats,
    canBeCanceled: true
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
    usdt.completeReleased()
    wx.reLaunch({ url: '/pages/index/index' })
  },

  onLoad() {
    const released = usdt.getReleased()
    if (undefined === released) {
      wx.reLaunch({ url: '/pages/index/index' })
      return
    }
    const {
      time, origins, targets,
      seatsCount, carType, carColor,
      carTail, phone
    } = released
    const canBeCanceled = time > Date.now()
    const { datetime:dDatetime } = formatDateTime(new Date(time))
    this.setData({
      dDatetime, origins, targets,
      seatsCount, carType, carColor,
      carTail, phone, canBeCanceled
    })
  }
})
