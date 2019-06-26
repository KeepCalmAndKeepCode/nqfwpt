0// var urls = "http://zs.sjznm.gov.cn:50047/index.php/api";
var siteUrl = "http://nest.156.site.veeteam.com/index.php/index";
var urls = "http://zs.sjznm.gov.cn:50047/index.php/api";

var picArr = [];

//获取当前时间
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
if (month < 10) {
    month = "0" + month;
}
if (day < 10) {
    day = "0" + day;
}
var nowDate = year + "-" + month + "-" + day;

// 获取当前城市
// $.ajax({
//   type:"get",
//   url:"http://ip-api.com/json",
//   // url:"http://pv.sohu.com/cityjson?ie=utf-8",
//   dataType:"JSONP",
//   success:function(res){
//     var city = res.city;
//     getCity(city);
//   }
// })

// function getCity(cityName){

  /*$.get({
    url:siteUrl + "/district/city",
    // data:{
    //   name:cityName
    // },
    success:function(res){
      // var city = res.data[0].city_name;
      var cityCode = res.data[0].city_id;
      // $("#city").html(city);
      // getWeather(city);
      // getLandList(cityCode);
    }
  })*/
// }
// 获取当前天气
// function getWeather(city){
//   $.ajax({
//     type:"get",
//     url:siteUrl + "/weather/now",
//     data:{
//       city:city
//     },
//     success:function(res){
//       if(res.status == 0){
//         layui.use("laytpl", function() {
//           var laytpl = layui.laytpl;
//           var weatherTpl = document.getElementById("weather").innerHTML;
//           var weatherTplCon = document.getElementById("weatherTplCon");
          
//           weatherData = res.data.weather;
//           laytpl(weatherTpl).render(weatherData, function (html) {
//             weatherTplCon.innerHTML = html;
//           });
//         })
//       }
//     }
//   })
// }

// 预警信息查询
var ParameterJson = '[{"paramName":"publishTime","paramValue":"'+ nowDate +'","Operation":"LessThan","Logic":"AND"},{"paramName":"isUp","paramValue":"1","Operation":"Equal","Logic":"AND"}]';

$.ajax({
  type: "POST",
  url: "http://yn.zq.yn15.com/ExpertTec/tp_warningcontent/GridPageJsonS",
  data:{
    Key:"KEY69B5B31F-8355-4234-B9C6-B6AA1EF92EA7",
    UserId:"c24400eb-8c8c-42c0-baa0-0621f51bcb9d",
    page:1,
    rows:9,
    columns:"id,publishTime,title,url,isup",
    sidx:"publishTime",
    sord:"desc",
    ParameterJson:ParameterJson
  },
  dataType:"JSONP",
  success: function (res) {
    
    console.log(res);
    if(res.rows.length == 0){
      layer.msg("暂无数据");
      return 
    }
    layui.use("laytpl", function() {
      var laytpl = layui.laytpl;
      var yjxxTpl = document.getElementById("yjxx2Tpl").innerHTML;
      var yjxxTplCon = document.getElementById("yjxx2TplCon");
      
      yjxxData = res.rows;
      
      laytpl(yjxxTpl).render(yjxxData, function (html) {
        yjxxTplCon.innerHTML = html;
      });
    })
  }
})


function yjxxSkip(info){
  // var zcfg = '';
  // zcfg += "<div style = 'padding:10px;'>";
  // zcfg += "<div>标题: " + info.Title + "</div>";
  // zcfg += "<div>分类: " + info.InfoType + "</div>";
  // zcfg += "<div>来源: " + info.Source + "</div>";
  // zcfg += "<div>发布时间: " + info.CreateDate + "</div>";
  // zcfg += "<div>内容: " + info.tContent + "</div>";
  // zcfg += "</div>";
  // layer.open({
  //   type:1,
  //   area:["800px","800px"],
  //   shadeClose:true,
  //   closeBtn:2,
  //   content:zcfg
  // })
  
  sessionStorage.setItem("yjxxInfo", JSON.stringify(info));
  window.open("./yjxxContent.html");
}

