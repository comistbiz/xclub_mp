// pages/home_registration/index.js
import Dialog from '@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '1',
  },

  onChange(event) {
    this.setData({
      radio: event.detail,
    })
  },

  showDialog() {
    Dialog.alert({
      message: '提交成功，请前往购票页面缴费！',
    }).then(() => {
      // on close
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var tabbar = this.selectComponent("#tabbar")
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