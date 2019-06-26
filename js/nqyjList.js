/*//注册弹出框
function regist(){
  layer.open({
    title:"注册",
    shadeClose:false,
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
    shadeClose:true,
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

//获取当前时间
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
if (month < 10) {
  month = "0" + month;
}
if (day < 10) {
  day = "0" + day;
}
var nowDate = year + "-" + month + "-" + day;
var ParameterJson = '[{"paramName":"publishTime","paramValue":"' + nowDate + '","Operation":"LessThan","Logic":"AND"},{"paramName":"isUp","paramValue":"1","Operation":"Equal","Logic":"AND"}]';

var page = 1;
layer.load();
$.ajax({
  type: "POST",
  url: "http://yn.zq.yn15.com/ExpertTec/tp_warningcontent/GridPageJsonS",
  data: {
    Key: "KEY69B5B31F-8355-4234-B9C6-B6AA1EF92EA7",
    UserId: "c24400eb-8c8c-42c0-baa0-0621f51bcb9d",
    page: 1,
    rows: 9,
    columns: "id,publishTime,title,url,isup",
    sidx: "publishTime",
    sord: "desc",
    ParameterJson: ParameterJson
  },
  dataType: "JSONP",
  success: function (res) {
    layer.closeAll('loading');
    console.log(res);
    if (res.rows.length == 0) {
      layer.msg("暂无数据");
      return
    }
    layui.use("laytpl", function () {
      var laytpl = layui.laytpl;
      var yjxxTpl = document.getElementById("yjxx2Tpl").innerHTML;
      var yjxxTplCon = document.getElementById("yjxx2TplCon");

      yjxxData = res.rows;

      laytpl(yjxxTpl).render(yjxxData, function (html) {
        yjxxTplCon.innerHTML = html;
      });
    })
  }
})


function loadMore() {
  layer.load();
  page++
  $.ajax({
    type: "POST",
    url: "http://yn.zq.yn15.com/ExpertTec/tp_warningcontent/GridPageJsonS",
    data: {
      Key: "KEY69B5B31F-8355-4234-B9C6-B6AA1EF92EA7",
      UserId: "c24400eb-8c8c-42c0-baa0-0621f51bcb9d",
      page: page,
      rows: 9,
      columns: "id,publishTime,title,url,isup",
      sidx: "publishTime",
      sord: "desc",
      ParameterJson: ParameterJson
    },
    dataType: "JSONP",
    success: function (res) {
      layer.closeAll('loading');
      console.log(res);
      if (res.rows.length == 0) {
        layer.msg("暂无数据");
        return
      }
      for (var i = 0; i < res.rows.length; i++) {
        yjxxData.push(res.rows[i]);
      }

      layui.use("laytpl", function () {
        var laytpl = layui.laytpl;
        var yjxxTpl = document.getElementById("yjxx2Tpl1").innerHTML;
        var yjxxTplCon = document.getElementById("yjxx2TplCon");

        laytpl(yjxxTpl).render(yjxxData, function (html) {
          yjxxTplCon.innerHTML = html;
        });
      })
    }
  })
}