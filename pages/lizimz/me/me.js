Page({
  data: {
    current: 0,
    list: [],
    swiper: {
      indicatorDots: false,
      autoplay: false,
      interval: 0,
      duration: 300
    }
  },

  onLoad: function () {

  },

  switchSlider: function (event) {
    this.setData({
      current: event.target.dataset.index
    })
  },

  changeSlider: function (event) {
    this.setData({
      current: event.detail.current
    });
  }
});
