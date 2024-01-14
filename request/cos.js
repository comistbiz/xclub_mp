const CONF = require('../config')
const COS = require('cos-wx-sdk-v5.js')

const cos = new COS({
  SimpleUploadMethod: 'putObject', // 强烈建议，高级上传、批量上传内部对小文件做简单上传时使用 putObject,SDK 版本至少需要v1.3.0
  // 必选参数
  getAuthorization: function (options, callback) {
      wx.request({
          url: CONF.api_base_url + '/clouds/cos/secret',
          data: {},
          success: function (result) {
              const data = result.data.data;
              const credentials = data && data.credentials;
              if (!data || !credentials) return console.error('credentials invalid');
              callback({
                  TmpSecretId: credentials.tmpSecretId,
                  TmpSecretKey: credentials.tmpSecretKey,
                  // v1.2.0之前版本的 SDK 使用 XCosSecurityToken 而不是 SecurityToken
                  SecurityToken: credentials.sessionToken,
                  // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                  StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
                  ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
              });
          }
      });
  }
});

module.exports = { cos }