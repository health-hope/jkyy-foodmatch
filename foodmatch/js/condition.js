"use strict";var currentTime,openIdItem=window.localStorage.getItem("openIdItem")||"",foodMatchtype=window.localStorage.getItem("foodMatchtype")||"",diabetesPeople=[{value:"0",text:"儿童"},{value:"1",text:"青少年"},{value:"2",text:"成人（肾功能正常）"}],vm=new Vue({el:"#containerBox",data:{currentSex:1,currentUserActivityLevel:1,foodPreference:[0],meals:[],isNext:!1,userName:"",age:"",nation:"",pregnancyNum:"",pregnancyPeriod:"",diabetesPeople:[],peopleSortType:"",address:"",province:"",city:"",weight:"",height:"",notEat:[],foodList:[],notEatInput:"",endYear:"",isShowNotEatBox:!1,newCurrentFoodData:[],userInfoNeed:JSON.parse(window.localStorage.getItem("userInfoNeed")),pregnancyShow:!1},computed:{isActive:function(){this.isNext=!1;var e=this.userInfoNeed,t=[];for(var o in e)0==e[o]&&t.push(o);console.log(t,"m222usts");var n=["userName","address","age","diabetesPeople","height","weight","pregnancyPeriod"].filter(function(e){return t.includes(e)});if(console.log(n,"必须校验！"),n&&0<n.length&&100<=this.height&&this.height<=250&&25<=this.weight&&this.weight<=199){var i=n.every(function(e,t,o){return""!=vm.$data[e]});return this.isNext=!!i}},peopleSortJson:function(){var e,t=this;return e=""!=t.age?birthdayToAge(t.age):"","1"==t.currentSex&&""==e&&(diabetesPeople=[{value:"0",text:"儿童"},{value:"1",text:"青少年"},{value:"2",text:"成人（肾功能正常）"}]),"2"==t.currentSex&&""==e&&(diabetesPeople=[{value:"0",text:"儿童"},{value:"1",text:"青少年"},{value:"2",text:"成人（肾功能正常）"},{value:"3",text:"孕早期"},{value:"4",text:"孕中期"},{value:"5",text:"孕晚期"}]),3<=e&&e<=18?diabetesPeople=[{value:"0",text:"儿童"},{value:"1",text:"青少年"}]:18<e&&"1"==t.currentSex?diabetesPeople=[{value:"2",text:"成人（肾功能正常）"}]:18<e&&"2"==t.currentSex&&(diabetesPeople=[{value:"2",text:"成人（肾功能正常）"},{value:"3",text:"孕早期"},{value:"4",text:"孕中期"},{value:"5",text:"孕晚期"}]),diabetesPeople}},mounted:function(){this.$nextTick(function(){hideLoading(),this.initData(),this.endYear=(new Date).getFullYear()-3})},filters:{foodNameFilters:function(e){return e}},watch:{userName:function(e,t){10<e.length&&(this.userName=t)},peopleSortJson:function(e){for(var t=!1,o=0;o<e.length;o++)if(e[o].value==this.peopleSortType)return void(t=!0);t||(this.diabetesPeople=(e[0]||{}).text,this.peopleSortType=(e[0]||{}).value)},height:function(e,t){var o;return o=this.height,null!=/^\d*\.{0,1}\d{0,1}$/.exec(o)||(showTip("请输入数字且只能输入一位小数"),this.height=t,!1)},weight:function(e,t){var o;return o=this.weight,null!=/^\d*\.{0,1}\d{0,1}$/.exec(o)||(showTip("请输入数字且只能输入一位小数"),this.weight=t,!1)},notEatInput:function(){var o=this;currentTime=(new Date).getTime(),setTimeout(function(){var e=(new Date).getTime();if(900<=e-currentTime&&(currentTime=e,console.log(o.notEatInput),""!=o.notEatInput)){$("#notEat").blur();var t={queryContent:o.notEatInput,pageSize:"6",neFoodId:""};o.searchFood(t)}},900)}},methods:{foodNameSelected:function(e){var t=this;t.newCurrentFoodData.push(e),t.isShowNotEatBox=!1,t.notEatInput="",t.notEat.push(e.foodData.foodName),console.log(t.notEat)},del:function(e){this.notEat.splice(e,1),console.log(this.notEat)},searchFood:function(e){$(".loding-nocat").css("display","block");var t=this;ajaxRequest("/v2/content/food2/name/like.do","POST",JSON.stringify(e),function(e){"SUCCESS"==e.retCode?($(".loding-nocat").css("display","none"),e.foodList&&0<e.foodList.length?(t.foodList=e.foodList,t.isShowNotEatBox=!0,console.log(t.foodList,t.isShowNotEatBox,11)):(t.isShowNotEatBox=!1,showTip("暂无数据"))):showTip(e.tooltip)})},initData:function(){var t=this,e={openId:JSON.parse(openIdItem),type:JSON.parse(foodMatchtype)};ajaxRequest("/v2/food/matching/user/info/query.do","POST",JSON.stringify(e),function(e){if("SUCCESS"==e.retCode){if(e.basicInfo){switch(t.userName=e.basicInfo.userName,t.age=e.basicInfo.birthday,t.currentSex=e.basicInfo.sex,t.nation=e.basicInfo.nation,t.province=e.basicInfo.province,t.city=e.basicInfo.city,t.address=e.basicInfo.province+" "+e.basicInfo.city,t.weight=e.physicalInfo.weight,t.height=e.physicalInfo.height,t.peopleSortType=e.physicalInfo.people,t.peopleSortType){case"0":t.diabetesPeople="儿童";break;case"1":t.diabetesPeople="青少年";break;case"2":t.diabetesPeople="成人（肾功能正常）";break;case"3":t.diabetesPeople="孕早期";break;case"4":t.diabetesPeople="孕中期";break;case"5":t.diabetesPeople="孕晚期";break;default:t.diabetesPeople=""}switch(t.pregnancyNum=e.physicalInfo.pregnancyPeriod,t.pregnancyNum){case"1":t.pregnancyPeriod="妊娠早期，0-12周1";break;case"2":t.pregnancyPeriod="妊娠中期，13-28周";break;case"3":t.pregnancyPeriod="妊娠后期，29-40周";break;default:t.pregnancyPeriod=""}t.foodPreference=e.dietRecommend.preference,t.notEat=e.dietRecommend.notEat,t.currentUserActivityLevel=e.dietRecommend.userActivityLevel,t.meals=e.dietRecommend.extraMealList}}else showTip(e.tooltip)})},showDate:function(){var t=this;if(5==parseInt(JSON.parse(foodMatchtype)))var e={type:"date",beginYear:(o=(new Date).getFullYear())-60,endYear:o-18};else{var o;e={type:"date",beginYear:(o=(new Date).getFullYear())-120,endYear:o-18}}var n=new mui.DtPicker(e);n.setSelectedValue(t.age||"1980-01-01",100,function(){}),document.activeElement.blur(),setTimeout(function(){n.show(function(e){t.age=e.text,n.dispose()})},200)},showRegion:function(){var t=this,e=new mui.PopPicker({layer:2});e.setData(init_city_picker);for(var o=$("#region").val().split(" "),n=o[0],i=o[1],a=0;a<init_city_picker.length;a++)if(n==init_city_picker[a].text){e.pickers[0].setSelectedIndex(a);for(var r=0;r<init_city_picker[a].children.length;r++)i==init_city_picker[a].children[r].text&&e.pickers[1].setSelectedIndex(r)}document.activeElement.blur(),setTimeout(function(){e.show(function(e){console.log(e)}),e.show(function(e){t.address=(e[0]||{}).text+" "+(e[1]||{}).text,t.province=(e[0]||{}).text,t.city=(e[1]||{}).text})},200)},showNation:function(){var t=this,e=new mui.PopPicker;e.setData(nation);for(var o=$("#nation").val(),n=0;n<nation.length;n++)o==nation[n].text&&e.pickers[0].setSelectedIndex(n);document.activeElement.blur(),setTimeout(function(){e.show(function(e){t.nation=(e[0]||{}).text})},200)},showPregnancy:function(){var t=this,e=new mui.PopPicker;e.setData([{value:"01",text:"妊娠早期，0-12周"},{value:"02",text:"妊娠中期，13-28周"},{value:"03",text:"妊娠后期，29-40周"}]);for(var o=$("#pregnancy").val(),n=0;n<pregnancy.length;n++)o==pregnancy[n].text&&e.pickers[0].setSelectedIndex(n);document.activeElement.blur(),setTimeout(function(){e.show(function(e){t.pregnancyPeriod=(e[0]||{}).text})},200)},showPeople:function(){var t=this,e=new mui.PopPicker;console.log(t.peopleSortJson),e.setData(t.peopleSortJson);for(var o=$("#peopleSort").val(),n=0;n<peopleSort.length;n++)o==diabetesPeople[n].text&&e.pickers[0].setSelectedIndex(n);document.activeElement.blur(),setTimeout(function(){e.show(function(e){t.diabetesPeople=(e[0]||{}).text,t.peopleSortType=(e[0]||{}).value,console.log(t.peopleSortType)})},200)},submit:function(){var e=this;if((this.height<100||250<this.height)&&""!=this.height&&showTip("身高在100cm~250cm"),(this.weight<25||199<this.weight)&&""!=this.weight&&showTip("体重在25kg~199kg"),1!=e.isNext)return!1;switch(showLoading(),e.pregnancyPeriod){case"妊娠早期，0-12周":e.pregnancyNum="1";break;case"妊娠中期，13-28周":e.pregnancyNum="2";break;case"妊娠后期，29-40周":e.pregnancyNum="3";break;default:e.pregnancyNum=""}var t={userName:e.userName,birthday:e.age,sex:e.currentSex,nation:e.nation,province:e.province,city:e.city},o={weight:e.weight,height:e.height,people:e.peopleSortType,pregnancyPeriod:e.pregnancyNum},n={preference:e.foodPreference,notEat:e.notEat,userActivityLevel:e.currentUserActivityLevel,extraMealList:e.meals},i={openId:JSON.parse(openIdItem),type:JSON.parse(foodMatchtype),basicInfo:t,physicalInfo:o,dietRecommend:n};ajaxRequest("/v2/food/matching/user/info/upsert.do","POST",JSON.stringify(i),function(e){"SUCCESS"==e.retCode?window.location.href="reference.html":showTip(e.tooltip)})},start:function(){window.location.href="condition.html"},bindCheckedInput:function(e,t,o){"radio"==e&&("sex"==t?this.currentSex=o:"userActivityLevel"==t?this.currentUserActivityLevel=o:"extraMealList"==t&&(this.currentExtraMealList=o))},toIndex:function(){var e=JSON.parse(window.localStorage.getItem("openIdItem"))||"",t=parseInt(JSON.parse(window.localStorage.getItem("foodMatchtype")))||"";console.log(e+"..."+t),""!==window.localStorage.getItem("foodMatchtype")&&""==parseInt(JSON.parse(window.localStorage.getItem("foodMatchtype")))?window.location.href="../index.html?openIdItem="+e+"&foodMatchtype=0":window.location.href="../index.html?openIdItem="+e+"&foodMatchtype="+t}}});