"use strict";var openIdItem=window.localStorage.getItem("openIdItem")||"";new Vue({el:"#containerBox",data:{isActive:!1,breakfast:{},breakfastAddition:{},lunch:{},lunchAddition:{},dinner:{},dinnerAddition:{},recipesDate:getUrlParam("recipesDate"),recipesId:getUrlParam("recipesId")},mounted:function(){this.$nextTick(function(){this.initData()})},methods:{initData:function(){var o=this,e={openId:openIdItem,recipesDate:o.recipesDate,recipesId:o.recipesId},t=JSON.stringify(e);console.log(t),$.ajax({url:CONFIG.baseUrl+"/jkyy-apps/h5/food/matching/diabetic/diet/detail/query.do",type:"post",data:t,crossDomain:!0,dataType:"json",contentType:"application/json",success:function(e){"SUCCESS"==e.retCode?(hideLoading(),o.breakfast=e.breakfast,o.breakfastAddition=e.breakfastAddition,o.lunch=e.lunch,o.lunchAddition=e.lunchAddition,o.dinner=e.dinner,o.dinnerAddition=e.dinnerAddition):showTip(e.tooltip)}})},reference:function(){window.location.href="recipes.html"},changeRecipe:function(i,e){var o={recipesDate:this.recipesDate,recipesId:this.recipesId,foodName:i.foodName,foodHeat:i.foodHeat,openId:openIdItem,mealType:e,foodId:i.foodId},t=JSON.stringify(o);console.log(t),$.ajax({url:CONFIG.baseUrl+"/jkyy-apps/h5/food/matching/diet/changement/query.do",type:"post",data:t,crossDomain:!0,dataType:"json",contentType:"application/json",success:function(e){if("SUCCESS"==e.retCode){hideLoading();for(var o=Object.keys(e.foodInfo),t=0;t<o.length;t++)i[o[t]]=e.foodInfo[o[t]]}else showTip(e.tooltip)}})},currentMaterial:function(e,o){console.log(e,o),window.location.href="todayfood.html?recipesId="+o+"&recipesDate="+e},toIndex:function(){window.location.href="../index.html?id="+openIdItem},generateRecipes:function(){window.location.href="recipes.html"}}});