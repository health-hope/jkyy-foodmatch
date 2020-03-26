var openIdItem = window.localStorage.getItem("openIdItem") || "";
new Vue({
	el: "#containerBox",
	data: {
		energyRatio:{},			//能量占比列表
		isActive:false,			//是否点中
		recipesInfo:{},			//一周食谱
		dietPrincipleDetl:[],	//饮食原则
		isShowBox:false,		//显示弹窗
		dateRangeStart:"",		//食谱周期开始
		dateRangeEnd:"",		//食谱周期结束
		openIdItem: openIdItem,	//openIdItem openid
		isCreated:"",			//是否重新配餐

	},
	mounted:function(){
        this.$nextTick(function(){
			this.initData();
        })
    },
    filters: {
    	fomatDateHZ:function(value){
    		var valueDate = new Date(value);
    		var month = valueDate.getMonth()+1; 
    		var day = valueDate.getDate();
    		return month+"月"+day+"日"
    	}
    },
    methods:{
    	initData: function(){
    		var that = this;
    		var param={"openId":openIdItem,"isCreated":that.isCreated};
    		var data=JSON.stringify(param);
    		$.ajax({
	            url: CONFIG.baseUrl+"/jkyy-apps/h5/food/matching/diabetic/diet/recommendation/query.do",
	            type: "post",
	            data: data,
	            crossDomain: true,
	            dataType: "json",
	            contentType: "application/json",
	            success:function (data){
	            	console.log(JSON.stringify(data));
	                if(data.retCode=="SUCCESS"){
	                	//隐藏loading
						hideLoading();
						//数据赋值
						that.recipesInfo = data.recipesInfo;//一周食谱
						that.dateRangeStart = that.recipesInfo.dateRangeStart;//周期开始
						that.dateRangeEnd = that.recipesInfo.dateRangeEnd;//周期结束
						that.dietPrincipleDetl = data.dietPrinciple.dietPrincipleDetl;//原则
	                }else{
	                	showTip(data.tooltip);
	                }
	            },
	        })
    		
    	},
    	//营养目标
		reference:function(){
			window.location.href = "reference.html";
		},
		//关闭弹框
		shutDown: function(){
			var that=this;
			that.isShowBox = false;
		},
		//确定跳转到重新配餐
		sure:function(){
			var that = this;
			that.isShowBox = false;
			showLoading();
			that.isCreated = 1;
			that.initData();
			toScrollTop();
		},
		//重新配餐
		resetRecipes:function(){
			var that = this;
			that.isShowBox = true;
		},
		//跳转食谱详情
		recipesList:function(recipesId,recipesDate,openIdItem){
			console.log(recipesId,recipesDate,openIdItem)
			window.location.href="recipelist.html?recipesId="+recipesId+"&recipesDate="+recipesDate;
		},
		//重新配餐
		resetRecipes:function(){
			var that = this;
			that.isShowBox = true;
			
		},
		//跳转首页
		toIndex:function(){
			window.location.href='../index.html?id='+openIdItem
		},

    }
	
});