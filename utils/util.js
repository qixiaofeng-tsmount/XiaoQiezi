
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

const to = path => { wx.navigateTo({ url: path }) }

const gpsKey = 'gps-history'
const gps = toSave => {
  let gpsData = wx.getStorageSync(gpsKey) || []
  if (undefined === toSave ||
    undefined === toSave.lat ||
    undefined === toSave.lng) {
    return gpsData
  } else if (false === toSave) {
    wx.removeStorageSync(gpsKey)
  } else {
    for (let item of gpsData) {
      if (item[0] === toSave.lat && item[1] === toSave.lng) {
        return
      }
    }
    gpsData.push([toSave.lat, toSave.lng, Date.now()])
    wx.setStorageSync(gpsKey, gpsData)
  }
}

const collectionKey = 'collect-history'
const collection = indexToSave => {
  let clct = wx.getStorageSync(collectionKey) || []
  if (undefined === indexToSave ||
    undefined === indexToSave.emblemIndex ||
    undefined === indexToSave.locName) {
    return clct
  } else if (false === indexToSave) {
    wx.removeStorageSync(collectionKey)
  } else {
    clct.push([indexToSave.locName, indexToSave.emblemIndex, Date.now()])
    wx.setStorageSync(collectionKey, clct)
  }
}

const fixFloatLength = 5
const cutFloat = num => parseFloat(num.toFixed(fixFloatLength))

const _ = (id, cb) => {
  wx.createSelectorQuery().select('#' + id).boundingClientRect(cb).exec()
}

module.exports = {
  formatTime,
  to,
  gps,
  collection,
  cutFloat,
  _
}
