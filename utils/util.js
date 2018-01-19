const dateSep = '-'
const timeSep = ':'
const today = '今天'

const formatTime = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  return [hour, minute].map(formatNumber).join(timeSep)
}

const _formatDate = date =>
  [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  ].map(formatNumber).join(dateSep)

const formatDate = date => {
  const fmt = _formatDate(date)
  return _formatDate(new Date()) === fmt ? today : fmt
}

const formatDateTime = date => {
  const ymd = formatDate(date)
  const hm = formatTime(date)
  const isToday = (ymd === today)
  return {
    date:ymd,
    time:hm,
    datetime:ymd + (isToday ? '' : ' ') + hm
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const parseDateTime = (date, time) => {
  let dateObj = new Date()
  const isToday = (date === today)
  if (false === isToday) {
    const [year, month, day] = date.split(dateSep)
    dateObj.setFullYear(parseInt(year))
    dateObj.setMonth(parseInt(month) - 1)
    dateObj.setDate(parseInt(day))
  }
  const [hour, minute] = time.split(timeSep)
  dateObj.setHours(parseInt(hour))
  dateObj.setMinutes(parseInt(minute))
  dateObj.setMilliseconds(0)
  dateObj.setSeconds(0)
  return dateObj.getTime()
}

const tmp_rdkey = 'released'
const tmp_odkey = 'ordered'
const tmp_lrdkey = 'last-released'
const tmp_okey = 'order'
const tmp_lokey = 'last-order'
const tmp_ckey = 'candidates'
const usdt = { // user data
  addresses: [
    '潞城', '潮白家园', '潮白馨居',
    '宫一', '宫二', '宫三',
    '宫四', '宫五', '宫六',
    '宫七', '宫八', '宫九', '宫十'
  ],
  carTypes: ['小轿车', 'SUV', '面包车'],
  carColors: ['白色', '黑色', '红色', '其他颜色'],
  possibleSeats: [1, 2, 3, 4, 5, 6, 7],

  getReleased() {
    return wx.getStorageSync(tmp_rdkey) || undefined
  },
  getOrdered() {
    return wx.getStorageSync(tmp_odkey) || undefined
  },
  getLastReleased() {
    return wx.getStorageSync(tmp_lrdkey) || undefined
  },
  getOrdered() {
    return wx.getStorageSync(tmp_odkey) || undefined
  },
  getOrder() {
    return wx.getStorageSync(tmp_okey) || undefined
  },
  getLastOrder() {
    return wx.getStorageSync(tmp_lokey) || undefined
  },
  getCandidates() {
    return wx.getStorageSync(tmp_ckey) || []
  },
  release(info) {
    wx.setStorageSync(tmp_rdkey, info)
    wx.setStorageSync(tmp_lrdkey, info)
    const cands = wx.getStorageSync(tmp_ckey) || []
    cands.push(info)
    wx.setStorageSync(tmp_ckey, cands)
  },
  order(info) {
    wx.setStorageSync(tmp_odkey, info)
  },
  createOrder(info) {
    wx.setStorageSync(tmp_okey, info)
    wx.setStorageSync(tmp_lokey, info)
  },
  cancelReleased() {
    wx.removeStorageSync(tmp_rdkey)
  },
  cancelOrdered() {
    wx.removeStorageSync(tmp_odkey)
  },
  completeReleased() {
    wx.removeStorageSync(tmp_rdkey)
  },
  completeOrdered() {
    wx.removeStorageSync(tmp_odkey)
  }
}

const _ = (id, cb) => {
  wx.createSelectorQuery().select('#' + id).boundingClientRect(cb).exec()
}

const oneSecond = 1000
const oneMinute = 60 * oneSecond
const oneHour = 60 * oneMinute

const isValidPhone = phone => (phone.length === 11)
const isValidCarTail = carTail => (carTail.length >= 3)

module.exports = {
  oneSecond, oneMinute, oneHour,
  formatDate, formatTime, formatDateTime, parseDateTime,
  isValidPhone, isValidCarTail,
  usdt,
  _
}
