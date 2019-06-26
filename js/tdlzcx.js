//查询土地流转
var data1;
layui.use('form', function () {
  var form = layui.form;
  form.on('submit(query)', function (data) {
    var index = layer.load(2, {time: 10*1000});

    var name = data.field.name;
    var area_code = data.field.area_code;
    var mianji = data.field.mianji;
    var min_mianji = data.field.min_mianji;
    var max_mianji = data.field.max_mianji;
    var type = data.field.type;
    var deal_type = data.field.deal_type;
    var status = data.field.status;
    var price = data.field.price;
    var min_price = data.field.min_price;
    var max_price = data.field.max_price;
    var expire = data.field.expire;
    var min_expire = data.field.min_expire;
    var max_expire = data.field.max_expire;
    $.get({
      url:"http://zs.sjznm.gov.cn:50047/index.php/api/land/query",
      data:{
        name:name,
        area_code:area_code,
        mianji:mianji,
        min_mianji:min_mianji,
        max_mianji:max_mianji,
        type:type,
        deal_type:deal_type,
        status:status,
        price:price,
        min_price:min_price,
        max_price:max_price,
        expire:expire,
        min_expire:min_expire,
        max_expire:max_expire
      },
      success:function(res){
        layer.close(index); 
        if(res.status == 0){
          if(res.data.lands.length == 0){
            layer.msg("暂无数据");
            return
          }

          layui.use("laytpl", function() {
            var laytpl = layui.laytpl;
            var tdlzCxTpl = document.getElementById("tdlzCxTpl").innerHTML;
            var tdlzCxTplCon = document.getElementById("tdlzCxTplCon");
            
            var lands = res.data.lands;
            data1 = lands;
            laytpl(tdlzCxTpl).render(data1, function (html) {
              tdlzCxTplCon.innerHTML = html;
            });
          })
          layer.open({
            type:1,
            area:["600px","650px"],
            content:$("#tdlzCxTplCon")
          })
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
