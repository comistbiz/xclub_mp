// pages/home_registration/index.js
import Dialog from '@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      { id: 0, title: "协同跑步活动", note: "备注：周六下午4点", radio: '1' },
      { id: 1, title: "手姐的粉红网左黑历史", note: "备注：周六下午2点", radio: '1' }
    ]
  },

  onChange(event) {
    console.log(event)
    var arrayRadioValue = "array[" + event.currentTarget.id + "].radio"
    this.setData({
      [arrayRadioValue]: event.detail,
    })
    console.log(this.data.array)
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

  },

  formSubmit(e) {
    console.log(this.data.array)
  }

})