var openIdItem = window.localStorage.getItem("openIdItem") || "";
var foodMatchtype = window.localStorage.getItem("foodMatchtype") || "";
var foodMatchChannel = window.localStorage.getItem("foodMatchChannel") || "";
new Vue({
	el: "#containerBox",
	data: {
		energyRatio: {},			//能量占比列表
		isActive: false,			//是否点中
		recipesInfo: {

		},			//一周食谱
		dietPrincipleDetl: [],	//饮食原则
		isShowBox: false,		//显示弹窗
		dateRangeStart: "",		//食谱周期开始
		dateRangeEnd: "",		//食谱周期结束
		breakfast: {},			//早餐
		breakfastAddition: {},	//早加
		lunch: {},				//午餐
		lunchAddition: {},		//午加
		dinner: {},				//晚餐
		dinnerAddition: {},		//晚加
		openIdItem: openIdItem,	//openIdItem openid
		isCreated: "",			//是否重新配餐
		isClickDiet: false,		//是否点击当前日期	
		clickData: getUrlParam("recipesDate") || "",			//当前查看食材日期
		recipesId: getUrlParam("recipesId") || "",				//食谱id
		actIdx: 0,				//当前渲染的日期index
		animateIndex: "",		//是否要加入动画
		typeString: "",			//餐类
		changeImgIndex: "",		//改变图片img
		isAddMeals: false,		//是否有加餐信息
	},
	mounted: function () {
		this.$nextTick(function () {
			if (!isEmpty(openIdItem)) {
				window.localStorage.setItem("openIdItem", openIdItem);
				this.initData();
			} else {
				showTip("id不能为空");
			}

		})
	},
	filters: {
		fomatDateHZ: function (value) {
			var valueDate = new Date(value);
			var month = valueDate.getMonth() + 1;
			var day = valueDate.getDate();
			return month + "月" + day + "日"
		}
	},
	methods: {
		//查看当前日期食谱
		weekDietXq: function (recipesId, recipesDate, openIdItem, index) {
			var that = this;
			that.actIdx = index;
			that.clickData = recipesDate;
			var param = { "type": JSON.parse(foodMatchtype), "openId": JSON.parse(openIdItem), "recipesDate": recipesDate, "recipesId": recipesId };


			ajaxRequest('/v2/food/matching/diet/detail/query.do', "POST", param, function (data) {
				if (data.retCode == "SUCCESS") {
					//隐藏loading
					hideLoading();
					//数据赋值
					that.breakfast = data.breakfast || {};
					that.breakfastAddition = data.breakfastAddition || {};
					// console.log(JSON.stringify(that.breakfastAddition))
					that.lunch = data.lunch || {};
					that.lunchAddition = data.lunchAddition || {};
					that.dinner = data.dinner || {};
					that.dinnerAddition = data.dinnerAddition || {};
					if (JSON.stringify(that.breakfastAddition) == "{}" && JSON.stringify(that.lunchAddition) == "{}" && JSON.stringify(that.dinnerAddition) == "{}") {
						that.isAddMeals = true;
					} else {
						that.isAddMeals = false;
					}
				} else {
					showTip(data.tooltip);
				}
			})
		},
		//食物估算
		estimate: function () {
			window.open("estimate.html");
		},
		//换一换
		changeRecipe: _debounce(function (item, mealType, name, index) {
			// name是一个变量值，代表当前接口文档以及初始化data里代表的字段名，此地写死，就可以在下面直接调用
			var that = this;
			that.changeImgIndex = index;
			setTimeout(function () {
				that.changeImgIndex = "";
			}, 300);
			that.animateIndex = index;
			that.typeString = name;
			// that.isAnimation = true;
			var changeData = { "recipesDate": that.clickData, "recipesId": that.recipesId, "foodName": item.foodName, "foodHeat": item.foodHeat, "openId": openIdItem, "mealType": mealType, "foodId": item.foodId };

			var param = { "type": JSON.parse(foodMatchtype), "openId": openIdItem };
			Object.assign(param, changeData);
			param.openId = JSON.parse(param.openId);
			ajaxRequest('/v2/food/matching/diet/changement/query.do', "POST", param, function (data) {
				console.log(data, "datashiwu")
				// var data = JSON.parse(data);

				if (data.retCode == "SUCCESS") {
					//隐藏loading
					hideLoading();
					//数据赋值	
					var keys = Object.keys(data.foodInfo)
					for (var i = 0; i < keys.length; i++) {
						item[keys[i]] = data.foodInfo[keys[i]]
					}
					that[name].heat = data.mealHeat;
					that.animateIndex = "";
					that.typeString = "";
					console.log(that[name])
				} else {
					showTip(data.tooltip);
				}
			})

			// $.ajax({
			//     url: CONFIG.baseUrl+"/jkyy-apps/h5/food/matching/diet/changement/query.do",
			//     type: "post",
			//     data: changeDataJson,
			//     crossDomain: true,
			//     dataType: "json",
			//     contentType: "application/json",
			//     success:function (data){
			//         if(data.retCode=="SUCCESS"){
			//         	//隐藏loading
			// 			hideLoading();
			// 			//数据赋值
			// 			// Object.assign(item,data.foodInfo)	
			// 			var keys=Object.keys(data.foodInfo)
			// 			for(var i=0;i<keys.length;i++){
			// 				// that.$set(item,keys[i],data.foodInfo[keys[i]])
			// 				item[keys[i]]=data.foodInfo[keys[i]]
			// 			}	
			// 			that[name].heat = data.mealHeat;
			// 			that.animateIndex = "";
			// 			that.typeString = "";
			// 			console.log(that[name])

			//         }else{
			// 			that.animateIndex = "";
			// 			that.typeString = "";
			//         	showTip(data.tooltip);
			//         }
			//     },
			// })
		}, 500),
		//初始化数据
		initData: function () {
			var that = this;
			that.isCreated = window.localStorage.getItem("isCreated") || "";
			// var param={"openId":openIdItem,"isCreated":that.isCreated};
			if(isEmpty(foodMatchChannel)){
				var param = { "type": JSON.parse(foodMatchtype), "openId": JSON.parse(openIdItem), "isCreated": that.isCreated };
			}else{
				var param = { "type": JSON.parse(foodMatchtype), "openId": JSON.parse(openIdItem), "isCreated": that.isCreated,"foodMatchChannel": JSON.parse(foodMatchChannel)};
			}
			ajaxRequest('/v2/food/matching/diet/recommendation/query.do', "POST", param, function (data) {
				console.log(data, "datashiwu")
				// var data = JSON.parse(data);

				if (data.retCode == "SUCCESS") {
					//隐藏loading
					hideLoading();

					//数据赋值
					that.recipesInfo = data.recipesInfo;//一周食谱
					that.recipesId = data.recipesInfo.recipesId;//食谱id
					that.dateRangeStart = that.recipesInfo.dateRangeStart;//周期开始
					that.dateRangeEnd = that.recipesInfo.dateRangeEnd;//周期结束
					that.dietPrincipleDetl = data.dietPrinciple.dietPrincipleDetl;//原则
					var currentDayNum = 0;
					for (var z = 0; z < data.recipesInfo.recipes.length; z++) {
						if (data.recipesInfo.recipes[z].isCurDay == "2") {
							currentDayNum = z;
						}
					}
					that.actIdx = currentDayNum;
					var defaultRecipesDate = data.recipesInfo.recipes[that.actIdx].recipesDate;//走当前天的数据
					that.weekDietXq(that.recipesId, defaultRecipesDate, openIdItem);//点击查看详情
				} else {
					showTip(data.tooltip);
				}
			})

			// $.ajax({
			//     url: CONFIG.baseUrl+"/jkyy-apps/h5/food/matching/diabetic/diet/recommendation/query.do",
			//     type: "post",
			//     data: data,
			//     crossDomain: true,
			//     dataType: "json",
			//     contentType: "application/json",
			//     success:function (data){
			//     	console.log(JSON.stringify(data));
			//         if(data.retCode=="SUCCESS"){
			//         	//隐藏loading
			// 			hideLoading();

			// 			//数据赋值
			// 			that.recipesInfo = data.recipesInfo;//一周食谱
			// 			that.recipesId = data.recipesInfo.recipesId;//食谱id
			// 			that.dateRangeStart = that.recipesInfo.dateRangeStart;//周期开始
			// 			that.dateRangeEnd = that.recipesInfo.dateRangeEnd;//周期结束
			// 			that.dietPrincipleDetl = data.dietPrinciple.dietPrincipleDetl;//原则
			// 			var currentDayNum = 0;
			// 			for(var z=0;z<data.recipesInfo.recipes.length;z++){
			// 				if(data.recipesInfo.recipes[z].isCurDay == "2"){
			// 					currentDayNum = z;
			// 				}
			// 			}
			// 			that.actIdx = currentDayNum;
			// 			var defaultRecipesDate = data.recipesInfo.recipes[that.actIdx].recipesDate;//走当前天的数据
			// 			that.weekDietXq(that.recipesId,defaultRecipesDate,openIdItem);//点击查看详情
			//         }else{
			//         	showTip(data.tooltip);
			//         }
			//     },
			// })

		},
		//返回
		backs: function () {
			
			if (window.localStorage.getItem('peicaned')) {
				if(isEmpty(foodMatchChannel)){
					window.location.href = `../index.html?openIdItem=${JSON.parse(openIdItem)}&foodMatchtype=${JSON.parse(foodMatchtype)}&twojoin=2`
				}else{
					window.location.href = `../index.html?openIdItem=${JSON.parse(openIdItem)}&foodMatchtype=${JSON.parse(foodMatchtype)}&twojoin=2&foodMatchChannel=${JSON.parse(foodMatchChannel)}`
				}
			} else {
				window.location.href = "reference.html";
			}
		},
		//查看食材
		currentMaterial: function () {
			var that = this;
			window.open("todayfood.html?recipesId=" + that.recipesId + "&recipesDate=" + that.clickData);
		},
		//营养目标
		reference: function () {
			window.location.href = "reference.html";
		},
		//关闭弹框
		shutDown: function () {
			var that = this;
			that.isShowBox = false;
		},
		//确定跳转到重新配餐
		sure: function () {
			var that = this;
			that.isShowBox = false;
			showLoading();
			that.isCreated = 1;
			window.localStorage.setItem("isCreated", that.isCreated);
			window.location.replace("condition.html");
			// that.initData();
			toScrollTop();
		},
		//重新配餐
		resetRecipes: function () {
			var that = this;
			that.isShowBox = true;
		},
		//跳转食谱详情
		recipesList: function (recipesId, recipesDate, openIdItem) {
			console.log(recipesId, recipesDate, openIdItem)
			window.location.href = "recipelist.html?recipesId=" + recipesId + "&recipesDate=" + recipesDate;
		},
		//跳转首页
		toIndex: function () {
			window.location.href = '../index.html?id=' + openIdItem
		},

	}

});