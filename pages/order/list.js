// pages/order/list.js

const { usdt, formatDateTime } = require('../../utils/util')

Page({

  data: {},

  onLoad: function (options) {
    const order = usdt.getOrder()
    if (undefined === order) {
      wx.reLaunch({ url: '/pages/index/index' })
      return
    }
    const { time, origin, target, needSeats } = order
    const { datetime: dDatetime } = formatDateTime(new Date(time))
    this.setData({
      dDatetime, needSeats, origin, target,
      candidates: usdt.getCandidates().map(({ time, carType }) => {
        const { datetime:dDatetime } = formatDateTime(new Date(time))
        return { dDatetime, carType }
      })
    })
  }
})
