$(function(){
	var strCookie = $.cookie("good");
				
	if(strCookie==undefined || strCookie==""){
		console.log("没有购买产品")
	}else{
		//刷新产品列表
		var oCookie = JSON.parse(strCookie);
		var num = 0
		$.each(oCookie, function() {
			//this  //{title:title,data:{},num:num}
			num += this.num;
//			console.log(this.num)
//			var  $li = $('<li/>');
//			//添加img
//			$li.append('<img src='+this.data.img +'>');
//			$li.append('<span>'+this.title+'</span>');
//			$li.append('<span>'+this.data.price+'</span>');
//			$li.append('<span>'+this.num+'个</span>');
//			$('ul').append($li);
			
			$('.trade_box').append('<div class=shop_name><div><input type=checkbox>'+this.data.shop+'</div></div><ul class=trade_mes><li class=li_padd><input type=checkbox><img src='+this.data.img+'/></li><li class=li_width1>'+this.title+'</li><li class=li_width2></li><li class=price_col>'+this.data.price+'</li><li><span class=delss>-</span><span class=numbers>'+this.num+'</span><span class=addss>+</span></li><li class=price_col>'+this.data.price+'</li><li><a href=### class=remove>删除</a></li></ul>');

		});
		$('.num_cart').html(num);
		$('.num_car').html(num);
//		console.log(num);
	}
	//选中
	
	$all = $('.all');
	$allTo = $('.allTo');
	$checkbox = $(':checkbox').not('.all');
	
	$all.click(function(){
		$checkbox.prop('checked',this.checked);	
	});
	$allTo.click(function(){
		$checkbox.prop('checked',this.checked);	
	});
	
	//删除
	
	$('.remove').click(function(){
		var title = $(this).parent().parent().find('.li_width1').html();
//		console.log(title);
		var parents = $(this).parent().parent();
		var prevs = $(this).parent().parent().prev();
		$(parents).remove();
		$(prevs).remove();
		
		var strCookie = $.cookie("good");
		var oCookie = JSON.parse(strCookie);
		var aCookie = [];
		
		$.each(oCookie,function(index){
			if(this.title!=title){
				aCookie.push(oCookie[index])
			}
		})
		$.cookie("good",JSON.stringify(aCookie),{expires:7,path:"/"})
	})
	
//	var price = $('.price_col').html().replace('¥','')
//	console.log(price)
	
})
//san
function removeAll(){
		var $checked = $("input:checked").not('.all').not('.allTo');
//		$checked.each(function(){
//			console.log($(this).parent().next('li').html())
//		})
		$checked.parent().parent().remove();
		var aCookie = [];
		$.cookie("good",JSON.stringify(aCookie),{expires:-1,path:"/"})
}