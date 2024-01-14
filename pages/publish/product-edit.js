// pages/publish/product-edit.js
const API = require('../../request/index')
const CONF = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_id: null,
    name: '',
    price: null,
    content: '',
    price_part: '',
    images: [],

  },

  async editProduct() {
    const res = await API.updateXclubData({
      namespace: 'mchnt',
      object: 'product',
      data: {
        'product_name': this.data.product_name,
        'price': this.data.price,
        'content': this.data.content,
        'price_part': this.data.price_part,
        'image_url': this.data.image_url
      },
      setting: {
        'by': {'id': this.data.product_id},
      },
      rule: {"userid": userid },
    })
  },

  async getProdut() {
    if (this.data.product_id === 'undefined')  {
      console.log(this.data.product_id)
      return
    }
    const product = await API.queryXclubData({
      namespace: 'mchnt',
      object: 'product',
      field: ['name', 'price', 'loads.descr', 'image_url'],
      setting: {
        'one': true,
      },
      rule: {"id": this.data.product_id },
    })
    console.log(product.data)
    this.setData({
      name: product.data.name,
      price: product.data.price,
      price_part: product.data.descr.price_part,
      content: product.data.descr.content,
      images: [{'url': product.data.image_url}],
    })
  },
  async bindSave() {
    if (this.data.images.length <= 0) {
      wx.showToast({
        title: '请设置图片',
        icon: 'none',
      })
      return
    }
    if (!this.data.name) {
      wx.showToast({
        title: '请填写活动票名称',
        icon: 'none',
      })
      return
    }
    if (!this.data.content) {
      wx.showToast({
        title: '请设置活动内容组成',
        icon: 'none',
      })
      return
    }
    if (!this.data.price_part) {
      wx.showToast({
        title: '请设置活动价格组成',
        icon: 'none',
      })
      return
    }
    if (!this.data.price || this.data.price <= 0) {
      wx.showToast({
        title: '请填写正确价格',
        icon: 'none',
      })
      return
    }
    var descr = JSON.stringify({
      'price_part': this.data.price_part,
      'content': this.data.content,
    })
    console.log(this.data.images)
    const image_data = await API.uploadCOS(
      this.data.images[0].url, 
    )
    if (this.data.product_id == 'undefined') {
      await API.createXclubData({
        namespace: 'mchnt',
        object: 'product',
        data: {
          name: this.data.name,
          price: this.data.price,
          image_url: image_data.Location,
          descr: descr,
          mchnt_userid: 11,
          store_id: CONF.store_id,
          category_id: 1,
        },
      })
    } else {
      await API.updateXclubData({
        namespace: 'mchnt',
        object: 'product',
        data: {
          name: this.data.name,
          price: this.data.price,
          image_url: image_data.Location,
          descr: descr,
          mchnt_userid: 11,
          store_id: CONF.store_id,
          category_id: 1,
        },
        setting: {'by': {'id': this.data.product_id}}
      })

    }
    wx.navigateTo({
      url: '/pages/publish/product-list',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({product_id: options.product_id})
    console.log(options)
    this.getProdut()
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

  afterPicRead(e) {
    let picsList = this.data.images
    if (!picsList) {
      picsList = []
    }
    picsList = picsList.concat(e.detail.file)
    this.setData({
      images: picsList 
    })
  },

  afterPicDel(e) {
    let picsList = this.data.images
    picsList.splice(e.detail.index, 1)
    this.setData({
      images: picsList 
    })
  }
})