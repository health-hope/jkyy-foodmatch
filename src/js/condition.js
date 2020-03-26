
var openIdItem = window.localStorage.getItem("openIdItem")  || "";
var foodMatchtype = window.localStorage.getItem("foodMatchtype") || "";

//人群分类
var diabetesPeople = [
	{
		"value": "0",
		"text": "儿童"
	},
	{
		"value": "1",
		"text": "青少年"
	},
	{
		"value": "2",
		"text": "成人（肾功能正常）"
	}
];
// var openIdItem = "ojdgu5fKsIkDXvLdYfR6Z5Ewmv04";
var currentTime;
var vm = new Vue({
	el: "#containerBox",
	data: {
		currentSex: 1,				//初始选中 性别
		currentUserActivityLevel: 1, //初始选中 劳动强度
		foodPreference: [0],			//食物偏好
		meals: [],					//配餐种类
		isNext: false,				//是否可以点下一步
		userName: "",				//用户名
		age: "",				//生日
		nation: "",					//民族
		pregnancyNum:"",           //孕期编号   1:早, 2:中,3:晚
		pregnancyPeriod:"",        //孕期选中文字   
		diabetesPeople: [],				//人群分类
		peopleSortType: "",			//患病人群分类类型 0，1，2，3，4，5
		address: "",					//地区 省+市
		province: "",				//省
		city: "",					//市
		weight: "",					//体重
		height: "",					//身高
		notEat: [],					//不吃什么
		foodList: [],				//不吃食物搜索查询列表
		notEatInput: "",				//不吃什么输入
		endYear: "",					//获取年
		isShowNotEatBox: false,		//是否显示不吃食物
		newCurrentFoodData: [],		//当前选中的食物列表
		userInfoNeed: JSON.parse(window.localStorage.getItem("userInfoNeed")),	//用户基础信息配置
		pregnancyShow:false,  // 孕期   true显示 ,false 不显示
	},
	computed: {
		isActive: function () {
			this.isNext = false;
			// 后台给的所以选择的项目
			var mustInit = this.userInfoNeed;
			// 必须需要校验的项
			var musts = [];
			for (let key in mustInit) {
				if(mustInit[key]==0){
					// alert(key)
					musts.push(key)
				}
			}
			
			console.log(musts,"m222usts")
			// 排除默认选项，不用校验的，剩下的应该可以需要校验。
			var option = ["userName","address", "age", "diabetesPeople", "height","weight","pregnancyPeriod"]



			// 求数组交集
			
			var must = option.filter(v => musts.includes(v))
			
			console.log(must,"必须校验！")
			
			if(must&&must.length>0&&this.height>=100&&this.height<=250&&this.weight>=25&&this.weight<=199){
				// console.log(vm.$data[aa]);

				var full= must.every(function (item, index, arr) {
					return vm.$data[item] != ""
				})
				
				if(full){
					this.isNext = true;
					return true;
				}else{
					this.isNext = false;
					return false;
				}
			}
		},
		peopleSortJson: function () {
			var that = this;
			var age;
			if (that.age != "") {
				age = birthdayToAge(that.age);
			} else {
				age = "";
			}
			if (that.currentSex == "1" && age == "") {
				diabetesPeople = [
					{
						"value": "0",
						"text": "儿童"
					},
					{
						"value": "1",
						"text": "青少年"
					},
					{
						"value": "2",
						"text": "成人（肾功能正常）"
					}
				];
			}
			if (that.currentSex == "2" && age == "") {
				diabetesPeople = [
					{
						"value": "0",
						"text": "儿童"
					},
					{
						"value": "1",
						"text": "青少年"
					},
					{
						"value": "2",
						"text": "成人（肾功能正常）"
					},
					{
						"value": "3",
						"text": "孕早期"
					},
					{
						"value": "4",
						"text": "孕中期"
					},
					{
						"value": "5",
						"text": "孕晚期"
					}
				];
			}
			if (age >= 3 && age <= 18) {
				diabetesPeople = [
					{
						"value": "0",
						"text": "儿童"
					},
					{
						"value": "1",
						"text": "青少年"
					}
				];
			} else if (age > 18 && that.currentSex == "1") {
				diabetesPeople = [
					{
						"value": "2",
						"text": "成人（肾功能正常）"
					}
				];
			} else if (age > 18 && that.currentSex == "2") {
				diabetesPeople = [
					{
						"value": "2",
						"text": "成人（肾功能正常）"
					},
					{
						"value": "3",
						"text": "孕早期"
					},
					{
						"value": "4",
						"text": "孕中期"
					},
					{
						"value": "5",
						"text": "孕晚期"
					}
				];
			}
			return diabetesPeople;
		}
	},
	mounted: function () {
		
		this.$nextTick(function () {
			
			//隐藏loading
			hideLoading();
			this.initData();
			this.endYear = new Date().getFullYear() - 3;
		})
	},
	filters: {
		foodNameFilters: function (value) {
			return value
		}
	},
	watch: {
		userName:function(nVal,oVal){
			 if(nVal.length>10){
				 this.userName = oVal
			 }
		},
		//监听peopleSortJson 数据变化获取当前数据内容
		peopleSortJson: function (newVal) {
			//newVal 即 全局变量 computed 返回的值
			var isTrueValue = false;
			for (var p = 0; p < newVal.length; p++) {
				if (newVal[p].value == this.peopleSortType) {
					isTrueValue = true;
					return;
				}
			}
			if (!isTrueValue) {
				this.diabetesPeople = (newVal[0] || {}).text;
				this.peopleSortType = (newVal[0] || {}).value;
			}
		},

		//校验数据
		height: function (nVal,oVal) {
			var that = this;
			function NumberCheck(num){
				var re=/^\d*\.{0,1}\d{0,1}$/;
				return re.exec(num) != null;
			}
			if(!NumberCheck(that.height)){
				showTip("请输入数字且只能输入一位小数");
				that.height = oVal;
				return false;
			}else{
				return true;
			}
			// var reg = new RegExp(/^[0-9]+([.][0-9]{1}){0,1}$/);
			// if (reg.test(that.height)) {
			// 	return true;
			// } else {
			// 	showTip("请输入数字且只能输入一位小数");
			// 	return false;
			// }
		},
		weight: function (nVal,oVal) {
				var that = this;
				function NumberCheck(num){
					var re=/^\d*\.{0,1}\d{0,1}$/;
					return re.exec(num) != null;
				}
				if(!NumberCheck(that.weight)){
					showTip("请输入数字且只能输入一位小数");
					that.weight = oVal;
					return false;
				}else{
					return true;
				}

			// var reg = new RegExp(/^[0-9]+([.][0-9]{1}){0,1}$/);
			// if (!reg.test(that.weight)) {
			// 	return true;
			// } else {
			// 	showTip("请输入数字且只能输入一位小数");
			// 	return false;
			// }
		},
		//模糊查询食物
		notEatInput: function () {
			var that = this;
			currentTime = new Date().getTime();
			setTimeout(function () {
				var nowTime = new Date().getTime();
				if (nowTime - currentTime >= 900) {
					currentTime = nowTime;
					console.log(that.notEatInput)
					if (that.notEatInput != "") {
						$("#notEat").blur()
						var data = { "queryContent": that.notEatInput, "pageSize": "6", "neFoodId": "" };
						that.searchFood(data);
					}
				}
			}, 900);

		},
	},
	methods: {
		//添加
		foodNameSelected: function (item) {
			var that = this;
			// if(that.newCurrentFoodData.length<3){
			that.newCurrentFoodData.push(item);
			that.isShowNotEatBox = false;
			that.notEatInput = "";
			that.notEat.push(item.foodData.foodName);
			console.log(that.notEat)
			// }
		},
		//删除
		del: function (index) {
			var that = this;
			// that.newCurrentFoodData.splice(index,1);
			that.notEat.splice(index, 1);
			console.log(that.notEat)
		},
		//查询食物
		searchFood: function (datas) {
			$('.loding-nocat').css('display','block')
			var that = this;
			ajaxRequest('/v2/content/food2/name/like.do', "POST", JSON.stringify(datas), function (data) {
				// console.log(data,"datashiwu")
				
				// var data = JSON.parse(data);
				
				if (data.retCode == "SUCCESS") {
					$('.loding-nocat').css('display','none')
					if (data.foodList && data.foodList.length > 0) {
						//数据赋值
						
						that.foodList = data.foodList;
						that.isShowNotEatBox = true;
						console.log(that.foodList,that.isShowNotEatBox,11)
					} else {
						that.isShowNotEatBox = false;
						showTip("暂无数据");
					}
				} else {
					showTip(data.tooltip);
				}
			})

		},
		// searchFood: function (datas) {
		// 	var that = this;
		// 	ajaxRequest('/v2/content/food2/name/like.do', "POST", datas, function (data) {
		// 		var data = JSON.parse(data);
		// 		if (data.retCode == "SUCCESS") {
		// 			if (data.foodList && data.foodList.length > 0) {
		// 				//数据赋值
		// 				that.foodList = data.foodList;
		// 				that.isShowNotEatBox = true;
		// 			} else {
		// 				that.isShowNotEatBox = false;
		// 				showTip("暂无数据");
		// 			}
		// 		} else {
		// 			showTip(data.tooltip);
		// 		}
		// 	})
		// },
		//数据回调，已完成配餐显示
		initData: function () {
			var that = this;
			var param = { "openId":JSON.parse(openIdItem) , "type": JSON.parse(foodMatchtype) };

			ajaxRequest('/v2/food/matching/user/info/query.do', "POST", JSON.stringify(param), function (data) {
				if (data.retCode == "SUCCESS") {
					if (data.basicInfo) {
						//数据赋值
						that.userName = data.basicInfo.userName;
						that.age = data.basicInfo.birthday;
						that.currentSex = data.basicInfo.sex;
						that.nation = data.basicInfo.nation;
						that.province = data.basicInfo.province;
						that.city = data.basicInfo.city;
						that.address = data.basicInfo.province + " " + data.basicInfo.city;

						that.weight = data.physicalInfo.weight;
						that.height = data.physicalInfo.height;

						// else{
						that.peopleSortType = data.physicalInfo.people;
						switch (that.peopleSortType) {
							case "0":
								that.diabetesPeople = "儿童"; break;
							case "1":
								that.diabetesPeople = "青少年"; break;
							case "2":
								that.diabetesPeople = "成人（肾功能正常）"; break;
							case "3":
								that.diabetesPeople = "孕早期"; break;
							case "4":
								that.diabetesPeople = "孕中期"; break;
							case "5":
								that.diabetesPeople = "孕晚期"; break;
							default:
								that.diabetesPeople = "";
						}
						that.pregnancyNum=data.physicalInfo.pregnancyPeriod;
						switch (that.pregnancyNum) {
							case "1":
								that.pregnancyPeriod = "妊娠早期，0-12周1"; break;
							case "2":
								that.pregnancyPeriod = "妊娠中期，13-28周"; break;
							case "3":
								that.pregnancyPeriod = "妊娠后期，29-40周"; break;
							default:
								that.pregnancyPeriod = "";
						}
						that.foodPreference = data.dietRecommend.preference;
						// that.notEatInput=data.dietRecommend.notEat;
						that.notEat = data.dietRecommend.notEat;
						that.currentUserActivityLevel = data.dietRecommend.userActivityLevel;
						that.meals = data.dietRecommend.extraMealList;
					}

				} else {
					showTip(data.tooltip);
				}
			})

		},
		//显示日期插件
		showDate: function (ev) {
			var that = this;

			if(parseInt( JSON.parse(foodMatchtype))==5){
				 //获取完整的日期
				var date=new Date;
				var year=date.getFullYear(); 
				// var month=date.getMonth()+1;
				let jkbeginYear = year-60;
				let jkendYear = year-18;
				var options = {
					"type": "date",
					beginYear: jkbeginYear,
					endYear: jkendYear,
				};
			}else{
				 //获取完整的日期
				 var date=new Date;
				 var year=date.getFullYear(); 
				 // var month=date.getMonth()+1;
				 let jkbeginYear = year-120;
				 let jkendYear = year-18;
				 var options = {
					 "type": "date",
					 beginYear: jkbeginYear,
					 endYear: jkendYear,
				 };
			}


			var picker = new mui.DtPicker(options);
			picker.setSelectedValue(that.age || '1980-01-01', 100, function () {
			});
			document.activeElement.blur();//屏蔽默认键盘弹出；
			setTimeout(function () {
				picker.show(function (rs) {
					// $("#birthday").val(rs.text);
					that.age = rs.text;
					picker.dispose();
				})
			}, 200);
		},
		//显示地区
		showRegion: function () {
			var that = this;
			var city_picker = new mui.PopPicker({ layer: 2 });
			city_picker.setData(init_city_picker);

			//回显
			var citytext = $("#region").val();
			//截取拼接字符串
			var arrCity = citytext.split(" ");
			var province = arrCity[0];
			var city = arrCity[1];
			for (var i = 0; i < init_city_picker.length; i++) {
				if (province == init_city_picker[i].text) {
					city_picker.pickers[0].setSelectedIndex(i);
					// var provinces = i;
					for (var j = 0; j < init_city_picker[i].children.length; j++) {
						if (city == init_city_picker[i].children[j].text) {
							city_picker.pickers[1].setSelectedIndex(j);
						}
					}
				}
			}
			document.activeElement.blur();//屏蔽默认键盘弹出；
			setTimeout(function () {
				city_picker.show(function (getSelectedItems) {
					console.log(getSelectedItems)
				});
				city_picker.show(function (items) {
					// $("#region").val((items[0] || {}).text + " " + (items[1] || {}).text);
					that.address = (items[0] || {}).text + " " + (items[1] || {}).text;
					that.province = (items[0] || {}).text;
					that.city = (items[1] || {}).text;
				});
			}, 200);
		},
		//显示民族
		showNation: function () {
			var that = this;
			var nationPicker = new mui.PopPicker();
			nationPicker.setData(nation);
			//回显
			var nationActive = $("#nation").val();
			for (var z = 0; z < nation.length; z++) {
				if (nationActive == nation[z].text) {
					nationPicker.pickers[0].setSelectedIndex(z);
				}
			}
			document.activeElement.blur();//屏蔽默认键盘弹出；
			setTimeout(function () {
				nationPicker.show(function (items) {
					// $("#nation").val((items[0] || {}).text);
					that.nation = (items[0] || {}).text;
					//返回 false 可以阻止选择框的关闭
					//return false;
				});
			}, 200);

		},
		//显示孕期
		showPregnancy: function () {
			var that = this;
			var pregnancyPicker = new mui.PopPicker();
			pregnancyPicker.setData([
				{value: "01", text: "妊娠早期，0-12周"},
				{value: "02", text: "妊娠中期，13-28周"},
				{value: "03", text: "妊娠后期，29-40周"},
			]);
			//回显
			var pregnancyActive = $("#pregnancy").val();
			for (var z = 0; z < pregnancy.length; z++) {
				if (pregnancyActive == pregnancy[z].text) {
					pregnancyPicker.pickers[0].setSelectedIndex(z);
				}
			}
			document.activeElement.blur();//屏蔽默认键盘弹出；
			setTimeout(function () {
				pregnancyPicker.show(function (items) {
					// $("#nation").val((items[0] || {}).text);
					that.pregnancyPeriod = (items[0] || {}).text;
					//返回 false 可以阻止选择框的关闭
					//return false;
				});
			}, 200);

		},
		//显示人群分类
		showPeople: function () {
			var that = this;
			var peoplePicker = new mui.PopPicker();
			console.log(that.peopleSortJson)
			peoplePicker.setData(that.peopleSortJson);
			//回显
			var peopleSortActive = $("#peopleSort").val();
			for (var m = 0; m < peopleSort.length; m++) {
				if (peopleSortActive == diabetesPeople[m].text) {
					peoplePicker.pickers[0].setSelectedIndex(m);
				}
			}
			document.activeElement.blur();//屏蔽默认键盘弹出；
			setTimeout(function () {
				peoplePicker.show(function (items) {
					// $("#peopleSort").val((items[0] || {}).text);
					that.diabetesPeople = (items[0] || {}).text;
					that.peopleSortType = (items[0] || {}).value;
					console.log(that.peopleSortType)
					//返回 false 可以阻止选择框的关闭
					//return false;
				});
			}, 200);
		},
		//下一步
		submit: function () {
			var that = this;
			if((this.height<100||this.height>250)&&this.height!=""){
				showTip("身高在100cm~250cm");
			}
			if((this.weight<25||this.weight>199)&&this.weight!=""){
				showTip("体重在25kg~199kg");
			}
			if (that.isNext == true) {
				//显示loading
				showLoading();
				switch (that.pregnancyPeriod) {
					case "妊娠早期，0-12周":
						that.pregnancyNum = "1"; break;
					case "妊娠中期，13-28周":
						that.pregnancyNum = "2"; break;
					case "妊娠后期，29-40周":
						that.pregnancyNum = "3"; break;
					default:
						that.pregnancyNum = "";
				}
				var basicInfo = { "userName": that.userName, "birthday": that.age, "sex": that.currentSex, "nation": that.nation, "province": that.province, "city": that.city };//基础信息
				var physicalInfo = { "weight": that.weight, "height": that.height, "people": that.peopleSortType ,"pregnancyPeriod":that.pregnancyNum};//体质信息
				var dietRecommend = { "preference": that.foodPreference, "notEat": that.notEat, "userActivityLevel": that.currentUserActivityLevel, "extraMealList": that.meals };//饮食推荐
				var param = { "openId": JSON.parse(openIdItem), "type":JSON.parse( foodMatchtype), "basicInfo": basicInfo, "physicalInfo": physicalInfo, "dietRecommend": dietRecommend };
				ajaxRequest('/v2/food/matching/user/info/upsert.do', "POST",JSON.stringify(param), function (data) {
					if (data.retCode == "SUCCESS") {
						window.location.href = "reference.html";
					} else {
						showTip(data.tooltip);
					}

				})

			} else {
				return false
			}

		},
		start: function () {
			window.location.href = "condition.html";
		},
		// 点击增加样式
		bindCheckedInput: function (type, sort, val) {
			//若为单选
			if (type == "radio") {
				if (sort == "sex") {//性别
					this.currentSex = val;

				} else if (sort == "userActivityLevel") {//劳动强度
					this.currentUserActivityLevel = val;
				} else if (sort == "extraMealList") {
					this.currentExtraMealList = val;
				}
			}
		},
		//跳转首页
		toIndex: function () {
			var openIdItem = JSON.parse( window.localStorage.getItem("openIdItem")) || "";
			var foodMatchtype =parseInt( JSON.parse(window.localStorage.getItem("foodMatchtype") ))|| "";
			console.log(openIdItem+"..."+foodMatchtype);
// console.log(typeof window.localStorage.getItem("foodMatchtype"))
			if(window.localStorage.getItem("foodMatchtype")!==""&&parseInt( JSON.parse(window.localStorage.getItem("foodMatchtype") ))==""){
				window.location.href = `../index.html?openIdItem=${openIdItem}&foodMatchtype=0`
			}else{
				window.location.href = `../index.html?openIdItem=${openIdItem}&foodMatchtype=${foodMatchtype}`
			}
		},

	}

});


