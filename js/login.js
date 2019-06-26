layui.use('form', function () {
  var form = layui.form;
  form.on('submit(formDemo)', function (data) {
    var user_name = data.field.name;
    var password = data.field.pass;
    var index = layer.load(2, {time: 10*1000});
    $.post({
      url:"http://zs.sjznm.gov.cn:50047/index.php/api/auth/login",
      data:{
        password:password,
        user_name:user_name,
      },
      success:function(res){
        layer.close(index);
        if(res.status == 0){
          layer.open({
            content:"登录成功"
          })
          var userInfo = JSON.stringify(res.data);
          localStorage.setItem("userInfo",userInfo);
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
  });
});