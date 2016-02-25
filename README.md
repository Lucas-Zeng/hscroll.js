README
===========================
一款轻量级的横向滚动插件
****
###　　　　　　　　　　　　Author:Lucas-Zeng
###　　　　　　　　　 E-mail:247934556@qq.com

===========================

##<a name="index"/>目录
* [基本用法](#basic)
* [options详解](#options)
* [对象方法](#methods)
* [实例](#eg)


    
##<a name="basic"/>基本用法
	<div class="wrap">
		<div class="scrollWrap">
			<div class="item" style="border-bottom-color:red;">1</div>
			<div class="item" style="border-bottom-color:green;">2</div>
			<div class="item" style="border-bottom-color:yellow;">3</div>
			<div class="item" style="border-bottom-color:blue;">4</div>
		</div>
	</div>

	//js
	<script src="../dist/hscroll.min.js"></script>
    var hs = new HScroll( '.scrollWrap' , {
		currentX: 0,
		isWindowScrollable: false
    });
    
######如果不想设置scrollWrap的的宽度，请给scrollWrap设置display: inline-flex;属性方可自动撑开宽度而不换行。


##<a name="options"/>options详解
#####currentX [number] 初始化时给滚动条一个已滚动值。默认值为0。
#####isWindowScrollable [boolean] 拖动滚动条时，是否可以拖动页面。默认值为false。 

##<a name="methods"/>对象方法
#####disableHScroll() 解除拖动事件绑定。
	var hs = new HScroll( '.scrollWrap' );
	hs.disableHScroll();

#####resetHScroll( options ) 重新初始化拖。options与初始化options参数一样。
	var hs = new HScroll( '.scrollWrap' );
	hs.disableHScroll();
	hs.resetHScroll({
		currentX: -100,
		isWindowScrollable: true
	})
    
##<a name="eg"/>实例：详见example/hscroll.html