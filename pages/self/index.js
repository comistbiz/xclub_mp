const API = require('../../request/index')
const APP = getApp()

Page({
  data: {
    userInfo: {},
    user_badges: [],
    t1: "te22st",
    t2: "tes3232t",
  },
  onLoad() {
    this.getClubUser()
    this.getUserBadge()
    this.getUserProduct()
  },
  onShow() {
    this.getTabBar().init()
  },
  editInfo() {
    var userid = wx.getStorageSync('userid')
    wx.navigateTo({
      url: '/pages/self/edit?userid=' + userid,
    })
    console.log('1')
  },
  async getUserBadge() {
    var userid = wx.getStorageSync('userid')
    const badges = await API.queryXclubData({
      namespace: 'xclub',
      object: 'user_badge',
      field: ['badge__url', 'badge__name', 'id'],
      rule: { "userid": userid },
    })
    this.setData({user_badges: badges.data})
    console.log(this.data)
  },
  async getUserProduct() {
    var userid = wx.getStorageSync('userid')
    const user_products = await API.queryXclubData({
      namespace: 'xclub',
      object: 'user_product',
      field: ['id', 'userid', 'product_id'],
      setting: {
        'after': ['map_product'],
      },
      rule: {"userid": userid },
    })
    this.setData({user_products: user_products.data})
    console.log(this.data)
  },
  async getClubUser() {
    var userid = wx.getStorageSync('userid')
    const user = await API.queryXclubData({
      namespace: 'ucus',
      object: 'auth_user',
      field: ['nickname', 'avatar'],
      rule: { "id": userid },
      setting: { one: true }
    })
    const club_user = await API.queryXclubData({
      namespace: 'xclub',
      object: 'club_user',
      field: ['role'],
      rule: { "userid": userid },
      setting: { 
        one: true,
        after: ["map_data"]
      }
    })
    user.data.role = club_user.data.role
    user.data.role_name = club_user.data.role_name
    this.setData({ userInfo: user.data })
  },
})