var openIdItem = window.localStorage.getItem("openIdItem") || "";
new Vue({
	el: "#containerBox",
	data: {
		isActive:false,									//是否点中
		isShowBox:false,	
		breakfast:{},									//早餐
		breakfastAddition:{},							//早加
		lunch:{},										//午餐
		lunchAddition:{},								//午加
		dinner:{},										//晚餐
		dinnerAddition:{},								//显示弹窗
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
    	
			var openIdItem = window.localStorage.getItem("openIdItem") || "";
			var foodMatchtype = window.localStorage.getItem("foodMatchtype") || "";
			var param={"openId":JSON.parse(openIdItem) ,"recipesDate":this.recipesDate,"recipesId":this.recipesId,"type":JSON.parse(foodMatchtype)};

			ajaxRequest('/v2/food/matching/diet/material/query.do', "POST",param, (data) => {
				if(data.retCode=="SUCCESS"){
					//隐藏loading
					hideLoading();
					//数据赋值
					this.breakfast = data.breakfast || {};
					this.breakfastAddition = data.breakfastAddition || {};
					this.lunch = data.lunch || {};
					this.lunchAddition = data.lunchAddition || {};
					this.dinner = data.dinner || {};
					this.dinnerAddition = data.dinnerAddition || {};

				}else{
					showTip(data.tooltip);
				}
			})
    	},
    	//营养目标
		reference:function(){
			window.location.href = "recipes.html";
		},
		//返回食谱
		recipeList:function(){
			var that = this;
			window.location.href="weekdiet.html?recipesDate="+that.recipesDate+"&recipesId="+that.recipesId;
		},
		//跳转首页
		toIndex:function(){
			window.location.href='../index.html?id='+openIdItem
		},
    	//生成食谱
		generateRecipes:function(){
			var that = this;
			window.location.href="weekdiet.html?recipesDate="+that.recipesDate+"&recipesId="+that.recipesId;
		},

    }
	
});