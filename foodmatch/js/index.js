"use strict";window.localStorage.removeItem("openIdItem"),window.localStorage.removeItem("foodMatchtype"),window.localStorage.removeItem("foodMatchChannel"),window.localStorage.removeItem("peicaned"),window.localStorage.setItem("openIdItem",JSON.stringify(getUrlParam("openIdItem"))),window.localStorage.setItem("foodMatchtype",JSON.stringify(getUrlParam("foodMatchtype"))),window.localStorage.setItem("foodMatchChannel",JSON.stringify(getUrlParam("foodMatchChannel"))),new Vue({el:"#containerBox",data:{imageUrl:"",planInfos:[],mealInfos:[],advantageInfos:[],proEndorsement:[],userInfoNeed:{},appScope:"",planName:"",isContentShow:!1},mounted:function(){var t,e,o;getUrlParam("token")&&window.sessionStorage.setItem("token",getUrlParam("token")),console.log(1==!window.localStorage.getItem("peicaned")),window.localStorage.getItem("peicaned")||getUrlParam("twojoin")?$("body").css("display","block"):(t=function(e){1==e?(localStorage.setItem("peicaned",!0),window.localStorage.setItem("openIdItem",JSON.stringify(getUrlParam("openIdItem"))),window.localStorage.setItem("foodMatchtype",JSON.stringify(getUrlParam("foodMatchtype"))),window.localStorage.setItem("foodMatchChannel",JSON.stringify(getUrlParam("foodMatchChannel"))),window.location.href="views/weekdiet.html"):$("body").css("display","block")},e=getUrlParam("openIdItem"),o=getUrlParam("foodMatchtype"),ajaxRequest("/v2/food/matching/user/status/find.do","POST",{type:o,openId:e},function(e){if("SUCCESS"==e.retCode){if(e.foodMatch){var o=e.foodMatch.foodMatchStatus;t(o)}}else showTip(e.retInfo)})),this.$nextTick(function(){showLoading(),this.getInitData()})},methods:{start:function(){window.location.href="./views/condition.html"},getInitData:function(){var o=this,e={type:getUrlParam("foodMatchtype")};ajaxRequest("/v2/food/matching/index.do","POST",e,function(e){console.log(e,"initdata"),"SUCCESS"==e.retCode?(o.imageUrl=e.imageUrl,o.planInfos=e.planInfos,o.mealInfos=e.mealInfos,o.advantageInfos=e.advantageInfos,o.proEndorsement=e.proEndorsement,o.planName=e.planName,document.title=e.planName,o.appScope=e.appScope[0],o.userInfoNeed=e.userInfoNeed,window.localStorage.setItem("userInfoNeed",JSON.stringify(o.userInfoNeed)),window.localStorage.setItem("openIdItem",JSON.stringify(getUrlParam("openIdItem"))),window.localStorage.setItem("foodMatchtype",JSON.stringify(getUrlParam("foodMatchtype"))),window.localStorage.setItem("foodMatchChannel",JSON.stringify(getUrlParam("foodMatchChannel"))),hideLoading(),o.isContentShow=!0):(o.isContentShow=!1,showTip(e.retInfo))})}}});