// 新品种信息查询
$.get({
  url:urls + "/crop/query",
  success:function(res){
    layui.use("laytpl", function() {
      var laytpl = layui.laytpl;
      // var xptjTpl = document.getElementById("xptjTpl").innerHTML;
      // var xptjTplCon = document.getElementById("xptjTplCon");

      xptjData = res.data.crops;
      
      // for(var i = 0;i < xptjData.length;i++){
      //   xptjData[i].photo = xptjData[i].photo.split(",");
      //   for(var j = 0;j<xptjData[i].photo.length;j++){
      //     xptjData[i].photo[j] = "http://zs.sjznm.gov.cn:50047/index.php/api" + xptjData[i].photo[j];
      //   }
      // }

      for(var i = 0;i<xptjData.length;i++){
        xptjData[i].photo = xptjData[i].photo || "../img/zanwu.png";
      }
     
      xptjData = xptjData.slice(0,4);
      
      var zzwxxzxTpl = document.getElementById("zzwxxzxTpl").innerHTML;
      var zzwxxzxTplCon = document.getElementById("zzwxxzxTplCon");
      laytpl(zzwxxzxTpl).render(xptjData, function (html) {
        zzwxxzxTplCon.innerHTML = html;
      });
    })
  }
})

// 查询新品信息
function getNewProductInfo(index,info){
  var pic = info.photo;
  var picImg = "";
  for(var i = 0;i<pic.length;i++ ){
    picImg += "<img src='" + pic[i] + "' style='width: 200px;height: 200px;margin:10px;'>"
  }
  layer.open({
    title:"品种信息",
    type:1,
    shadeClose:true,
    area:["500px","400px"],
    content:"<div>品种名称:" + info.varietyname + "</div><div>所属作物名称:"+ info.cname +" </div><div>品种登记编号:" + (info.approvalno || '暂无') +" </div><div>选引育单位:"+ (info.breedunit  || '暂无') +"</div><div>适宜种植地区:"+ (info.suitablearea  || '暂无')+ "</div><div>培育年份:" + (info.vyear || '暂无' ) +"</div>" + picImg
  })
};
// 查询作物信息&&获取作物列表
$.ajax({
  type:"get",
  url:urls + "/cropcatalog/query",
  success:function(res){
    var nzwList = res.data.catalogs;
    layui.use('form', function(){
      for(var i = 0;i<nzwList.length;i++){
        $("#zzwTplCon").append("<option value='"  + nzwList[i].id +  "'>" + nzwList[i].cropname + "</option>")
        var form = layui.form;
        form.render();
      }
    });
    // layui.use("laytpl", function() {
    //   var laytpl = layui.laytpl;
    //   var bchTpl = document.getElementById("bchTpl").innerHTML;
    //   var bchTplCon = document.getElementById("bchTplCon");
      
    //   nzwData = res.data.catalogs.slice(0,8);
      
    //   laytpl(bchTpl).render(nzwData, function (html) {
    //     bchTplCon.innerHTML = html;
    //   });
    // })
  }
})

