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

var picArr = [];
layer.load();
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
var types,deal_types;
// 类型选项卡
$(".types>span").click(function () {
  $(".types>span").removeClass("choice");
  $(this).addClass("choice");
  types = $(".types .choice").text();
})
$(".deal_type>span").click(function () {
  $(".deal_type>span").removeClass("choice");
  $(this).addClass("choice");
  deal_types = $(".deal_type .choice").text();
})

//发布土地流转
layui.use('form', function () {
  var form = layui.form;
  var userData = (localStorage.getItem("userInfo") == "undefined" || localStorage.getItem("userInfo") == null) ? {} : JSON.parse(localStorage.getItem("userInfo"));
  //所有省的点击事件
  form.on('select(area_code1)',function(data){
    var cityId = $(".layui-this").attr("lay-value");
    getCitys(cityId);
  })
  
  form.on('submit(issue)', function (data) {
    var user_id = userData.user_id;           // 用户id
    var name = userData.user_name;            // 用户名
    var area = $(".layui-this")[1].innerText; // 所在区域
    var area_code = data.field.area_code;     // 所在区域代码
    var mianji = data.field.mianji;           // 土地面积（平方米）
    var price = data.field.price;             // 价格（元）
    var type = types;                         // 土地类型
    var deal_type = deal_types;               // 流转类型
    var expire = data.field.expire;           // 土地产权期限（年）
    var description = data.field.description; // 土地详情描述
    var thumbs = picArr.join(",");            // 土地的照片全路径
    var contact = data.field.contact;         // 联系方式
    // var status = data.field.status;           // 状态
    var index = layer.load(2, {time: 10*1000});
    
    $.post({
      url:"http://zs.sjznm.gov.cn:50047/index.php/api/land/create",
      data:{
        user_id:user_id,
        name:name,
        area:area,
        area_code:area_code,
        mianji:mianji,
        price:price,
        type:type,
        deal_type:deal_type,
        expire:expire,
        description:description,
        thumbs:thumbs,
        contact:contact
        // status:status
      },
      success:function(res){
        layer.close(index); 
        if(res.status == 0){
          layer.open({
            content:"发布成功"
          })
          setTimeout(function(){
            parent.layer.closeAll();
            window.parent.location.reload();
          },2000);
        }else{
          layer.open({
            content:res.message
          });
        }
      }
    })
    return false;       //阻止表单跳转。如果需要表单跳转，去掉这段即可。
  })
});
/* layui.use('form', function () {
//   var form = layui.form;
//   form.on('submit(formDemo)', function (data) {
//     console.log(data);
//     var user_id = userData.user_id;
//     var name = data.field.name;
//     var area = data.field.area;
//     var area_code = data.field.area;
//     var mianji = data.field.area;
//     var price = data.field.area;
//     var type = data.field.area;
//     var area = data.field.area;
//     var area = data.field.area;
//     var index = layer.load(2, {time: 10*1000});
//     $.post({
//       url:"http://zs.sjznm.gov.cn:50047/index.php/api/auth/login",
//       data:{
//         user_id:user_id,
//         name:name,
//         area:area,
//         area_code:area_code,
//         mianji:mianji,
//         price:price,
//         type:type,
//         deal_type:deal_type,
//         expire:expire,
//         description:description,
//         thumbs:thumbs,
//         contact:contact,
//         status:status
//       },
//       success:function(res){
//         console.log(res);
//         layer.close(index);
//         if(res.status == 0){
//           layer.open({
//             content:"登录成功"
//           })
//           var userInfo = JSON.stringify(res.data);
//           console.log(userInfo);
//           localStorage.setItem("userInfo",userInfo);
          
//           setTimeout(function(){
//             parent.layer.closeAll();
//             window.parent.location.reload();
//           },2000);
//         }else{
//           layer.open({
//             content:res.message
//           });
//         }
//       }
//     })
//     return false;       //阻止表单跳转。如果需要表单跳转，去掉这段即可。
//   });
// });*/