var openIdItem = window.localStorage.getItem("openIdItem") || "";
new Vue({
	el: "#containerBox",
	data: {
		isActive:false,									//是否点中
		breakfast:{},									//早餐
		breakfastAddition:{},							//早加
		lunch:{},										//午餐
		lunchAddition:{},								//午加
		dinner:{},										//晚餐
		dinnerAddition:{},								//晚加
		recipesDate:getUrlParam("recipesDate"),			//当前查看食材日期
		recipesId:getUrlParam("recipesId"),				//食谱id

	},
	mounted:function(){
        this.$nextTick(function(){
			this.initData();
        })
    },
    methods:{
    	initData: function(){
    		var that = this;
    		// that.recipesDate = getUrlParam("recipesDate");
    		// that.recipesId = getUrlParam("recipesId");
    		var param={"openId":openIdItem,"recipesDate":that.recipesDate,"recipesId":that.recipesId};
    		var data=JSON.stringify(param);
    		console.log(data);
    		$.ajax({
	            url: CONFIG.baseUrl+"/jkyy-apps/h5/food/matching/diabetic/diet/detail/query.do",
	            type: "post",
	            data: data,
	            crossDomain: true,
	            dataType: "json",
	            contentType: "application/json",
	            success:function (data){
	            	// console.log(JSON.stringify(data));
	                if(data.retCode=="SUCCESS"){
	                	//隐藏loading
						hideLoading();
						//数据赋值
						that.breakfast = data.breakfast;
						that.breakfastAddition = data.breakfastAddition;
						that.lunch = data.lunch;
						that.lunchAddition = data.lunchAddition;
						that.dinner = data.dinner;
						that.dinnerAddition = data.dinnerAddition;
						
	                }else{
	                	showTip(data.tooltip);
	                }
	            },
	        })
    		
    	},
    	//营养目标
		reference:function(){
			window.location.href = "recipes.html";
		},
		//换一换
		changeRecipe: function(item,mealType){
			var that = this;
			var changeData = {"recipesDate":that.recipesDate,"recipesId":that.recipesId,"foodName":item.foodName,"foodHeat":item.foodHeat,"openId":openIdItem,"mealType":mealType,"foodId":item.foodId};
			var changeDataJson = JSON.stringify(changeData);
			console.log(changeDataJson);
			$.ajax({
	            url: CONFIG.baseUrl+"/jkyy-apps/h5/food/matching/diet/changement/query.do",
	            type: "post",
	            data: changeDataJson,
	            crossDomain: true,
	            dataType: "json",
	            contentType: "application/json",
	            success:function (data){
	            	// console.log("changes内容:"+JSON.stringify(data));
	                if(data.retCode=="SUCCESS"){
	                	//隐藏loading
						hideLoading();
						//数据赋值
						// Object.assign(item,data.foodInfo)	
						var keys=Object.keys(data.foodInfo)
						for(var i=0;i<keys.length;i++){
							// that.$set(item,keys[i],data.foodInfo[keys[i]])
							item[keys[i]]=data.foodInfo[keys[i]]
						}	
						
	                }else{
	                	showTip(data.tooltip);
	                }
	            },
	        })
		},
		//查看食材
		currentMaterial:function(recipesDate,recipesId){
			console.log(recipesDate,recipesId);
			window.location.href="todayfood.html?recipesId="+recipesId+"&recipesDate="+recipesDate;
		},
		//跳转首页
		toIndex:function(){
			window.location.href='../index.html?id='+openIdItem
		},
		//返回
		generateRecipes:function(){
			window.location.href='recipes.html'
		},

    }
	
});