// 土地流转信息查询
/*function getLandList(area_code){
  $.ajax({
    type:"get",
    url:urls + "/land/query",
    // data:{
    //   area_code:area_code
    // },
    success:function(res){
      layui.use("laytpl", function() {
        var laytpl = layui.laytpl;
        var tdlzListTpl = document.getElementById("tdlzListTpl").innerHTML;
        var tdlzListTplCon = document.getElementById("tdlzListTplCon");
        var lands = res.data.lands;
        for(var i = 0;i<lands.length;i++){
          lands[i].thumbs = lands[i].thumbs.split(",");
          for(var j = 0;j<lands[i].thumbs.length;j++ ){
            lands[i].thumbs[j] = "http://zs.sjznm.gov.cn:50047/index.php/api" + lands[i].thumbs[j];
          }
        }
        
        tdlzData = lands.slice(0,2);
        laytpl(tdlzListTpl).render(tdlzData, function (html) {
          tdlzListTplCon.innerHTML = html;
        });
      })
    }
  })
}*/
function tdlzLayer(info){
  var tdlzImg = "";
  for(var i = 0;i<info.thumbs.length;i++){
    tdlzImg += '<img src="' + info.thumbs[i] + '" style= "width: 200px;height: 200px;margin:10px;">'
  }
  var tdlz = '';
  tdlz += "<div style = 'padding:10px;'>";
  tdlz += "<div>所在区域: "+ info.area +"</div>";
  tdlz += "<div>流转类型: "+ (info.deal_type ||'暂无') +"</div>";
  tdlz += "<div>土地类型: "+ (info.land_type||'暂无') +"</div>";
  tdlz += "<div>土地年限: "+ (info.land_expire || '暂无') +"年</div>";
  tdlz += "<div>价格: "+ (info.created_at || '暂无') +"平方米</div>";
  tdlz += "<div>发布时间: "+ info.created_at +"</div>";
  tdlz += "<div>联系方式: "+ info.contact +"</div>";
  tdlz += "<div>描述: "+ info.land_description +"</div>";
  tdlz += tdlzImg;
  tdlz += "</div>";
  layer.open({
    type:1,
    area:["800px","800px"],
    shadeClose:true,
    closeBtn:2,
    content:tdlz
  })  
}
// 病虫害查询
function bchQuery(index){
  if(index == 0 || index){
    var nzw = this.nzwData[index].cropname ;
  }else{
    var bchzd = $("#bchzd").val();
    if(!bchzd){
      layer.msg("请输入关键字");
      return
    }
  }
  // if(this.nzwData[index].cropname == undefined) this.nzwData[index].cropname = ""
  layer.load();
  $.get({
    url:urls + "/disease/query",
    data:{
      keyword:bchzd || nzw,
      len:10
    },
    success:function(res){
      layer.closeAll('loading');
      var diseases = res.data.diseases;
      if(diseases.length == 0){
        layer.msg("暂无信息");
        return
      }
      var queryResult = ""; 
      for(var i = 0;i<diseases.length;i++){
        queryResult += "<div style='border-bottom:solid 1px #999999;margin:10px;'>" ;
        queryResult += "<div>标题: " + (diseases[i].title || '暂无') + "</div>" ;
        queryResult += "<div>类型: "+ (diseases[i].type || '暂无') +"</div>" ;
        queryResult += "<div>来源: "+ (diseases[i].source || '暂无') +"</div>" ;
        queryResult += "<div>相关农产品: "+ (diseases[i].related_agri_product || '暂无') +"</div>" ;
        queryResult += "<div>种名: "+ (diseases[i].species_name_bak || '暂无') + "</div>" ;
        queryResult += "<div>正文: "+ (diseases[i].content || '暂无') +"</div>" ;
        queryResult += "<img src='" +  (diseases[i].images || "./img/zanwu.png")  +  "' style ='margin: 20px auto;'>" ;
        queryResult += "</div>";
      }
      layer.open({
        type:1,
        area:["1000px","800px"],
        shadeClose:true,
        closeBtn:2,
        content:queryResult
      })
      // var diseases = res.data.diseases;
      // for(var i = 0;i<diseases.length;i++){
      //   $("#swiper-container1>.swiper-wrapper>.swiper-slide>div")[i].innerHTML = diseases[i].title;
      //   //绑定点击事件
      //   (function(i){
      //     $("#swiper-container1>.swiper-wrapper>.swiper-slide>div")[i].onclick = function (){
      //       layer.open({
      //         type: 1, 
      //         area:["700px","400px"],
      //         content: diseases[i].title +"<br>" +"来源：" + diseases[i].source + diseases[i].content
      //       });
      //     }
      //   })(i)
      // }
    }
  })
}
// $.post({
//   url:"http://yn.zq.yn15.com/ExpertTec/YN_PestDis/GridPageJsonS",
//   data:{
//     Key:"KEY69B5B31F-8355-4234-B9C6-B6AA1EF92EA7",
//     rows:2,
//     page:1,
//   },
//   dataType:"JSONP",
//   success:function(res){
//     layer.closeAll('loading');
//     diseasesData = res.rows;
//     layui.use("laytpl", function() {
//       var laytpl = layui.laytpl;
//       var duofabchTpl = document.getElementById("duofabchTpl").innerHTML;
//       var duofabchTplCon = document.getElementById("duofabchTplCon");
//       laytpl(duofabchTpl).render(diseasesData, function (html) {
//         duofabchTplCon.innerHTML = html;
//       });
//     })  
//   }
// })
function duofabchLayer(diseasesData){
  var layerCont = "";
  layerCont += "<div style = 'padding:10px;'>"
  layerCont += "<div>标题: " + (diseasesData.title || '暂无') + "</div>" ;
  layerCont += "<div>类型: "+ (diseasesData.type || '暂无') +"</div>" ;
  layerCont += "<div>来源: "+ (diseasesData.source || '暂无') +"</div>" ;
  layerCont += "<div>相关农产品: "+ (diseasesData.related_agri_product || '暂无') +"</div>" ;
  layerCont += "<div>种名: "+ (diseasesData.species_name_bak || '暂无') + "</div>" ;
  layerCont += "<div>正文: "+ (diseasesData.content || '暂无') +"</div>" ;
  layerCont += "<img src='" +  (diseasesData.img || './img/zanwu.png')  +  "' style ='margin: 20px auto;'>" ;
  layerCont += "</div>";
  layer.open({
    type:1,
    area:["1000px","800px"],
    shadeClose:true,
    closeBtn:2,
    content:layerCont
  })
}

