/*//注册弹出框
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
var userData = (localStorage.getItem("userInfo") == "undefined" || localStorage.getItem("userInfo") == null) ? {} : JSON.parse(localStorage.getItem("userInfo"));
layui.use('laytpl', function () {
  var laytpl = layui.laytpl;
  var getTpl = document.getElementById("loginRegist").innerHTML;
  var view = document.getElementById('view');
  
  laytpl(getTpl).render(userData, function (html) {
    view.innerHTML = html;
  });
})*/

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
  layer.open({
    title:"土地流转发布",
    type: 2,
    content:'tdlzfb.html',
    shadeClose:true,
    area:["700px","750px"]
  })
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