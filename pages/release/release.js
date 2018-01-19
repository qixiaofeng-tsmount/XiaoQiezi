// pages/release/release.js

const { usdt } = require('../../utils/util')

Page({

  data: {
    addresses: [
      ['潞城', '宫'],
      ['潞城', '宫']
    ],
    carTypes: [
      ['小车', 'SUV', '面包车'],
      ['白色', '黑色', '红色', '其他颜色']
    ],
    time: '09:00',
    possibleSeats: [1, 2, 3, 4, 5, 6, 7],

    route: [0, 1],
    carType: [0, 0],
    seatsType: 3,
    info: false
  },

  initTime() {
    const now = new Date()
    const h = now.getHours()
    const hh = h < 10 ? '0' + h : '' + h
    const m = now.getMinutes()
    const mm = m < 10 ? '0' + m : '' + m
    const time = hh + ':' + mm
    this.setData({ time })
  },

  changeRoute({ detail: { value: route } }) {
    this.setData({ route, info: false })
  },

  changeType({ detail: { value: carType } }) {
    this.setData({ carType })
  },

  changeTime({ detail: { value: time } }) {
    this.setData({ time })
  },

  changeTailNum({ detail: { value: tailNum } }) {
    this.setData({ tailNum, info: false })
  },

  changePhoneNum({ detail: { value: phoneNum } }) {
    this.setData({ phoneNum, info: false })
  },

  changeSeatsCount({ detail: { value: seatsType } }) {
    this.setData({ seatsType })
  },

  release() {
    const {
      route, time,
      seatsType, selectType,
      tailNum, phoneNum
    } = this.data

    let info = ''
    if (route[0] === route[1]) {
      info += '目的地和出发地一样，路径无效'
    }
    if (undefined === phoneNum || phoneNum.length != 11) {
      info += '\n无效手机号，请输入 11 位手机号码'
    }
    if (undefined === tailNum || tailNum.length < 3) {
      info += '\n请输入至少三位车牌尾号'
    }
    if (0 === info.length) {
      usdt.release({
        route, time,
        seatsType, selectType,
        tailNum, phoneNum
      })
      wx.reLaunch({ url: '/pages/index/index' })
    } else {
      this.setData({ info })
    }
  },

  onLoad() {
    this.initTime()
  },

  onUnload() {

  }
})
