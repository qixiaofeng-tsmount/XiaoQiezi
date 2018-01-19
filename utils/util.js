
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const ymd = [year, month, day].map(formatNumber).join('/')
  const hms = [hour, minute, second].map(formatNumber).join(':')

  return ymd + ' ' + hms
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const tmp_rkey = 'released'
const tmp_okey = 'ordered'
const tmp_lrkey = 'last-released'
const tmp_lokey = 'last-ordered'
const usdt = { // user data
  getReleased() {
    return wx.getStorageSync(tmp_rkey) || undefined
  },
  getOrdered() {
    return wx.getStorageSync(tmp_okey) || undefined
  },
  getLastReleased() {
    return wx.getStorageSync(tmp_lrkey) || undefined
  },
  getLastOrdered() {
    return wx.getStorageSync(tmp_lokey) || undefined
  },
  getCandidates() {
    return []
  },
  release(info) {
    wx.setStorageSync(tmp_rkey, info)
    wx.setStorageSync(tmp_lrkey, info)
  },
  order(info) {
    wx.setStorageSync(tmp_okey, info)
    wx.setStorageSync(tmp_lokey, info)
  },
  cancelReleased() {
    wx.removeStorageSync(tmp_rkey)
  },
  cancelOrdered() {
    wx.removeStorageSync(tmp_okey)
  },
  completeReleased() {
    wx.removeStorageSync(tmp_rkey)
  },
  completeOrdered() {
    wx.removeStorageSync(tmp_okey)
  }
}

const _ = (id, cb) => {
  wx.createSelectorQuery().select('#' + id).boundingClientRect(cb).exec()
}

module.exports = {
  formatTime,
  usdt,
  _
}
