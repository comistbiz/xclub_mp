Component({
  data: {
    active: 0,
    list: [
      {
        icon: "home-o",
        url: "/pages/home/index",
        text: "首页",
        index: 0
      },
      {
        icon: "clock-o",
        url: "/pages/timeline/index",
        text: "时间线",
        index: 1
      },
      {
        icon: "bill-o",
        url: "/pages/publish/index",
        text: "公示",
        index: 2
      },
      {
        icon: "user-o",
        url: "/pages/self/index",
        text: "我的",
        index: 3
      }
    ]
  },

  methods: {
    onChange(event) {
      this.setData({ active: event.detail });
      wx.switchTab({
        url: this.data.list[event.detail].url
      });
    },

    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(item => item.url === `/${page.route}`)
      });
    }
  }
});