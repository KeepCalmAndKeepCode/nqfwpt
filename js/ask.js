/* //注册弹出框
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
}) */

layer.load();

//获取作物列表
layer.load();
$.get({
  url:"http://zs.sjznm.gov.cn:50047/index.php/api/cropcatalog/query",
  success:function(res){
    layer.closeAll('loading');
    var zzwData = res.data.catalogs;

    layui.use('form', function(){
      for(var i = 0;i<zzwData.length;i++){
        $("#zzwTplCon").append("<option value='"  + zzwData[i].id +  "'>" + zzwData[i].cropname + "</option>")
        var form = layui.form;
        form.render();
      }
    });
  } 
})

//获取所有省
$.get({
  url:"http://nest.156.site.veeteam.com/index.php/index/district/province",
  success:function(res){
    layer.closeAll('loading');
    layui.use('form', function(){
      for(var i = 0;i<res.data.length;i++){
        $("#province").append("<option value='"  + res.data[i].province_id +  "'>" + res.data[i].province_name + "</option>")
        var form = layui.form;
        form.render();
      }
    });
    getCitys(res.data[0].province_id);
  }
})

//获取省下所有市
function getCitys(cityId){
  layer.load();
  $.get({
    url:"http://nest.156.site.veeteam.com/index.php/index/district/city",
    data:{
      pid:cityId
    },
    success:function(res){
      layer.closeAll('loading');
      console.log(res);
      $("#city").html("");
      layui.use('form', function(){
        for(var i = 0;i<res.data.length;i++){
          $("#city").append("<option value='"  + res.data[i].city_id +  "'>" + res.data[i].city_name + "</option>")
          var form = layui.form;
          form.render();
        }
      });
    }
  })
}

//上传图片
layui.use('upload', function () {
  var upload = layui.upload;
  layer.load();
  //执行实例
  upload.render({
    elem: '#test1', //绑定元素
    method: 'POST',
    url: 'http://zs.sjznm.gov.cn:50047/index.php/api/attach/upload', //上传接口
    field: 'v_file_upload[]',
    multiple:true,
    before: function () {
      layer.load();
    },
    done: function (res) {
      layer.closeAll('loading');
      //上传完毕回调
      $("#picCon").append('<img src="'+ "http://zs.sjznm.gov.cn:50047" + res.data[0] +'" alt="" srcset="">')
      picArr.push(res.data[0]);
    },
    error: function () {
      //请求异常回调
    }
  });
});

//获取传参（专家ID）
