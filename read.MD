#项目结构

--jkyy-foodmatch  B端配餐项目
    |-- h5-config 项目环境配置文件
    |-- | -- open 对外
    |-- | -- prod 生产环境
    |-- | -- test 测试环境

    |-- src 源码目录
    |-- |-- css  样式表
    |-- |-- data 数据
    |-- |-- image 图片资源
    |-- |-- js js文件
    |-- |-- sass  sass样式源文件
    |-- |-- views  页面试图
    |-- |-- index.html 入口
    |-- node-modules  依赖包
    |-- package.json  项目包管理
    |-- gulpfile.js  项目构建文件
    |-- read.MD 项目说明文件


>开发者 
1. svn或git更新项目
2. npm install 安装依赖
3. 本地开发服务 gulp dev 或者  npm run dev

>运维端部署
1. 通过npm或者yack安装依赖，npm install
2. 项目根目录h5-config为项目环境配置文件，将不同的环境配置文件替换到src/js目录下
3. 执行 npm run build 或者 gulp build（如果提示错误，可全局安转gulp即 npm install gulp -g)
4. 将生产的代码包，需输出一份对外（open）到项目jkyy-ego/output

>项目运行地址
项目运行地址（foodMatchtype为配餐编码，openIdItem为唯一用户id）
本地：localhost:3000/foodmatch/index.html?openIdItem=5656&foodMatchtype=7

配餐编码设置：
0 高血脂
1 糖尿病
2 肥胖
3 痛风
4 高血压
5 成人


测试：http://h5static.cs.jianzhishidai.cn/jkyy-foodmatchs/foodmatch/index.html?openIdItem=50310&foodMatchtype=2
生产：https://h5static.jianzhishidai.cn/foodmatch/index.html?openIdItem=50223332310&foodMatchtype=0
