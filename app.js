// app.js
const API = require('request/index')

App({
  onLaunch() {

    // API.init2('https://api.comistxs.com', 'xclub')
    API.init2('http://172.16.1.179:8000', 'xclub')
    // 获取配置
    // this.configLoadOK()
    // API.queryConfigBatch('debug,product').then(res => {
    //   console.log(res)
    //   if (res.respcd == '0000') {
    //     console.log(res.data)
    //     res.data.forEach(config => {
    //       wx.setStorageSync(config.key, config.value);
    //     })
        
    //     if (this.configLoadOK) {
    //       this.configLoadOK()
    //     }
    //   }
    // })

    // 登录
    API.authorize()
  },
  globalData: {
  }
})
