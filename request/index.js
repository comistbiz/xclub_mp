const CONF = require('../config')
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
          uploadFile: function uploadFile(tempFilePath, storeId) {

            console.log(tempFilePath)
            if (!tempFilePath.startsWith('wxfile://tmp') && !tempFilePath.startsWith('http://tmp')) {
              return tempFilePath
            }

            var uploadUrl = API_BASE_URL + '/file/upload';
            return new Promise(function (resolve, reject) {
              console.log(storeId)
              let filename = '';
              if (tempFilePath.startsWith('wxfile://tmp')) {
                filename = tempFilePath.split('_')[1]
              } else if (tempFilePath.startsWith('http://tmp')) {
                filename = tempFilePath.split('/')[3]
              }
              console.log(filename)


              wx.uploadFile({
                url: uploadUrl,
                filePath: tempFilePath,
                name: 'upfile',
                formData: {
                  'project': 'diancan',
                  'path': storeId,
                  'file_name': filename
                },
                success: function success(res) {
                  const ret = JSON.parse(res.data);
                  if (ret.respcd === '0000') {
                    resolve(ret.data.down)
                  } else {
                    reject(ret.respmsg);
                  }
                },
                fail: function fail(error) {
                  console.log(error)
                  reject(error);
                },
                complete: function complete(aaa) {
                  // 加载完成
                }
              });
            });
          }
        };
      })
    ]);