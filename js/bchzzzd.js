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

$(function () {
  //SelectType:绑定的元素;TypeClick:切换时添加或删除的类
  var SymptomsSectionArr = [];
  var knowledge;
  var disease;
  var testCase;
  var testWeight;
  var symptom;
  var sections;
  var symptoms;

  function TabControl(SelectTypeF, SelectTypeC, TypeClick) {
    $(SelectTypeF).on("click", SelectTypeC, function () {
      // 第四行
      if (SelectTypeF != ".SymptomsSection") {
        $(SelectTypeC).removeClass(TypeClick);
        $(this).addClass(TypeClick);
      }else{
        if(this.className == "SymptomsSectionClick"){
          $(this).removeClass("SymptomsSectionClick");
          SymptomsSectionArr.splice(SymptomsSectionArr.indexOf($(this).attr("value")),1);
        }else{
          $(this).addClass(TypeClick);
          SymptomsSectionArr.push($(this).attr("value"));
        }
      }

      // 第一行:种类选择
      if (SelectTypeF == ".TypeSelectType") {
        SymptomsSectionArr = [];
        var dt = $(this).attr("value");
        getSymptoms(dt);
      }

      // 第二行:症状选择
      if (SelectTypeF == ".SymptomsSelectType") {
        var symptomValue = $(this).attr("value");
        var sectionsSymptomutf = $(this).text();

        knowledge = $(this).attr("knowledge");
        disease =  $(this).attr("disease");
        testCase =  $(this).attr("testCase");
        testWeight =  $(this).attr("testWeight");
        symptom =  $(this).attr("symptom");
        sections = $(this).text();
        
        getSymptomutf(symptomValue, sectionsSymptomutf);
      }

      // 第三行:症状部位
      if (SelectTypeF == ".SymptomutfSelect") {
        var SectionText = $(this).text();
        var SymptomsSectionCon = $(".SymptomsSection>div");
        SymptomsSectionCon.css("display","none");
        for(var i = 0;i<SymptomsSectionCon.length;i++){
          if(SymptomsSectionCon.eq(i).attr("value") == SectionText){
            SymptomsSectionCon.eq(i).css("display","block");
          }
        }
      }
    })
  }

  // 获取第二行
  function getSymptoms(dt) {
    layer.load();
    $.get({
      url: "http://bch.yq.yn15.com/DiagnosisSystem/appDiagnosisTypeutf.do",
      data: {
        dt: dt,
      },
      dataType: "JSONP",
      success: function (res) {
        layer.closeAll('loading');
        var SymptomsSelectType = res.infos;
        // knowledge = SymptomsSelectType.knowledgeDataTableName;
        // disease = SymptomsSelectType.diseaseDataTableName;
        // testCase =SymptomsSelectType.testCaseDataTableName
        var SymptomsSelectTypeHTML = '';
        for (var i = 0; i < SymptomsSelectType.length; i++) {
          SymptomsSelectTypeHTML += "<span class='' symptom='" + SymptomsSelectType[i].symptomDataTableName + "' testWeight='" + SymptomsSelectType[i].testWeightDataTableName + "' testCase='" + SymptomsSelectType[i].testCaseDataTableName + "' disease='" + SymptomsSelectType[i].diseaseDataTableName + "'  knowledge='"+ SymptomsSelectType[i].knowledgeDataTableName +"' value='" + SymptomsSelectType[i].symptomDataTableName +  "'>" + SymptomsSelectType[i].sections + "</span>"
        }
        $(".SymptomsSelectType").html(SymptomsSelectTypeHTML);
      }
    })
  }
  getSymptoms("rice");

  // 获取第三行
  function getSymptomutf(symptom, sections) {
    layer.load();
    $.get({
      url: "http://bch.yq.yn15.com/DiagnosisSystem/appSymptomutf.do",
      data: {
        symptom: symptom,
        sections: sections
      },
      dataType: "JSONP",
      success: function (res) {
        layer.closeAll('loading');
        SymptomsSection = res.infos;
        var SymptomutfHtml = "";
        var SectionHTML = "";
        
        for (var key in res.infos) {
          SymptomutfHtml += "<span class='' value='" + key + "'>" + key + "</span>"
          SectionHTML += "<div value = '"+ key +"'>"
          for(var i = 0;i<SymptomsSection[key].length;i++){
            SectionHTML += "<a title = '" + SymptomsSection[key][i].symptomName + "' value = '"+ SymptomsSection[key][i].id +"'>"+ SymptomsSection[key][i].symptomName +"</a>"
          }
          SectionHTML += "</div>"
        }
        $(".SymptomutfSelect").html(SymptomutfHtml);
        $(".SymptomsSection").html(SectionHTML);
      }
    })
  }

  //  得出诊断结果
  $(".result").click(function(){
    if(SymptomsSectionArr.length == 0){
      layer.msg("请选择症状");
      return
    }
    layer.load();
    
    symptoms = SymptomsSectionArr.join(",");
    $.get({
      url: "http://bch.yq.yn15.com/DiagnosisSystem/appDiagnosisutf.do",
      data: {
        knowledge,
        disease,
        testCase,
        testWeight,
        symptom,
        sections,
        symptoms
      },
      dataType: "JSONP",
      success: function (res) {
        layer.closeAll('loading');
        if(res.infos.length == 0){
          layer.msg('暂无诊断结果');
        }else{
          layer.msg(res.msg);
        }
        var resultHTML = '';
        for(var i = 0;i<res.infos.length;i++){
          resultHTML += "<div>"
          resultHTML +=   "<h1>" + res.infos[i].result + "</h1>"
          resultHTML += "</div>"
          resultHTML += "<div>"
          resultHTML +=   "<p>" + (res.infos[i].cure || res.infos[i].prevent) + "</p>"
          resultHTML += "</div>"
        }
        $(".resultCon").html(resultHTML);
      }
    })
  })

  TabControl(".TypeSelectType", "span", "TypeSelectTypeClick");
  TabControl(".SymptomsSelectType", "span", "SymptomsSelectTypeClick");
  TabControl(".SymptomutfSelect", "span", "SymptomutfSelectClick");
  TabControl(".SymptomsSection", "a", "SymptomsSectionClick");

})