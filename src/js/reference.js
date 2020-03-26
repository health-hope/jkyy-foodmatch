var openIdItem = window.localStorage.getItem("openIdItem") || "";
var foodMatchtype = window.localStorage.getItem("foodMatchtype") || "";
var foodMatchChannel = window.localStorage.getItem("foodMatchChannel") || "";
var echartsColor = ['#FECE55','#FE8B55', '#5DECDB', '#5DB1EC', '#915DEC', '#EC5DA4'];
new Vue({
	el: "#containerBox",
	data: {
		ratioData:[],		//能量占比的数据
		dataShowList:{},	//生成的列表代表色
		isActive:false,
		heat:"",			//总能量
		protein:"",			//蛋白质
		fat:"",				//脂肪
		carbohydrate:"",	//碳水化合物
		cholesterol:"",     //添加胆固醇
		mineral:{},			//矿物质
		vitamin:{},			//维生素
		dietaryFiber:"",	//膳食纤维 可能为空
		isShowSSXW:false,	//是否显示膳食纤维
		isShowReference:false,//是否显示每日营养参考
		isShowYS:false,			//是否显示叶酸
		folicAcid:"",			//叶酸 可能为空
	},
	mounted:function(){
        this.$nextTick(function(){
			//隐藏loading
			hideLoading();
			this.initData();
        })
    },
    methods:{
    	initData:function(){
			var that = this;
			if(isEmpty(foodMatchChannel)){
				var param={"type":JSON.parse(foodMatchtype),"openId":JSON.parse(openIdItem)};
			}else{
				var param={"type":JSON.parse(foodMatchtype),"openId":JSON.parse(openIdItem),"foodMatchChannel": JSON.parse(foodMatchChannel)};
			}
    		
			ajaxRequest('/v2/food/matching/diet/energy/ratio/query.do', "POST",param, function (data) {	
				if (data.retCode == "SUCCESS") {
					//隐藏loading
					hideLoading();
					//数据赋值
					that.ratioData = data.ratioData;//能量占比
					//显示echarts
					that.showEneryRatio();

					that.dataShowList = data.ratioData; //变量定义
					//赋值数据及重组
					that.dataProcess();
				} else {
					showTip(data.tooltip);
				}
			})

			ajaxRequest('/v2/food/matching/nutrient/reference/query.do', "POST", param, function (data) {
				if (data.retCode == "SUCCESS") {
						// //数据赋值
	                	that.heat = data.heat;//总能量
	                	that.protein = data.protein;//蛋白质
	                	that.fat = data.fat;//脂肪
	                	that.carbohydrate = data.carbohydrate;//碳水化合物
	                	that.mineral = data.mineral;//矿物质
						that.vitamin = data.vitamin;//维生素
						that.cholesterol  = data.cholesterol ; //胆固醇 
	                	if(data.dietaryFiber && data.dietaryFiber!=""){
	                		that.dietaryFiber = data.dietaryFiber;//膳食纤维
	                		that.isShowSSXW = true;
	                	}else{
	                		that.isShowSSXW = false;
	                	}
	                	if(data.vitamin.folicAcid && data.vitamin.folicAcid != ""){
	                		that.folicAcid = data.vitamin.folicAcid;//叶酸
	                		that.isShowYS = true;
	                	}else{
	                		that.isShowYS = false;
	                	}
	                	that.isShowReference = true;
	                	//隐藏loading
						hideLoading();
						//数据赋值
				} else {
					showTip(data.tooltip);
				}
			})
		},
		//处理数据
		dataProcess: function(){
			var that = this;
			for(var i=0;i<that.dataShowList.length;i++){
				 that.dataShowList[i].color = echartsColor[i]
			}

		},
		//显示图表
    	showEneryRatio: function(){
    		var that = this;
    		var myChart = echarts.init(document.getElementById('eneryRatio'));
    		var option = {
			    color: echartsColor,
			    series: [
			        {
			            name:'能量占比',
			            type:'pie',
			            radius: ['56%', '73%'],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: false,
			                    position: 'center'
			                },
			                emphasis: {
			                    show: false,
			                    textStyle: {
			                    	show:false,
			                        fontSize: '10',
			                        fontWeight: 'bold'
			                    }
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data:that.ratioData,
			        }
			    ]
			};
			myChart.setOption(option);
    	},
    	//生成食谱
		generateRecipes:function(){
			window.location.href = "weekdiet.html";
		},
		//跳转首页
		toIndex:function(){
			if(isEmpty(foodMatchChannel)){
				window.location.href=`../index.html?openIdItem=${JSON.parse(openIdItem)}&foodMatchtype=${parseInt(JSON.parse(foodMatchtype))}`
			}else{
				window.location.href=`../index.html?openIdItem=${JSON.parse(openIdItem)}&foodMatchtype=${parseInt(JSON.parse(foodMatchtype))}&foodMatchChannel=${parseInt(JSON.parse(foodMatchChannel))}`
			}
		 
		},
    }
});