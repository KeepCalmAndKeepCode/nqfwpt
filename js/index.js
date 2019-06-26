/*//轮播
// layui.use('carousel', function () {
//   var carousel = layui.carousel;
//   //建造实例
//   carousel.render({
//     elem: '#test1',
//     width: "1140px",
//     height: "500px",
//     arrow: 'always' //始终显示箭头
//   });
// });
//滑块
var mySwiper = new Swiper('.swiper-container', {
  autoplay: true, //可选选项，自动滑动
  slidesPerView: 9,
  centeredSlides: true,
  observer: true,//修改swiper自己或子元素时，自动初始化swiper
  observeParents: true,//修改swiper的父元素时，自动初始化swiper
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})
//滑块2
var mySwiper1 = new Swiper('#swiper-container1', {
  autoplay: true, //可选选项，自动滑动
  centeredSlides: true,
  slidesPerView: 3,
  slidesPerColumn : 2,
  slidesPerColumnFill : 'column',
})

//注册弹出框
function regist(){
  layer.open({
    title:"注册",
    shadeClose:true,
    type: 2,
    content:'register.html',
    area:["700px","400px"]
  })
}
//登录弹出框
function login(){
  layer.open({
    title:"登录",
    type: 2,
    content:'login.html',
    shadeClose:true,
    area:["700px","400px"]
  })
}
//个人资料弹窗
function userInfo(){
  layer.open({
    title:"个人资料",
    type: 2,
    content:'userInfo.html',
    area:["700px","400px"]
  })
}
//退出登录
function exit(){
  layer.confirm('确定退出?', {icon: 3 }, function(index){
    window.localStorage.removeItem("userInfo");
    layer.close(index);
    window.location = "index.html";
  });
}
//注册模板数据
console.log(typeof(localStorage.getItem("userInfo")));
console.log(localStorage.getItem("userInfo"));

// var userData = (localStorage.getItem("userInfo") == "undefined" || localStorage.getItem("userInfo") == null) ? {} : JSON.parse(localStorage.getItem("userInfo"));
var userData = (localStorage.getItem("userInfo") == "undefined" || localStorage.getItem("userInfo") == null) ? {} : JSON.parse(localStorage.getItem("userInfo"));
layui.use('laytpl', function () {
  var laytpl = layui.laytpl;
  var getTpl = document.getElementById("loginRegist").innerHTML;
  var view = document.getElementById('view');
  
  laytpl(getTpl).render(userData, function (html) {
    view.innerHTML = html;
  });
}) */

//舆情预警弹窗
function yqyjfb(){
  layer.open({
    title:"舆情预警",
    type: 2,
    content:'yqyjfb.html',
    shadeClose:true,
    area:["700px","600px"]
  })
}
//土地流转发布弹窗
function issueTdlz(){
  var userData = (localStorage.getItem("userInfo") == "undefined" || localStorage.getItem("userInfo") == null) ? {} : JSON.parse(localStorage.getItem("userInfo"));
  
  if(!userData.user_id){
    layer.msg('请先登录'); 
    return
  };
  // layer.open({
  //   title:"土地流转发布",
  //   type: 2,
  //   content:'tdlzfb.html',
  //   shadeClose:true,
  //   area:["700px","750px"]
  // })
  window.open("./tdlzfb.html");
}
//土地流转查询弹窗
function queryTdlz(){
  // layer.open({
  //   title:"土地流转查询",
  //   type: 2,
  //   content:'tdlzcx.html',
  //   shadeClose:true,
  //   area:["700px","750px"]
  // })
  window.open("./tdlzQuery.html")
}

//发布品种弹窗
function fbpz(){
  layer.open({
    title:"发布品种",
    type:2,
    content:"./fbpz.html",
    shadeClose:true,
    area:["700px","750px"]
  })
}

//提问题弹窗
function ask(){
  layer.open({
    title:"提问题",
    type:2,
    shadeClose:true,
    content:"./ask.html",
    area:["700px","750px"]
  })
}