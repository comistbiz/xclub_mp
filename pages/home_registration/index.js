// pages/home_registration/index.js
const API = require('../../request/index')
const util = require('../../utils/util')
import Dialog from '@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
    ],
    activity_time_range: { start: '2024-1-1', end: '2024-1-1' },
    userid: wx.getStorageSync('userid')
  },

  onChange(event) {
    // console.log(event)
    var arrayRadioValue = "array[" + event.currentTarget.id + "].radio"
    this.setData({
      [arrayRadioValue]: event.detail,
    })
  },

  showDialog() {
    Dialog.alert({
      message: '提交成功，请前往购票页面缴费！',
    }).then(() => {
      // on close
    });
  },

  async getActivities() {
    const activities = await API.queryXclubData({
      namespace: 'xclub',
      object: 'club_activity',
      field: ['id', 'title', 'content', 'activity_time'],
      rule: { 'btw.activity_time': [this.data.activity_time_range.start, this.data.activity_time_range.end] }
    })
    for (var i in activities.data) {
      activities.data[i].radio = 1
      activities.data[i].index = i;
    }
    console.log(activities)
    this.setData({ array: activities.data })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.selectComponent("#tabbar")
    this.getActivities()
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

  },

  async formSubmit(e) {
    console.log(this.data.array)
    var registered = []
    for (var i in this.data.array) {
      var item = this.data.array[i]
      if (item.radio == 1) {
        var obj = {
          activity_id: item.id,
          user_id: this.data.userid
        }
        registered.push(obj)
      }
    }
    console.log(registered)
    await API.createXclubData({
      namespace: 'xclub',
      object: 'club_activity_user',
      data: registered,
      setting: {}
    })
  }

})