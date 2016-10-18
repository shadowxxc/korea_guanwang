Page({
  data: {
    current: 0,
    title: "",
    des:"",
    max:"",
    min:"",
    img:""
  },

  onLoad: function (options) {
    console.log(typeof options.min);
    var minPrice = parseFloat(options.min).toFixed(2);
    if(!options.max){
      var maxPrice = (minPrice*1.2).toFixed(2);
    }else{
      var maxPrice = parseFloat(options.max).toFixed(2);
    }
    console.log(minPrice+maxPrice);
    this.setData({
     title: options.title,
     des: options.des,
     max: maxPrice,
     min: minPrice,
     img: options.img
   });
  }

});
