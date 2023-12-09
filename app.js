// app.js
const API = require('request/index')

App({
  onLaunch() {

    API.init2('https://bjcore01.vanshin.fun', 'diancan')
    // 获取配置
    API.queryConfigBatch('debug,product').then(res => {
      console.log(res)
      if (res.respcd == '0000') {
        console.log(res.data)
        res.data.forEach(config => {
          wx.setStorageSync(config.key, config.value);
        })
        
        if (this.configLoadOK) {
          this.configLoadOK()
        }
      }
    })

    // 登录
    API.authorize()
  },
  globalData: {
  }
})
