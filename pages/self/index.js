const API = require('../../request/index')
const APP = getApp()

Page({
  data: {
    userInfo: {},
  },
  onLoad() {
    this.getClubUser()
    console.log(this.data)
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