//获取所有省
$.get({
  url:"http://nest.156.site.veeteam.com/index.php/index/district/province",
  success:function(res){
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
      $("#askCity").html("");
      layui.use('form', function(){
        for(var i = 0;i<res.data.length;i++){
          $("#askCity").append("<option value='"  + res.data[i].city_id +  "'>" + res.data[i].city_name + "</option>");
          var form = layui.form;
          form.render();
        }
      });
    }
  })
}
// 上传图片
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

// 提问题
layui.use('form',function(){
  var form = layui.form;
  var userData = (localStorage.getItem("userInfo") == "undefined" || localStorage.getItem("userInfo") == null) ? {} : JSON.parse(localStorage.getItem("userInfo"));
  form.on('select(area_code1)',function(data){
    var cityId = $(".layui-this")[1].attributes[0].value;
    getCitys(cityId);
  })
 
  form.on("submit(issueAsk)",function(data){
    if(!userData.user_id){
      layer.msg('请先登录'); 
      return;
    };
    var user_id =  userData.user_id;      // user_id用户id
    var cat_id =  data.field.cat_id;      // cat_id作物(cropcatalog) id
    var content = data.field.content;     // content内容
    if(!content){
      layer.msg('请输入内容');
      return;
    }
    var title = data.field.title;         // title标题
    if(!title){
      layer.msg('请输入标题');
      return;
    }
    var attaches = picArr.join(",");      // attaches图片
    var area_code = data.field.area_code; // area_code所在区域代码

    var index = layer.load(2, {time: 10*1000});
    $.post({
      url: urls + "/question/create",
      data:{
        user_id:user_id,
        cat_id:cat_id,
        content:content,
        title:title,
        attaches:attaches,
        area_code:area_code
      },
      success:function(res){
        layer.close(index); 
        layer.open({
          content:res.message,
          shadeClose:true,
        })
      }
    })
    return false; 
  })
})

