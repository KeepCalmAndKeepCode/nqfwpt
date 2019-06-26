var picArr = [];
//获取作物列表
layer.load();
$.get({
  url:"http://zs.sjznm.gov.cn:50047/index.php/api/cropcatalog/query",
  success:function(res){
    layer.closeAll('loading');
    var zzwData = res.data.catalogs;

    layui.use('form', function(){
      for(var i = 0;i<zzwData.length;i++){
        $("#sszw").append("<option value='"  + zzwData[i].id +  "'>" + zzwData[i].cropname + "</option>")
        var form = layui.form;
        form.render();
      }
    });
  }
})

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

layui.use("form",function(){
  var form = layui.form;
  form.on('submit(fbpz)', function(data){
    var name = data.field.name;
    var photo = picArr.join(",");
    var cat_id = data.field.cat_name;
    var cat_name = $(".layui-unselect")[1].value;
    var approvalno = '';
    var breedunit = '';
    var source = '';
    var features = '';
    var yieldresults = '';
    var suitablearea = '';
    var vyear = '';
    var index = layer.load(2, {time: 10*1000});
    $.post({
      url:"http://zs.sjznm.gov.cn:50047/index.php/api/crop/create",
      data:{
        name:name,
        photo:photo,
        cat_id:cat_id,
        cat_name:cat_name,
        approvalno:approvalno,
        breedunit:breedunit,
        source:source,
        features:features,
        yieldresults:yieldresults,
        suitablearea:suitablearea,
        vyear:vyear
      },
      success:function(res){
        layer.close(index); 
        console.log(res);
        layer.msg(res.message); 
        
        setTimeout(function(){
          parent.layer.closeAll();
          window.parent.location.reload();
        },2000);
      }
    })
    return false;       //阻止表单跳转。如果需要表单跳转，去掉这段即可。
  })
})
// $("#uploadPic").change(function () {
//   $.ajaxFileUpload({
//     url: 'http://zs.sjznm.gov.cn:50047/index.php/api/attach/upload', //处理上传用的后台程序,可以是PHP,也可以是ASP等
//     secureuri: false, //异步
//     fileElementId: 'uploadPic', //上传控件ID
//     data:{

//     },
//     dataType: 'json', //返回的数据信息格式
//     success: function (data, status) {
//       
//       if (data.code == '10000') {
//         alert("上传成功");

//       } else {
//         alert("上传失败");
//       }
//     },
//     error: function (data, status, e) {
//       alert(e);
//     }
//   })
// })