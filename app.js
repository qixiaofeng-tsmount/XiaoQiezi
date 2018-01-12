//app.js

const logLoginTime = () => {
  var logs = wx.getStorageSync('logs') || []
  logs.unshift(Date.now())
  wx.setStorageSync('logs', logs)
}

App({

  onLaunch() {
    logLoginTime()
  },
  
  globalData: {}
})