// 提问列表
$.get({
  url:urls + "/question/query",
  success:function(res){
    var quertions = res.data.questions;
    layui.use('laytpl',function(){
      var laytpl = layui.laytpl;
      var askListTpl = document.getElementById("askListTpl").innerHTML;
      var askListTplCon = document.getElementById("askListTplCon");
      quertionsData = quertions.slice(0,8);
      laytpl(askListTpl).render(quertionsData, function (html) {
        askListTplCon.innerHTML = html;
      });
    })
  }
})
function questionInfo(info){
  if(typeof(info.attachs) == "string"){
    info.attachs = info.attachs.split(",");
  }
  for(var i = 0;i<info.attachs.length;i++){
    info.attachs[i] = "http://zs.sjznm.gov.cn:50047/index.php/api" + info.attachs[i];
  }
  var attachsImg = '';
  for(var j = 0;j<info.attachs.length;j++){
    attachsImg += "<img src='" + info.attachs[j] + "'  style='width: 200px;height: 200px;margin:10px;'>"
  }

  // var quertionCont = '';
  // quertionCont += "<div style = 'padding:10px;'>";
  // quertionCont += "<div>标题: "+ info.title +"</div>";
  // quertionCont += "<div>作物: "+ info.cata_name +"</div>";
  // quertionCont += "<div>内容: "+ info.content +"</div>";
  // quertionCont += "<div>创建时间: "+ info.created_at +"</div>";
  // quertionCont += attachsImg
  // quertionCont += "</div>";
  // layer.open({
  //   type:1,
  //   area:["800px","800px"],
  //   shadeClose:true,
  //   closeBtn:2,
  //   content:quertionCont
  // })  
  window.open("./answer.html");
}

//获取政策法规
layer.load();
$.post({
  url:"http://yn.zq.yn15.com/ExpertTec/YN_Ynzc/GridPageJsonS",
  data:{
    Key:"KEY69B5B31F-8355-4234-B9C6-B6AA1EF92EA7",
    UserId:"c24400eb-8c8c-42c0-baa0-0621f51bcb9d",
    rows:8,
    page:1,
    sord:'desc',
  },
  dataType:"JSONP",
  success:function(res){
    layer.closeAll('loading');
    zcfgData = res.rows;
    
    layui.use("laytpl", function() {
      var laytpl = layui.laytpl;
      var zcfgTpl = document.getElementById("zcfgTpl").innerHTML;
      var zcfgTplCon = document.getElementById("zcfgTplCon");

      laytpl(zcfgTpl).render(zcfgData, function (html) {
        zcfgTplCon.innerHTML = html;
      });
    })  
  }
})
function zcfgSkip(info){
  // var zcfg = '';
  // zcfg += "<div style = 'padding:10px;'>";
  // zcfg += "<div>标题: " + info.Title + "</div>";
  // zcfg += "<div>分类: " + info.InfoType + "</div>";
  // zcfg += "<div>来源: " + info.Source + "</div>";
  // zcfg += "<div>发布时间: " + info.CreateDate + "</div>";
  // zcfg += "<div>内容: " + info.tContent + "</div>";
  // zcfg += "</div>";
  // layer.open({
  //   type:1,
  //   area:["800px","800px"],
  //   shadeClose:true,
  //   closeBtn:2,
  //   content:zcfg
  // })
  
  sessionStorage.setItem("zcfgInfo", JSON.stringify(info));
  window.open("./zcfgContent.html");
}


