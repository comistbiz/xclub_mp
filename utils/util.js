const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function timestampToDate(timestamp) {
  var date = new Date(timestamp);
  var year = date.getFullYear();
  var month = date.getMonth() + 1; // 月份是从0开始的
  var day = date.getDate();

  // 如果月份和日期小于10，在前面加上'0'
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  return year + '-' + month + '-' + day;
}

function getStoreID() {
  const store_id = wx.getStorageSync('store_id')
  if (store_id === undefined || store_id === null) {
    wx.showToast({
      title: '门店不存在',
      icon: 'none'
    })
    return null
  }
  return store_id
}

module.exports = {
  formatTime,
  getStoreID,
  timestampToDate
}

