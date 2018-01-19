// pages/order/order.js

const {
  usdt, oneMinute,
  formatTime, formatDate, parseDateTime,
  isValidPhone
} = require('../../utils/util')
const { addresses, possibleSeats } = usdt

let time = Date.now()
let needSeats = 1

Page({

  data: {
    addresses, possibleSeats,

    dSeats: possibleSeats.indexOf(needSeats),
    dDate: formatDate(new Date(time)),
    dTime: formatTime(new Date(time)),
    phoneInfo: false,

    origin: addresses[0],
    target: addresses[1]
  },

  loadLast() {
    const last = usdt.getLastOrder()
    if (undefined === last) {
      return
    }
    const { origin, target, phone, needSeats:n } = last
    needSeats = n
    this.setData({
      origin, target, phone, dSeats: possibleSeats.indexOf(needSeats)
    })
  },

  initTime() {
    time = Date.now() + 20 * oneMinute
    const parsed = new Date(time)
    this.setData({
      dDate: formatDate(parsed),
      dTime: formatTime(parsed)
    })
  },

  changeRoute({ detail: { value: [o, t] } }) {
    if (o === t) {
      return
    }
    this.setData({
      origin: addresses[o],
      target: addresses[t]
    })
  },

  changeSeats({ detail: { value: dSeats } }) {
    needSeats = possibleSeats[dSeats]
    this.setData({ dSeats })
  },

  changeDate({ detail: { value: dDate } }) {
    const { dTime } = this.data
    time = parseDateTime(dDate, dTime)
    this.setData({ dDate })
  },

  changeTime({ detail: { value: dTime } }) {
    const { dDate } = this.data
    time = parseDateTime(dDate, dTime)
    this.setData({ dTime })
  },

  changePhone({ detail: { value: phone } }) {
    this.setData({ phone })
  },

  testPhone({ detail: { value } }) {
    const { phoneInfo } = this.data
    if (phoneInfo === isValidPhone(value)) {
      this.setData({ phoneInfo: false === phoneInfo })
    }
  },

  order() {
    let { origin, target, phone, phoneInfo } = this.data
    if (
      undefined === phone ||
      false === isValidPhone(phone)
    ) {
      phoneInfo = true
    }
    this.setData({ phoneInfo })
    if (false === phoneInfo) {
      usdt.createOrder({
        origin, target, time, needSeats, phone
      })
      wx.reLaunch({ url: '/pages/index/index' })
    }
  },

  onLoad() {
    this.loadLast()
    this.initTime()
  }
})