// 政策法规查看更多
function zcfgMore(){
  // layer.open({
  //   type:2,
  //   area:["1000px","900px"],
  //   shadeClose:true,
  //   closeBtn:2,
  //   content:"./zcfgMore.html"
  // })  
  window.open("./zcfgMore.html");
}
// 农产品价格
layer.load();
$.post({
  url:"http://yn.zq.yn15.com/ExpertTec/YN_AgriMarketPrice/GetListByMarketId",
  data:{
    Key:"KEY69B5B31F-8355-4234-B9C6-B6AA1EF92EA7",
    rows:8,
    page:1,
    sord:'desc'
  },
  dataType:"JSONP",
  success:function(res){
    layer.closeAll('loading');
    ncpjgData = res.rows;
    layui.use("laytpl", function() {
      var laytpl = layui.laytpl;
      var ncpjgTpl = document.getElementById("ncpjgTpl").innerHTML;
      var ncpjgTplCon = document.getElementById("ncpjgTplCon");

      laytpl(ncpjgTpl).render(ncpjgData, function (html) {
        ncpjgTplCon.innerHTML = html;
      });
    })
  }
})
function ncpjgLayer(info){
  var ncpjg = '';
  ncpjg += "<div style = 'padding:10px;'>";
  ncpjg += "<div>农产品: " + info.Agricuture + "</div>";
  ncpjg += "<div>所属分类: " + info.AgriType + "</div>";
  ncpjg += "<div>市场名称: " + info.AgriMarketName + "</div>";
  ncpjg += "<div>价格: " + info.AgriPrice + "</div>";
  ncpjg += "<div>来源: " + info.Source + "</div>";
  ncpjg += "<div>创建时间: " + info.CreateDate + "</div>";
  ncpjg += "</div>";

  layer.open({
    type:1,
    area:["400px","400px"],
    shadeClose:true,
    closeBtn:2,
    content:ncpjg
  })
}
function ncpjgMore(){
  window.open("./ncpjgMore.html");
}
// 市场行情

// 新技术信息
layer.load();
$.post({
  url:"http://yn.zq.yn15.com/ExpertTec/YN_Nongyejishu/GridPageJsonS",
  data:{
    key:"KEY69B5B31F-8355-4234-B9C6-B6AA1EF92EA7",
    rows:8,
    page:1,
    sord:'desc',
  },
  dataType:"JSONP",
  success:function(res){
    layer.closeAll('loading');
    jsxxData = res.rows;
    layui.use("laytpl", function() {
      var laytpl = layui.laytpl;
      var jsxxTpl = document.getElementById("jsxxTpl").innerHTML;
      var jsxxTplCon = document.getElementById("jsxxTplCon");

      laytpl(jsxxTpl).render(jsxxData, function (html) {
        jsxxTplCon.innerHTML = html;
      });
    })  
  }
})
function jsxxSkip(info){
  // var jsxx = '';
  // jsxx += "<div style = 'padding:10px;'>";
  // jsxx += "<div>标题: " + info.title + "</div>";
  // jsxx += "<div>所属分类: " + info.type + "</div>";
  // jsxx += "<div>大分类: " +  info.category + "</div>";
  // jsxx += "<div>来源: " + (info.Source || "暂无") + "</div>";
  // jsxx += "<div>创建时间: " + info.intime + "</div>";
  // jsxx += "<div>内容: " + info.content + "</div>";
  // jsxx += "</div>";

  // layer.open({
  //   type:1,
  //   area:["400px","400px"],
  //   shadeClose:true,
  //   closeBtn:2,
  //   content:jsxx
  // })

  sessionStorage.setItem("jsxxInfo", JSON.stringify(info));
  window.open("./jsxxContent.html");
}
function jsxxMore(){
  window.open("./jsxxMore.html");
}
//更改作物信息
// $.post({
//   url:siteUrl + "/cropcatalog/update",
//   data:{
//     cat_id:1
//   }
// })
// 玉米 : "/uploads/attachment/1533169883/5b728849991e3.jpg"
// 花生 : "/uploads/attachment/1533169883/5b7288b08463c.jpg"
// 大蒜 : "/uploads/attachment/1533169883/5b72893e5f473.jpg"
// 薯类 : "/uploads/attachment/1533169883/5b729a48ea223.png"
// 豆类 : "/uploads/attachment/1533169883/5b728e2c3de8a.jpg"
// 蚕豆 : "/uploads/attachment/1533169883/5b7290090728f.jpg"
// 小麦 : "/uploads/attachment/1533169883/5b72905fdb0d0.jpg"
// 油籽 : "/uploads/attachment/1533169883/5b7290af18999.jpg"
