// pages/release/release.js

const {
  usdt, oneMinute,
  formatDate, formatTime, parseDateTime,
  isValidPhone, isValidCarTail
} = require('../../utils/util')
const { addresses, carTypes, carColors, possibleSeats } = usdt
const atLeastOne = '请至少选择一个'

let origins = [addresses[0]]
let targets = [addresses[1]]
let time = Date.now()

const availableOrigins = () => addresses.map(item => ({
  name: item, disabled: targets.includes(item),
  checked: origins.includes(item) && false === targets.includes(item)
}))

const availableTargets = () => addresses.map(item => ({
  name: item, disabled: origins.includes(item),
  checked: targets.includes(item) && false === origins.includes(item)
}))

const getDisplayDate = () => formatDate(new Date(time))
const getDisplayTime = () => formatTime(new Date(time))

Page({

  data: {
    dOrigins: availableOrigins(),
    dTargets: availableTargets(),
    dDate: getDisplayDate(),
    dTime: getDisplayTime(),
    carTypes, carColors,
    possibleSeats,

    carType: carTypes[0],
    carColor: carColors[0],
    seatsCount: 4,
    originInfo: false,
    targetInfo: false,
    tailInfo: false,
    phoneInfo: false
  },

  loadLast() {
    const last = usdt.getLastReleased()
    if (undefined === last) {
      return
    }
    const {
      origins: o, targets: t,
      carType, carColor,
      carTail, phone
    } = last
    origins = o
    targets = t

    this.setData({
      dOrigins: availableOrigins(),
      dTargets: availableTargets(),
      carType, carColor,
      carTail, phone
    })
  },

  initTime() {
    time = Date.now() + 20 * oneMinute
    this.setData({
      dDate: getDisplayDate(),
      dTime: getDisplayTime()
    })
  },

  changeOrigins({ detail: { value } }) {
    origins = value
    this.setData({
      dOrigins: availableOrigins(),
      dTargets: availableTargets(),
      originInfo: origins.length > 0 ? false : atLeastOne
    })
  },

  changeTargets({ detail: { value } }) {
    targets = value
    this.setData({
      dOrigins: availableOrigins(),
      dTargets: availableTargets(),
      targetInfo: targets.length > 0 ? false : atLeastOne
    })
  },

  changeType({ detail: { value } }) {
    this.setData({ carColor: carColors[value[0]], carType: carTypes[value[1]] })
  },

  changeDate({ detail: { value: dDate } }) {
    const { dTime } = this.data
    this.setData({ dDate })
    time = parseDateTime(dDate, dTime)
  },

  changeTime({ detail: { value: dTime } }) {
    const { dDate } = this.data
    this.setData({ dTime })
    time = parseDateTime(dDate, dTime)
  },

  changeSeatsCount({ detail: { value } }) {
    this.setData({ seatsCount: possibleSeats[value] })
  },

  changeTail({ detail: { value: carTail } }) {
    this.setData({ carTail })
  },

  changePhone({ detail: { value: phone } }) {
    this.setData({ phone })
  },

  testTail({ detail: { value } }) {
    const { tailInfo } = this.data
    if (tailInfo === isValidCarTail(value)) {
      this.setData({ tailInfo: false === tailInfo })
    }
  },

  testPhone({ detail: { value } }) {
    const { phoneInfo } = this.data
    if (phoneInfo === isValidPhone(value)) {
      this.setData({ phoneInfo: false === phoneInfo })
    }
  },

  release() {
    let {
      seatsCount, carType, carColor,
      carTail, phone,
      originInfo, targetInfo, tailInfo, phoneInfo
    } = this.data

    if (
      undefined === carTail ||
      false === isValidCarTail(carTail)
    ) {
      tailInfo = true
    }
    if (
      undefined === phone ||
      false === isValidPhone(phone)
    ) {
      phoneInfo = true
    }
    this.setData({ tailInfo, phoneInfo })

    const invalid = originInfo || targetInfo || tailInfo || phoneInfo
    if (false === invalid) {
      usdt.release({
        origins, targets, time,
        seatsCount, carType, carColor,
        carTail, phone
      })
      wx.reLaunch({ url: '/pages/index/index' })
    }
  },

  onLoad() {
    this.loadLast()
    this.initTime()
  },

  onUnload() {

  }
})
