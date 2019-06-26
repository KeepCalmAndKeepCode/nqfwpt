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

//获取作物列表
layer.load();
$.get({
  url:"http://zs.sjznm.gov.cn:50047/index.php/api/cropcatalog/query",
  success:function(res){
    layer.closeAll('loading');
    var zzwData = res.data.catalogs;

    layui.use('form', function(){
      for(var i = 0;i<zzwData.length;i++){
        $("#crop").append("<option value='"  + zzwData[i].id +  "'>" + zzwData[i].cropname + "</option>")
        var form = layui.form;
        form.render();
      }
    });
  }
})

// 查询品种
$("#query").click(function(){
  
})