
new Vue({
	el: "#containerBox",
	data: {
		estimateList:{
			"title":["主食","米饭","面条、粉","菜肴","水果","坚果"],
			"imgList":[
				[
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/a4dbef32888d485fbbcdd50a120cb5d8.jpg?hash=FuJzF7bHgdjx3stHFmCF7zsgdzna&width=20716&height=1&fsize=0&scope=1","mark":"1个馒头≈120克","hot":"268大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/234133e5b1444926869c688cb0001c45.jpg?hash=Flf9Z3SvTU2cWfFx0Vl-Iij4NOax&width=21904&height=1&fsize=0&scope=1","mark":"1个包子≈120克","hot":"210大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/a4dbef32888d485fbbcdd50a120cb5d8.jpg?hash=FuJzF7bHgdjx3stHFmCF7zsgdzna&width=20716&height=1&fsize=0&scope=1","mark":"1个馒头≈120克","hot":"268大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/258651bce5af43fabc4d7ef6ade9fa86.jpg?hash=FvOwRp4S2Jx-HDKZ6FBPIlewqw4E&width=32893&height=1&fsize=0&scope=1","mark":"1盘(12个)饺子≈300克","hot":"570大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/d3d26c678a4f4b9a88089c46fad2cfb1.jpg?hash=Fi591pRqgis2_Ow2KskpPjSQntVL&width=23834&height=1&fsize=0&scope=1","mark":"1个馅饼≈120克","hot":"245大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/ba3fbf84fce743c19306c788326c63dc.jpg?hash=FmAJDWTjQvcTu8PwG65ctcE0TOa7&width=25196&height=1&fsize=0&scope=1","mark":"1片面包≈50克","hot":"157大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/51ee81cd1058420b992d29078b3ea33d.jpg?hash=FlL7Ptqp7y6IrnbafuJvDqASHR-M&width=21624&height=1&fsize=0&scope=1","mark":"1碗粥≈300克","hot":"144大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/b69dcc7207a64cd4a6d70ae2109a3454.jpg?hash=FlUUSpxVLLpOcH5QwZzjRiyKJV4n&width=40303&height=1&fsize=0&scope=1","mark":"1个大油条≈100克","hot":"388大卡"}
				],
				[
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/95f0d27377614e21b73d688e3c1d8e64.jpg?hash=Flbqv4C_tvY8qcg8dhQbkyjd70wn&width=26900&height=1&fsize=0&scope=1","mark":"1碗米饭≈200克","hot":"232大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/8f3bc0d005c14441aea6a1c5c2c37970.jpg?hash=Fu75GX8VRtNpo9Ra3wMojhqEx2ha&width=24618&height=1&fsize=0&scope=1","mark":"1餐盒米饭≈400克","hot":"464大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/ab3557e17c8e4ba2a27715d065a68d1a.jpg?hash=FtQ04yl3LkQkLosAAYYEm3xv9KcX&width=29666&height=1&fsize=0&scope=1","mark":"1份盖浇饭≈400克","hot":"448大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/2505a08e654a4855a3f1c800724d52f7.jpg?hash=FiaeRtbJW_vWnDY4i1KsIjSOjJ0M&width=26152&height=1&fsize=0&scope=1","mark":"食堂托盘1格米饭≈200克","hot":"232大卡"}
				],
				[
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/e16498816c2b45239f8a9c1ef914e692.jpg?hash=FgQJ_rUBzoS4guL4VqYNvkJlkhby&width=36672&height=1&fsize=0&scope=1","mark":"一碗汤面≈400克(不含汤)","hot":"400大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/84bcce1ee20f47199a13204e45a25c80.jpg?hash=FvTZtpfM-Db42ikSvw-pQNjmd-SA&width=37777&height=1&fsize=0&scope=1","mark":"1盘炒/拌面≈400克","hot":"496大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/7fdc9fcf3ba2423b9b82396480cfab38.jpg?hash=FlWvYwTpUFqnM5W032qhm6lN_MpF&width=36732&height=1&fsize=0&scope=1","mark":"1份米线≈400克(不含汤)","hot":"560大卡"}
				],
				[
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/c2650e45e5fe4aa596fc2b78d3f5c358.jpg?hash=FkUhykx_k5bIZ62pXM_RIJCwjExX&width=24270&height=1&fsize=0&scope=1","mark":"1块牛排≈200克","hot":"258大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/72aeb228c36b458c83722bbba375c8aa.jpg?hash=FgPxpB_zgji7M-qVWQWW2iMksFpg&width=33182&height=1&fsize=0&scope=1","mark":"1盘荤菜≈250克","hot":"220大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/7289268a20d048dd94f9532e786035bb.jpg?hash=FiVEJxVQx1uut4TLW49KFUC0eRdD&width=34180&height=1&fsize=0&scope=1","mark":"1盘素菜≈200克","hot":"88大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/45c946520e2847819e054224d0d7cbd9.jpg?hash=FlVUCn0Im3v4J5r8V4XdyLfNXXKD&width=40056&height=1&fsize=0&scope=1","mark":"1盘凉拌菜≈150克","hot":"72大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/d6b84ec2182f49d890985fd166a37dfc.jpg?hash=FiIWxIU6dmobF4IVHI1bCLVaYriU&width=26697&height=1&fsize=0&scope=1","mark":"1碗汤≈250克","hot":"130大卡"}
				],
				[
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/80ca9533abff46dda01b276a133d32f1.jpg?hash=FhjPtxMbywk1vzjy9NsafmT3sR7x&width=14948&height=1&fsize=0&scope=1","mark":"1个苹果≈250克(可食部质量)","hot":"133大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/0db31ddbfbad4d69955dec06dcfcfdf3.jpg?hash=FsyIoViep9usY6mwkcEa35w-LwUN&width=22694&height=1&fsize=0&scope=1","mark":"1根香蕉≈120克(可食部质量)","hot":"112大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/2c165dc86b2e4bf5a583fc9bd9d3145d.jpg?hash=FlcxgbPrdrAP6xueEhC6vlZTN5vf&width=29301&height=1&fsize=0&scope=1","mark":"1碟（20粒）葡萄≈200克","hot":"90大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/24d6ebb4c4154c269abb22b1a23d8eaa.jpg?hash=FgPgjNBE6Mr2l2GUHsFfEi2kKzKJ&width=29340&height=1&fsize=0&scope=1","mark":"1个橘子≈100克(可食部质量)","hot":"42大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/6371b63e2f354d5db63bb218185e8c79.jpg?hash=FkqIzDs48mysFYAQ9xDCEhj6psU4&width=25768&height=1&fsize=0&scope=1","mark":"1碟（10个）圣女果≈200克","hot":"44大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/ffde7171b1f74e58bd28d5c0272f5a92.jpg?hash=Fl3NzcN-q7N6ttty5_UwoUMGnCx8&width=35379&height=1&fsize=0&scope=1","mark":"1个大芒果≈200克(可食部质量)","hot":"70大卡"}
				],
				[
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/0207c370a98a45a6a99f64a3f6cf6541.jpg?hash=FltuV-1U6_lS4sD5tFfSIwRuq_2l&width=25713&height=1&fsize=0&scope=1","mark":"1碟（8个）核桃仁≈30克","hot":"194大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/e91d9d0089094755bfa0f3081f175028.jpg?hash=FsNfqkakZiP2rQtdNx9jnDEAZOnR&width=26222&height=1&fsize=0&scope=1","mark":"1碟（28粒）杏仁≈30克","hot":"173大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/e98e1ebddf6e430a966a5c02948493c3.jpg?hash=FklzB9JZG_pLSy0R3ZUrh-8KfDyk&width=25420&height=1&fsize=0&scope=1","mark":"1碟(24粒)开心果≈35克(可食部质量)","hot":"221大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/842fecf252b34c8fb081fe04cb35d0de.jpg?hash=FtOlcjR-ZDindMO-apGMsdbUwcds&width=27106&height=1&fsize=0&scope=1","mark":"1碟(18个)花生≈30克(可食部质量)","hot":"180大卡"},
					{"imgUrl":"https://files.public.jianzhishidai.cn/images/2/a42350dda11d4c6fbed2cf06512f2676.jpg?hash=FoTAHtvgGuTcesWCh93glhW3Rztj&width=31704&height=1&fsize=0&scope=1","mark":"1碟葵花子≈15g(可食部质量)","hot":"91大卡"}
				]
				
			]
		},
		actIdx:0,
	},
	mounted:function(){
		this.$nextTick(function(){
			//隐藏loading
			hideLoading();
        })
    },
    methods:{
    	estimateSort:function(item,index){
    		this.actIdx = index;
			// window.location.href = "thirdpage.html";
		}
    },

    
	
});


