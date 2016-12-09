$(function(){
	
	$.ajax({
		type:"get",
		url:"../data/goodList/iPhone7.json",
		success:function(reg){
			xqdate(reg.data);		
		}
	})
	//详情
	var id = window.location.search.replace('?', '')
	console.log(id)
	function xqdate(data){
//		console.log(data);
		$.each(data,function(){
			if(this.index==id){
				$('#smallpic').find('img').attr('src',this.img);
				$('#bigpic').find('img').attr('src',this.img);
				$('.inner_dl>dd').find('img').attr('src',this.img);
				$('.product_name').text(this.topname);
				$('.hot_col').text(this.price);
				$('.pin').text(this.evaluation);
				$('.vals').text(this.volume);
				$('.on_name').text(this.onname)
			}
			
		})
	}
	
//加到购物车
$('.submin_add').on('click',function(){
	//e.target    //点击的a 标签；
	console.log("购买商品");
	//把产品信息存在cookie里面
	 //获取title
	 var title = $('.product_name').html();
	 //price
	 var price = $('.hot_col').html();

	 //img
	 var img = $('#smallpic').find('img').attr('src');
	 
//	 console.log(img)
	var shop = $('.on_name').html();
	console.log(shop);
	 //新的产品信息
	 var obj = {"title":title,"price":price,"img":img,"shop":shop};
//						 
	 var strCookie =  $.cookie("good");    //strCookie 是存在cookie里面的产品信息
	 
//	 console.log(strCookie);				
//						//将cookie字符串转换成对象；
//						
//						//oCookie保存了所有的产品信息

	//对返回的cookie 进行判断 如果为空 
	
	var  bGood = false;  //代表没有信息
	if(strCookie == undefined || strCookie =="" ){
									//如果完成没有产品信息
		var oCookie = [];
		var newGood = {"title":title,data:obj,num:1}//新的完整的产品信息
		oCookie.push(newGood);

	}else{
		var oCookie = JSON.parse(strCookie);
		//[{title:商品名称,data:{title:title,price:price,img:url},num:购买的数量},{}]
		//目的 查找商品是否已经有购买信息
		//如果有购买信息 num+1
		//没有 生成一个新的产品信息
		
		$.each(oCookie,function(){
			//如果在cookie里面能够找到产品信息  
			//对数量+1 num+1
			if(this.title ==title){
				var num = parseInt(this.num)+1;   //为了防止num是字符串 讲字符串转换成int
				this.num = num;
				bGood =true  ;  //表示产品有信息
			}
		})
		
		//cookie存在产品信息 但是没有当前购买的产品的信息
		if(bGood==false){
			//生成新的商品信息
			var newGood = {"title":title,data:obj,num:1}//新的完整的产品信息
			oCookie.push(newGood);
		}
	}
//						//$.cookie('good',"将要保存的产品信息");
//						//表示没有商品信息
//						if(bGood==false){
//							//生成新的商品信息
//							var newGood = {"title":title,data:obj,num:0}//新的完整的产品信息
//							oCookie.push(newGood);
//							
//						}
//						
//						//重新设置cookie
	$.cookie("good",JSON.stringify(oCookie),{expires:7 , path:"/"});
//						
	console.log($.cookie("good"));
	alert('成功加入购物车');
	window.location.reload();            
	//json
	
	//[{title:商品名称,data:{title:title,price:price,img:url},num:购买的数量},{}]					
})
	

//放大镜
	var $smallpic = $('#smallpic');
	
	var $pos   = $('#pos');
	
	var  $bigpic = $('#bigpic img');
	$(document).mousemove(function(e){
		//e.pageX  e.pageY ; //鼠标位置
		//$('#smallpic').offset(); 小框的位置
//			console.log(e.pageX);
//			console.log(e.pageY);
		var smallOffset = $smallpic.offset();
			if(e.pageY >= smallOffset.top &&e.pageX>=smallOffset.left && e.pageX<= smallOffset.left + $smallpic.outerWidth() && e.pageY <= smallOffset.top + $smallpic.outerHeight()){
				$('#pos').show();
				$('#bigpic').show();
				
				//算出 遮罩的位置
				
				//1 一般情况下是 鼠标的左上角
				
				//设置小框的位置
				$pos.css({
					top:e.pageY -$pos.outerHeight()/2,
					left:e.pageX - $pos.outerWidth()/2,
				})
				//防止小灰块移除右边
				if(e.pageX>=smallOffset.left + $smallpic.outerWidth()-$pos.outerWidth()/2){
					
					$pos.css({
						left:smallOffset.left + $smallpic.outerWidth()-$pos.outerWidth()
					})
				}
				//防止小灰块移除下边
				if(e.pageY>=smallOffset.top + $smallpic.outerHeight()-$pos.outerHeight()/2){
					
					$pos.css({
						top:smallOffset.top + $smallpic.outerHeight()-$pos.outerHeight()
					})
				}
				
				//防止移除上边框
				if(e.pageY<=smallOffset.top +$pos.outerHeight()/2){
					$pos.css({
						top:smallOffset.top
					})
				}
				
				//防止出左边
				
				if(e.pageX<=smallOffset.left +$pos.outerWidth()/2){
					$pos.css({
						left:smallOffset.left
					})
				}
				
				//last
				
				//改变大框的偏移量
				$bigpic.css({
					top: -($pos.offset().top-220) * 3,
					left: -($pos.offset().left-180) * 3,
				})
				
			}else{
				//移开小框的范围
				$('#pos').hide();
				$('#bigpic').hide();
				
			}
	})
	
})