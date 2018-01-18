// pages/release/release.js
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
    selectedRoute: [0, 0],
    selectedType: [0, 0],
    scIndex:3 // seats count index
  },

  changeRoute({ detail:{ value:selectedRoute } }) {
    this.setData({ selectedRoute })
  },

  changeType({ detail: { value: selectedType } }) {
    this.setData({ selectedType })
  },

  changeTime({ detail: { value: time } }) {
    this.setData({ time })
  },

  changeTailNum({ detail: { value: tailNum } }) {
    this.setData({ tailNum })
  },

  changePhoneNum({ detail: { value: phoneNum } }) {
    this.setData({ phoneNum })
  },

  changeSeatsCount({ detail: { value: scIndex } }) {
    this.setData({ scIndex })
  },

  release() {
    const { scIndex, phoneNum, tailNum, time, selectType, selectedRoute } = this.data
    let info = ''
    if (selectedRoute[0] === selectedRoute[1]) {
      info += '目的地和出发地一样，路径无效\n'
    }
    if (undefined === phoneNum || phoneNum.length != 11) {
      info += ''
    }
  },

  onLoad() {
    const now = new Date()
    const h = now.getHours()
    const hh = h < 10 ? '0' + h : '' + h
    const m = now.getMinutes()
    const mm = m < 10 ? '0' + m : '' + m
    const time = hh + ':' + mm
    this.setData({ time })
  },
  
  onUnload() {

  }
})
