//index.js

const app = getApp()
const { _ } = require('../../utils/util')

Page({

  data: {
    isShameng: false,
    topHalf: 100,
    bottomHalf: 100
  },

  onLoad() {
    _('bg', ({width, height}) => {
      const topHalf = height / 2
      const bottomHalf = height - topHalf
      this.setData({ topHalf, bottomHalf })

      wx.request({
        url: 'https://www.gsegment.com/qxf/',
        success(res) {
          console.log(res)
        }
      })
    })
  },

  onShow() {
    
  },
  
  onHide() {

  }
})
