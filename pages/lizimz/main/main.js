Page({
  data: {
    current: 0,
    list: [],
    popularActivity:[
      {
        storeId:1001,
        img:'/images/popular_activity1.jpg'
      },
      {
        storeId:1002,
        img:'/images/popular_activity2.jpg'
      },
      {
        storeId:1003,
        img:'/images/popular_activity3.jpg'
      },
      {
        storeId:1004,
        img:'/images/popular_activity4.jpg'
      },
      {
        storeId:1005,
        img:'/images/popular_activity5.jpg'
      },
      {
        storeId:1006,
        img:'/images/popular_activity6.jpg'
      },
      {
        storeId:1007,
        img:'/images/popular_activity7.jpg'
      },
      {
        storeId:1008,
        img:'/images/popular_activity8.jpg'
      },
      {
        storeId:1009,
        img:'/images/popular_activity9.jpg'
      },
      {
        storeId:1010,
        img:'/images/popular_activity10.jpg'
      }
    ],
    hotProduct:[],
    haiwaiProduct:[],
    faxianProduct:[],
    meizhuangProduct:[],
    muyingProduct:[],
    jiankangProduct:[],
    jiaju:[],
    fushiProduct:[],
    loadmoreHidden: true,
    swiper: {
      indicatorDots: false,
      autoplay: false,
      interval: 0,
      duration: 300
    },
    swiper2:{
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 300
    }
  },

  onLoad: function () {
    var that = this;
    wx.request({
      url: "http://bhb.b5m.com/api/korea?action=ActivityModuleFloor&floorCode=homefaxian&is_assoc=1&page=2",
      success: function (res) {
        that.setData({
          hotProduct: res.data.val.homefaxian.floorData.intoDataList
        });
      }
    });
    wx.request({
      url: 'http://bhb.b5m.com/api/korea?action=ActivityListFloor&activitySign=home_page_haiwai&is_assoc=1',
      success: function (res) {
        var objreshaiwai =  res.data.val.homehaiwaigoodslist_3.floorData.productList;
        objreshaiwai = objreshaiwai.concat(res.data.val.homehaiwaigoodslist_1.floorData.productList);
        objreshaiwai = objreshaiwai.concat(res.data.val.homehaiwaigoodslist_4.floorData.productList);
        objreshaiwai = objreshaiwai.concat(res.data.val.homehaiwaigoodslist_2.floorData.productList);
        that.setData({
          haiwaiProduct: objreshaiwai.concat(res.data.val.homehaiwaigoodslist_5.floorData.productList),
        });
      }
    });

    wx.request({
      url: 'http://bhb.b5m.com/api/korea?action=ActivityListFloor&activitySign=home_page_faxian&is_assoc=1',
      success: function (res) {
        that.setData({
          faxianProduct: res.data.val.homefaxian.floorData.intoDataList
        });
      }
    });
    wx.request({
      url: 'http://bhb.b5m.com/api/korea?action=ActivityListFloor&activitySign=home_page_meizhuang&is_assoc=1',
      success: function (res) {
        that.setData({
          meizhuangProduct:res.data.val.homemeizhuangnewlist.floorData.productList

        });
      }
    });
    wx.request({
      url: 'http://bhb.b5m.com/api/korea?action=ActivityListFloor&activitySign=home_page_muying&is_assoc=1',
      success: function (res) {
        that.setData({
          // muyingProduct:res.data.val.homemuyingnewlist.floorData.productList
          muyingProduct:res.data.val.homemuyingnewlist.floorData.productList.concat(res.data.val.homemuyingsalelist.floorData.productList)

        });
      }
    });

  },

  onShow: function( e ) {
   wx.getSystemInfo( {
     success: ( res ) => {
       this.setData( {
         windowHeight: res.windowHeight
       })
     }
   })
 },

 pullUpLoad: function() {
   console.log(1);
   var that = this;
   this.setData({
     loadmoreHidden: false
   });
   wx.request({
     url: "http://bhb.b5m.com/api/korea?action=ActivityModuleFloor&floorCode=homefaxian&is_assoc=1&page=2",
     success: function (res) {

       setInterval(function(){
         that.setData({
           hotProduct: that.data.hotProduct.concat(res.data.val.homefaxian.floorData.intoDataList),
           loadmoreHidden: true
         });
       },1500);
     }
   });
 },

  switchSlider: function (event) {
    this.setData({
      current: event.target.dataset.index
    });
    switchAjax(event.target.dataset.index,this);
  },

  changeSlider: function (event) {
    this.setData({
      current: event.detail.current
    });
    switchAjax(event.target.dataset.index,this);

  },
});


  function switchAjax(num,obj){
    switch(num){
      case "5":
      wx.request({
        url: 'http://bhb.b5m.com/api/korea?action=ActivityListFloor&activitySign=home_page_jiankang&is_assoc=1',
        success: function (res) {
          obj.setData({
            jiankangProduct:res.data.val.homejiankangsalelist.floorData.productList
          });
        }
      });
      break;
      case "6":
      wx.request({
        url: 'http://bhb.b5m.com/api/korea?action=ActivityListFloor&activitySign=home_page_jiaju&is_assoc=1',
        success: function (res) {
          obj.setData({
            jiajuProduct:res.data.val.homejiajusalelist.floorData.productList
          });
        }
      });
      break;
      case "7":
      wx.request({
        url: 'http://bhb.b5m.com/api/korea?action=ActivityListFloor&activitySign=home_page_fushi&is_assoc=1',
        success: function (res) {
          obj.setData({
            fushiProduct:res.data.val.homefushinewlist.floorData.intoDataList
          });
        }
      });
      break;
    }
  }
