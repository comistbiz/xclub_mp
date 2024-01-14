// pages/publish/product-list.js
const API = require('../../request/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: null,
    product: [],
  },
  async getAllProduct() {
    const product = await API.queryXclubData({
      namespace: 'mchnt',
      object: 'product',
      field: ['id', 'name', 'price', 'loads.descr', 'image_url', 'state'],
      rule: {'mchnt_userid': 11},
    })
    this.setData({product: product.data})
  },
  editProduct(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/publish/product-edit?product_id=' + e.currentTarget.dataset.productid,
    })
  },
  async editProductState(e) {
    console.log(e)
    var state = e.currentTarget.dataset.state == 2 ? 1 : 2
    const res = await API.updateXclubData({
      namespace: 'mchnt',
      object: 'product',
      data: {'state': state},
      setting: {
        'by': {'id': e.currentTarget.dataset.productid}
      },
    })
    this.getAllProduct()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var userid = wx.getStorageSync('userid')
    this.setData({userid: userid})
    this.getAllProduct()
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