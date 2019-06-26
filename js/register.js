layui.use('form', function () {
  var form = layui.form;
  //各种基于事件的操作，下面会有进一步介绍
  form.on('submit(formDemo)', function (data) {
    var name = data.field.name;
    var pass = data.field.pass;
    var phone = data.field.phone;
    var type = data.field.type;
    
    var index = layer.load(2, {time: 10*1000});
    $.post({
      url:"http://zs.sjznm.gov.cn:50047/index.php/api/user/create",
      data:{
        type:type,
        pass:pass,
        name:name,
        phone:phone
      },
      success:function(res){
        layer.close(index); 
        
        if(res.status == 0){
          layer.open({
            content:"注册成功"
          })
          // 查询用户信息
          $.get({
            url:"http://zs.sjznm.gov.cn:50047/index.php/api/user/query",
            data:{
              user_id:res.data.user_id
            },
            success:function(res){
              console.log(res);
              
              var userInfo = JSON.stringify(res.data.users[0]);
              localStorage.setItem("userInfo",userInfo);
              setTimeout(function(){
                parent.layer.closeAll();
                window.parent.location.reload();
              },2000);
            }
          })
          // var userInfo = JSON.stringify(data.field);
          // localStorage.setItem("userInfo",userInfo);
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