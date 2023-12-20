// pages/home_pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{
      id: "0",
      price: "2.00",
      desc: "地租 餐饮 畅饮",
      title: "一日畅玩",
      thumb: "/static/logo_small.png",
      num: 0
    },
    {
      id: "1",
      price: "4.00",
      desc: "游玩",
      title: "一日畅玩",
      thumb: "/static/logo_small.png",
      num: 0
    }
    ],
    totalPrice: 0
  },

  add(e) {
    var itemId = e.currentTarget.id
    var currNum = this.data.array[itemId].num
    var index = "array[" + itemId + "].num"
    var newNum = currNum + 1
    this.setData({
      [index]: newNum
    })
    this.calTotal()
  },

  delete(e) {
    var itemId = e.currentTarget.id
    var currNum = this.data.array[itemId].num
    var index = "array[" + itemId + "].num"
    var newNum = currNum - 1 < 0 ? 0 : currNum - 1
    this.setData({
      [index]: newNum
    })
    this.calTotal()
  },

  calTotal() {
    var totalP = 0
    this.data.array.forEach(element => {
      totalP += Number(element.price) * element.num * 100
    });
    this.setData({
      totalPrice: totalP
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var tabbar = this.selectComponent("#tabbar")
  },

  onSumbit(event) {
    console.log(this.data.totalPrice)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})