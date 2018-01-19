// pages/order/order.js

const { usdt } = require('../../utils/util')
const { addresses, possibleSeats } = usdt

Page({
  
  data: {
    addresses, possibleSeats,
    selectedRoute: [0, 1],
    time: '09:00',
    needSeats: 1
  },
  
  changeSeats({ detail:{ value } }) {
    this.setData({ needSeats:possibleSeats[value] })
  }
})
