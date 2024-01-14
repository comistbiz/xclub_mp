const CONF = require('../config')
const QCOS = require('./cos')
module.exports =
/******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
        /******/
      }
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
        /******/
      };
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
      /******/
    }
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
        /******/
      }
      /******/
    };
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function (exports) {
/******/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/
      }
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    };
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function (value, mode) {
/******/ 		if (mode & 1) value = __webpack_require__(value);
/******/ 		if (mode & 8) return value;
/******/ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
      /******/
    };
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
      /******/
    };
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
    /******/
  })
/************************************************************************/
([
  (function (module, exports, __webpack_require__) {
    "use strict";
    /* eslint-disable */
    // 小程序开发api接口工具包，https://github.com/gooking/wxapi
    var API_BASE_URL = CONF.api_base_url;
    var subDomain = '';

    var request = function request(url, needSubDomain, method, data) {
      var sessionid = wx.getStorageSync('token')
      var _url = API_BASE_URL + (needSubDomain ? '/' + subDomain : '') + url;
      var header = {
        'Content-Type': 'application/json',
        'Sessionid': sessionid
      };
      return new Promise(function (resolve, reject) {
        wx.request({
          url: _url,
          method: method,
          data: data,
          header: header,
          success: function success(request) {
            if (request.data.respcd === '2002') {
              authorize()
              wx.showModal({
                content: '登录状态失效，已经自动登录，请重新点击',
                success: () => {
                  resolve(request.data);
                }
              })
            } else if (request.data.respcd !== '0000') {
              console.log(request.data)
              wx.showModal({
                content: request.data.respmsg,
                showCancel: false,
                success: () => {
                  resolve(request.data);
                }
              })

            }
            resolve(request.data);
          },
          fail: function fail(error) {
            reject(error);
          },
          complete: function complete(aaa) {
            // 加载完成
          }
        });
      });
    };

    async function authorize() {
      return new Promise((resolve, reject) => {
        wx.login({
          success: function (res) {
            console.log(res.code)
            const code = res.code
            wx.request({
              url: API_BASE_URL + '/xclub/auth/login',
              method: 'post',
              data: { code: code },
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              success: function success(request) {
                console.log(request)
                if (request.data.respcd == "0000") {
                  wx.setStorageSync('token', request.data.data.token)
                  wx.setStorageSync('userid', request.data.data.userid)
                  resolve(request.data.data)
                } else {
                  wx.showToast({
                    title: res.msg,
                    icon: 'none'
                  })
                  reject(res.msg)
                }
              },
              fail: function fail(res) {
                console.log(res)
              },
            })
          },
          fail: err => {
            reject(err)
          }
        })
      })
    }

    module.exports = {
      authorize: authorize,
      init2: function init2(a, b) {
        API_BASE_URL = a;
        subDomain = b;
      },
      init: function init(b) {
        subDomain = b;
      },
      init3: function init3(_ref) {
        var _ref$apiBaseUrl = _ref.apiBaseUrl,
          apiBaseUrl = _ref$apiBaseUrl === undefined ? API_BASE_URL : _ref$apiBaseUrl,
          subD = _ref.subDomain,
          req = _ref.request;

        // 某些需求需要定制化 request，需要保证传入自定义 reuqest 与默认 request 参数一致
        if (req) {
          request = req;
        }
        API_BASE_URL = apiBaseUrl;
        subDomain = subD;
      },
      request: request,
      queryXclubData: function queryXclubData(data) {
        let namespace = data['namespace']
        return request('/' + namespace + '/dativer/query', false, 'post', data);
      },
      updateXclubData: function updateXclubData(data) {
        let namespace = data['namespace']
        return request('/' + namespace + '/dativer/update', false, 'post', data);
      },
      createXclubData: function createXclubData(data) {
        let namespace = data['namespace']
        return request('/' + namespace + '/dativer/create', false, 'post', data);
      },
      getTempSecret: function getTempSecret() {
        return request('/clouds/cos/secret', false, 'post');
      },
      uploadCOS: function uploadFile(tempFilePath) {

        return new Promise(function (resolve, reject) {
          // 如果传来的是正常文件连接，则直接返回
          if (!tempFilePath.startsWith('wxfile://tmp') && !tempFilePath.startsWith('http://tmp')) {
            resolve({'Location': tempFilePath})
          }
          // 设置一个文件名
          var fileName = '';
          if (tempFilePath.startsWith('wxfile://tmp')) {
            fileName = tempFilePath.split('_')[1]
          } else if (tempFilePath.startsWith('http://tmp')) {
            fileName = tempFilePath.split('/')[3]
          }
          QCOS.cos.uploadFile(
            {
              Bucket: 'resource-1302236613', /* 填写自己的 bucket，必须字段 */
              Region: 'ap-beijing',     /* 存储桶所在地域，必须字段 */
              Key: '/xclub/' + CONF.store_id + '/' + fileName,              /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */
              FilePath: tempFilePath, /* 上传文件路径，必须字段 */
              SliceSize: 1024 * 1024 * 5,     /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
              onProgress: function(progressData) {
                  console.log(JSON.stringify(progressData));
              }
            }, 
            function(err, data) {
              if (err) {
                reject(err)
              } else {
                console.log(data)
                data.Location = 'https://' + data.Location
                resolve(data)
              }
            }
          )
        }) 
      }
    };
  })
]);