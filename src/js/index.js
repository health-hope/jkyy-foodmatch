
window.localStorage.removeItem ("openIdItem");
window.localStorage.removeItem ("foodMatchtype");
window.localStorage.removeItem ("foodMatchChannel");
window.localStorage.removeItem ("peicaned");
// window.localStorage.removeItem ("userInfoNeed");
window.localStorage.setItem("openIdItem",JSON.stringify(getUrlParam("openIdItem")))
window.localStorage.setItem("foodMatchtype",JSON.stringify(getUrlParam("foodMatchtype")))
window.localStorage.setItem("foodMatchChannel",JSON.stringify(getUrlParam("foodMatchChannel")))
new Vue({
	el: "#containerBox",
	data: {
		imageUrl:"",
		planInfos:[],
		mealInfos:[],
		advantageInfos:[],
		proEndorsement:[],
		userInfoNeed:{},
		appScope:"",//人群范围
		planName:"",//方案名称
		isContentShow:false,//content内容默认不显示
	},
	mounted:function(){
		if(getUrlParam('token')) {
            window.sessionStorage.setItem('token',getUrlParam('token'))
        }
		function GetMatchingStats(id,cb){

			var openIdItem = getUrlParam("openIdItem");
			var foodMatchtype = getUrlParam("foodMatchtype");
			var param={"type":foodMatchtype,"openId":openIdItem};
			ajaxRequest('/v2/food/matching/user/status/find.do', "POST", param, function (data) {
				if(data.retCode=="SUCCESS"){
					if(data.foodMatch){
						var foodMatch = data.foodMatch;
						var foodMatchStatus = foodMatch.foodMatchStatus;//配餐状态
						cb(foodMatchStatus)
					}
				}else{
					showTip(data.retInfo);
				}
			})
		}
		console.log(!window.localStorage.getItem("peicaned")==true)

		
		
		if(!window.localStorage.getItem("peicaned")&&!getUrlParam("twojoin")){
			GetMatchingStats("2",function(foodMatchStatus){
				// alert(foodMatchStatus)
				if(foodMatchStatus == 1){
					localStorage.setItem("peicaned",true);
					
					window.localStorage.setItem("openIdItem",JSON.stringify(getUrlParam("openIdItem")))
					window.localStorage.setItem("foodMatchtype",JSON.stringify(getUrlParam("foodMatchtype")))
					window.localStorage.setItem("foodMatchChannel",JSON.stringify(getUrlParam("foodMatchChannel")))
					 window.location.href="views/weekdiet.html";
					 
					//  alert("测试配餐中，请携带id参数跳转到weekdiet.html")
				}else{
					$("body").css("display","block");
				}
			})
		}else{
			$("body").css("display","block");
		}
		this.$nextTick(function(){
			//显示loading
			showLoading();
			this.getInitData();
			

		})

		
		// let foodMatchtype = parseInt(JSON.parse(getUrlParam("foodMatchtype")))  ;
		// switch(foodMatchtype)
		// {
		// 	case 0:
		// 	  this.name="健康膳食管理方案"
		// 		break;
		// 	// case 1:
		// 	// this.name="糖尿病膳食管理方案"
		// 	// 	break;
		// 	case 2:
		// 	this.name="肥胖膳食管理方案"
		// 		break;
		// 	case 3:
		// 	this.name="高血压膳食管理方案"
		// 		break;
		// 	case 4:
		// 	this.name="痛风膳食管理方案"
		// 		break;
		// 	case 5:
		// 	this.name="血脂异常膳食管理方案"
		// 		break;
		// 	default:
		// 		return
		// }
    },
    methods:{
    	start:function(){
			window.location.href = "./views/condition.html"
		},
		getInitData(){
			/* 
			    0 高血脂
				1 糖尿病
				2 肥胖
				3 痛风
				4 高血压
				5 成人
			 */
			var param={"type":getUrlParam("foodMatchtype")}
		
			ajaxRequest('/v2/food/matching/index.do', "POST",param,(data)=>{
				console.log(data,"initdata");
				if(data.retCode=="SUCCESS"){
					//数据赋值
					this.imageUrl = data.imageUrl;
					this.planInfos = data.planInfos;
					this.mealInfos = data.mealInfos;
					this.advantageInfos = data.advantageInfos;
					this.proEndorsement = data.proEndorsement;
					this.planName = data.planName;
					document.title = data.planName;
					this.appScope = data.appScope[0];
					// console.log(this.appScope,"data",data)
					// 基础信息配置
					this.userInfoNeed = data.userInfoNeed;
					window.localStorage.setItem("userInfoNeed",JSON.stringify(this.userInfoNeed))
					window.localStorage.setItem("openIdItem",JSON.stringify(getUrlParam("openIdItem")))
					window.localStorage.setItem("foodMatchtype",JSON.stringify(getUrlParam("foodMatchtype")))
					window.localStorage.setItem("foodMatchChannel",JSON.stringify(getUrlParam("foodMatchChannel")))
					//隐藏loading
					hideLoading();
					this.isContentShow = true;

				}else{
					this.isContentShow = false;
					showTip(data.retInfo);
				}
	  
			})
		}
    },

    
	
});


