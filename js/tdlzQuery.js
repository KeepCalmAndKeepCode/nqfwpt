/*//注册弹出框
function regist() {
  layer.open({
    title: "注册",
    shadeClose: false,
    type: 2,
    content: 'register.html',
    area: ["700px", "400px"]
  })
}
//登录弹出框
function login() {
  layer.open({
    title: "登录",
    type: 2,
    content: 'login.html',
    shadeClose: true,
    area: ["700px", "400px"]
  })
}
//个人资料弹窗
function userInfo() {
  layer.open({
    title: "个人资料",
    type: 2,
    shadeClose: true,
    content: 'userInfo.html',
    area: ["700px", "400px"]
  })
}
//退出登录
function exit() {
  layer.confirm('确定退出?', {
    icon: 3
  }, function (index) {
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


var area_code, mianji, min_mianji, max_mianji, types, deal_type, expire, min_expire, max_expire;

layui.use('form', function () {
  var form = layui.form;
  form.on('select(area_code1)', function (data) {
    var province = $(".layui-this")[0].attributes[0].value;
    // 全国
    if ($(".layui-this")[1] != undefined) {
      area_code = $(".layui-this")[1].attributes[0].value;
    }
    getCitys(province);
  })
  form.on('select(area_code)', function (data) {
    area_code = $(".layui-this")[1].attributes[0].value;
  })
  return false;
})
//获取所有省
$.get({
  url: "http://nest.156.site.veeteam.com/index.php/index/district/province",
  success: function (res) {
    res.data.unshift({
      province_id: false,
      province_name: "全国"
    });
    layui.use('form', function () {
      for (var i = 0; i < res.data.length; i++) {
        $("#province").append("<option value='" + res.data[i].province_id + "'>" + res.data[i].province_name + "</option>")
        var form = layui.form;
        form.render();
      }
    });
    getCitys(res.data[0].province_id);
  }
})

//获取省下所有市
function getCitys(province) {
  layer.load();
  $.get({
    url: "http://nest.156.site.veeteam.com/index.php/index/district/city",
    data: {
      pid: province
    },
    success: function (res) {
      layer.closeAll('loading');
      layui.use('form', function () {
        $("#askCity").html("");
        var form = layui.form;
        form.render();
      });
      layui.use('form', function () {
        for (var i = 0; i < res.data.length; i++) {
          $("#askCity").append("<option value='" + res.data[i].city_id + "'>" + res.data[i].city_name + "</option>");
          var form = layui.form;
          form.render();
        }
      });
      
      if ($(".layui-this")[1] != undefined) {
        area_code = $(".layui-this")[1].attributes[0].value;
      }else{
        area_code = '';
      }
    }
  })
}

$(".mianji>span").click(function () {
  $(".mianji>span").removeClass("choice");
  $(this).addClass("choice");
})
$(".types>span").click(function () {
  $(".types>span").removeClass("choice");
  $(this).addClass("choice");
})
$(".deal_type>span").click(function () {
  $(".deal_type>span").removeClass("choice");
  $(this).addClass("choice");
})
$(".years>span").click(function () {
  $(".years>span").removeClass("choice");
  $(this).addClass("choice");
})

function getDealInfo() {
  if (area_code == undefined) {
    area_code = "";
  }

  mianji = $(".mianji .choice").attr("value");
  min_mianji = mianji.split(",")[0];
  max_mianji = mianji.split(",")[1];

  types = $(".types .choice").text();
  if (types == "全部") {
    types = "";
  }
  
  deal_type = $(".deal_type .choice").text();
  if(deal_type == "全部"){
    deal_type = '';
  }
  expire = $(".years .choice").attr("value");
  min_expire = expire.split(",")[0];
  max_expire = expire.split(",")[1];

  layer.load();
  $.get({
    url: "http://zs.sjznm.gov.cn:50047/index.php/api/land/query",
    data: {
      area_code,
      min_mianji,
      max_mianji,
      type: types,
      deal_type,
      min_expire,
      max_expire
    },
    success: function (res) {
      layer.closeAll('loading');
      layui.use("laytpl", function() {
        var laytpl = layui.laytpl;
        var rowsTpl = document.getElementById("rowsTpl").innerHTML;
        var rowsTplCon = document.getElementById("rowsTplCon");
        
        rowsData = res.data.lands;
        
        laytpl(rowsTpl).render(rowsData, function (html) {
          rowsTplCon.innerHTML = html;
        });
      })
    }
  })
}