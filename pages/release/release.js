// pages/release/release.js

const { usdt } = require('../../utils/util')
const { addresses, carTypes, possibleSeats } = usdt
const atLeastOne = '请至少选择一个'

let origins = [addresses[0]]
let targets = [addresses[1]]

const availableOrigins = () => addresses.map(item => ({
  name: item, disabled: targets.includes(item),
  checked: origins.includes(item) && false === targets.includes(item)
}))

const availableTargets = () => addresses.map(item => ({
  name: item, disabled: origins.includes(item),
  checked: targets.includes(item) && false === origins.includes(item)
}))

Page({

  data: {
    aOrigins: availableOrigins(),
    aTargets: availableTargets(),
    carTypes,
    possibleSeats,

    time: '09:00',
    carType: [0, 0],
    seatsCount: 4,
    originInfo: false,
    targetInfo: false,
    tailInfo: false,
    phoneInfo: false
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

  changeOrigins({ detail: { value } }) {
    origins = value
    this.setData({
      aOrigins: availableOrigins(),
      aTargets: availableTargets(),
      originInfo: origins.length > 0 ? false : atLeastOne
    })
  },

  changeTargets({ detail: { value } }) {
    targets = value
    this.setData({
      aOrigins: availableOrigins(),
      aTargets: availableTargets(),
      targetInfo: targets.length > 0 ? false : atLeastOne
    })
  },

  changeType({ detail: { value: carType } }) {
    this.setData({ carType })
  },

  changeTime({ detail: { value: time } }) {
    this.setData({ time })
  },

  changeSeatsCount({ detail: { value } }) {
    this.setData({ seatsCount: possibleSeats[value] })
  },

  changeTail({ detail: { value: tailNum } }) {
    this.setData({ tailNum })
  },

  changePhone({ detail: { value: phoneNum } }) {
    this.setData({ phoneNum })
  },

  testTail({ detail: { value } }) {
    const { tailInfo } = this.data
    const isValid = (value.length >= 3)
    if (tailInfo === isValid) {
      this.setData({ tailInfo: false === isValid })
    }
  },

  testPhone({ detail: { value } }) {
    const { phoneInfo } = this.data
    const isValid = (value.length === 11)
    if (phoneInfo === isValid) {
      this.setData({ phoneInfo: false === isValid })
    }
  },

  release() {
    let {
      time, seatsCount, selectType,
      tailNum, phoneNum,
      originInfo, targetInfo, tailInfo, phoneInfo
    } = this.data

    if (undefined === tailNum || tailNum.length < 3) {
      tailInfo = true
    }
    if (undefined === phoneNum || phoneNum.length < 11) {
      phoneInfo = true
    }
    this.setData({ tailInfo, phoneInfo })

    const invalid = originInfo || targetInfo || tailInfo || phoneInfo
    if (false === invalid) {
      usdt.release({
        origins, targets, time,
        seatsCount, selectType,
        tailNum, phoneNum
      })
      wx.reLaunch({ url: '/pages/index/index' })
    }
  },

  onLoad() {
    this.initTime()
  },

  onUnload() {

  }
})
