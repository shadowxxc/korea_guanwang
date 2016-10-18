Page({
  data: {
    current: 0,
    list: [],
    count:1,
    loadmoreHidden:true,
    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    name: '此时此刻',
    author:'许巍',
    poster: 'http://r1.ykimg.com/050E0000576B75F667BC3C136B06E4E7',
    action:{}
  },

  onLoad: function () {
    var that = this;
    wx.request({
      url: "http://bhb.b5m.com/api/comment?action=showCommmentChoicenessList&start=0&limit=15",
      success: function (res) {
        var ans = res.data.data.list;
        for(var i=0;i<ans.length;i++){
          var a = ans[i].images.split(':"')[1].split('"}')[0];
          ans[i].images = a;
        }
        that.setData({
          list: ans
        });
      }
    });
    that.setData({
      //"action.method":'play'
      action: {
        method: 'play'
      }
    });
    console.log(this);
  },


    onShow: function( e ) {
     wx.getSystemInfo( {
       success: ( res ) => {
         this.setData( {
           windowHeight: res.windowHeight,
           action: {
             method: 'play'
           }
         })
       }
     })
   },
   onHide:function(){
     this.setData({
       //"action.method":'play'
       action: {
         method: 'pause'
       }
     });
   },
   pullUpLoad: function() {
     console.log(1);
     var that = this;
     this.setData({
       loadmoreHidden: false
     });
     wx.request({
       url: "http://bhb.b5m.com/api/comment?action=showCommmentChoicenessList&start="+((that.data.count)*15)+"&limit=15",
       success: function (res) {
         var ans = res.data.data.list;
         for(var i=0;i<ans.length;i++){
           var a = ans[i].images.split(':"')[1].split('"}')[0];
           ans[i].images = a;
         }
         setInterval(function(){
           that.setData({
             list: that.data.list.concat(ans),
             loadmoreHidden: true,
             count:++(that.data.count)
           });
         },1500);
       }
     });
   }
});
