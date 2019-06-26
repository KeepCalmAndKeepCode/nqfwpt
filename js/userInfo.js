//获取用户信息
var userData = (localStorage.getItem("userInfo") == "undefined" || localStorage.getItem("userInfo") == null) ? {} : JSON.parse(localStorage.getItem("userInfo"));
var index = layer.load(2, {time: 10*1000});

$.get({
  url:"http://zs.sjznm.gov.cn:50047/index.php/api/user/query",
  data:{
    user_id:userData.user_id
  },
  datatype:"JSONP",
  success:function(res){
    layer.close(index);
    console.log(res);
    var userData = res.data.users[0];
    $("#user_name").val(userData.user_name);
    $("#phone").val(userData.phone);
    (userData.user_type == 0) ? $("#userType").html("普通用户") : $("#userType").html("专家");
    $("#picCon").append('<img src="'+ "http://zs.sjznm.gov.cn:50047" + userData.avatar  +'" alt="" srcset="">');
    $("#name").val(userData.real_name);
    $("#email").val(userData.email);
    $("#description").val(userData.description);
    $("#tag").val(userData.tag);
    $("#qq").val(userData.qq);
    $("#wechat").val(userData.wechat);
    $("#picCon1").append('<img src="'+ "http://zs.sjznm.gov.cn:50047" + userData.wechat_qrcode  +'" alt="" srcset="">');
  }
})

var avatar;
//上传图片（头像）
layui.use('upload', function () {
  var upload = layui.upload;
  //执行实例
  upload.render({
    elem: '#test1', //绑定元素
    method: 'POST',
    url: 'http://zs.sjznm.gov.cn:50047/index.php/api/attach/upload', //上传接口
    field: 'v_file_upload[]',
    multiple:false,
    before: function () {
      layer.load();
    },
    done: function (res) {
      layer.closeAll('loading');
      //上传完毕回调
      avatar = res.data[0];
      $("#picCon").html('<img src="'+ "http://zs.sjznm.gov.cn:50047" + avatar +'" alt="" srcset="">')
    },
    error: function () {
      //请求异常回调
    }
  });
});

var wechat_qrcode;
//上传图片（二维码）
layui.use('upload', function () {
  var upload = layui.upload;
  //执行实例
  upload.render({
    elem: '#test2', //绑定元素
    method: 'POST',
    url: 'http://zs.sjznm.gov.cn:50047/index.php/api/attach/upload', //上传接口
    field: 'v_file_upload[]',
    multiple:false,
    before: function () {
      layer.load();
    },
    done: function (res) {
      layer.closeAll('loading');
      //上传完毕回调
      wechat_qrcode =  res.data[0] ;
      $("#picCon1").html('<img src="'+ "http://zs.sjznm.gov.cn:50047" + wechat_qrcode  +'" alt="" srcset="">')
    },
    error: function () {
      //请求异常回调
    }
  });
});

//提交修改
layui.use('form', function () {
  var userData = (localStorage.getItem("userInfo") == "undefined" || localStorage.getItem("userInfo") == null) ? {} : JSON.parse(localStorage.getItem("userInfo"));
  var form = layui.form;
  form.on('submit(formDemo)', function (data) {
    var user_id = userData.user_id;
    var name =  data.field.name;
    var phone = data.field.phone;
    var type =  data.field.user_type;
    var real_name = data.field.real_name;
    var email = data.field.email;
    var description = data.field.description;
    var qq = data.field.qq;
    var tag = data.field.tag;
    var wechat = data.field.wechat;

    var index = layer.load(2, {time: 10*1000});
    
    $.post({
      url:"http://zs.sjznm.gov.cn:50047/index.php/api/user/update",
      data:{
        user_id:user_id,
        type:type,
        name:name,
        phone:phone,
        real_name,
        email,
        avatar,
        description,
        qq,
        tag,
        wechat,
        wechat_qrcode
      },
      success:function(res){
        layer.close(index); 
        if(res.status == 0){
          layer.open({
            content:"修改成功"
          })
          $.get({
            url:"http://zs.sjznm.gov.cn:50047/index.php/api/user/query",
            data:{
              user_id:user_id
            },
            success:function(res){
              var userData1 = JSON.stringify(res.data.users[0]);
              localStorage.setItem("userInfo",userData1);
              // setTimeout(function(){
              //   parent.layer.closeAll();
              //   window.parent.location.reload();
              // },2000);
            }
          })
          // setTimeout(function(){
          //   parent.layer.closeAll();
          //   window.parent.location.reload();
          // },2000);
        }else{
          layer.open({
            content:res.message
          });
        }
      }
    })
    return false;       //阻止表单跳转。如果需要表单跳转，去掉这段即可。
  });
});