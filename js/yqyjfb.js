layui.use('form', function () {
  var form = layui.form;
  //各种基于事件的操作，下面会有进一步介绍
  form.on('submit(yqyjfb)', function (data) {
    var type = data.field.type;
    var content = data.field.content;
    var from = data.field.from;
    var keyword = data.field.keyword;
    var target = data.field.target;
    var raised_at = data.field.raised_at;
    if(type == "" || content == "" || from == "" || target == ""){
      layer.msg('请完善信息');
      return false
    }
    var index = layer.load(2, {time: 10*1000});
    $.post({
      url:"http://zs.sjznm.gov.cn:50047/index.php/api/alert/create",
      data:{
        type:type,
        content:content,
        from:from,
        keyword:keyword,
        target:target,
        raised_at:raised_at
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
  });
});