// pages/self/edit.js
const API = require('../../request/index')
const UTIL = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    min_date: new Date(1960, 1, 1).getTime(),
    userid: 0,
    show: false,
    realname: '',
    nickname: '', 
    phone_num: '', 
    address: '',
    birthday: '',
    birthday_display: '',
  },
  showPopup() {
    console.log(this.data.min_date)
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  onInput(event) {
    this.setData({
      birthday: event.detail,
      show: false,
      birthday_display: UTIL.timestampToDate(event.detail)
    })
    console.log(this.data)
  },
  async getUserData() {
    const res = await API.queryXclubData({
      namespace: 'ucus',
      object: 'auth_user',
      field: ['realname', 'nickname', 'phone_num', 'address', 'birthday'],
      rule: {'id': this.data.userid},
      setting: { one: true }
    })
    this.setData({
      realname: res.data.realname,
      nickname: res.data.nickname, 
      phone_num: res.data.phone_num, 
      address: res.data.address,
      birthday_display: res.data.birthday,
    })
    if (!res.data.birthday) {
      this.setData({birthday: new Date('1990-1-1').getTime()})
    } else {
      this.setData({birthday: new Date(res.data.birthday).getTime()})
    }
  },
  async bindSave() {
    const res = await API.updateXclubData({
      namespace: 'ucus',
      object: 'auth_user',
      data: {
        realname: this.data.realname,
        nickname: this.data.nickname, 
        phone_num: this.data.phone_num, 
        address: this.data.address,
        birthday: this.data.birthday_display
      },
      setting: { by: {"id": this.data.userid}}
    })
    console.log(res)
    if (res.respcd === '0000') {
      wx.showToast({
        title: '修改成功',
        icon: 'none',
        success: function(res) {
          wx.reLaunch({
            url: '/pages/self/index',
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({userid: options.userid}) 
    console.log('this')
    this.getUserData()
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