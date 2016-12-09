$(function(){
	
	var boxUl = $('.focus-box-ul');
	var liLen = $('.focus-box-ul li').length;
	var width = $('.focus-box-ul li').width();
	var i = 0;
	$('.li-index li').first().css('background','orange')
	var timer = setInterval(fAnimate,3000)
	
	function fAnimate(){
		i++;
		if(i<=4){
			show();
		}
	}
	function prevmate(){
		--i;
		if(i>=0){
			show();
		}

		if(i<=0){
			i=liLen-1
		}
		
		// console.log(i)
	}
	function show(){
		
		var x = -1 * i * width;
		$(boxUl).animate({'left':x+'px'},600,function(){
			if(i>=liLen-1){
				$(boxUl).css('left',0);
				i=0;
				$('.li-index li').eq(i).css('background','orange').siblings().css('background','gray')
			}
		});
		$('.li-index li').eq(i).css('background','orange').siblings().css('background','gray')
		
	}
	
	$('.li-index li').click(function(){
		clearInterval(timer);
		i=$(this).html()-2;
		fAnimate();
//		console.log($(this).html())
	})
	
	$('.prev').mousedown(function(){
		clearInterval(timer);
		prevmate();
	})
	$('.prev').mouseup(function(){
		timer=setInterval(fAnimate,3000);
	})

	$('.next').mousedown(function(){
		clearInterval(timer);
		fAnimate();
	})
	$('.next').mouseup(function(){
		timer=setInterval(fAnimate,3000);
	})
	
	$(boxUl).mouseenter(function(){
		clearInterval(timer);
	})
	
	$(boxUl).mouseleave(function(){
//		console.log('qi chu')
		timer=setInterval(fAnimate,3000);
	})

	$('.banner-list li').last().css({'border-right':'1px solid #dedede','width':'175px'})


	$('.banner-list>li>a').mouseenter(function(){
		$(this).animate({paddingLeft:'40px'},function(){
			$(this).animate({paddingLeft:'50px'})
		})
	})
	//修改登录状态
	var logins = function(type,name){
		
		if(type){
			$('#logins').html('用户：'+'<a href=#>'+name+'</a>');
			$('.exit-user').html('<a href=#>注销用户</a>');
			$('.exit-user').click(function(){
				type = false;
				logins(type)
			})
		}else{
			$('#logins').html('用户：'+'<a href=login.html>登陆</a>');
			$('.exit-user').html('<a href=../html/register.html>注册用户</a>');
			var obj = {type:false};
			$.cookie('login',JSON.stringify(obj),{expires:7 , path:"/"});
		}
	}
	
//	console.log(!($.cookie('login')==undefined));
	if(!($.cookie('login')==undefined || $.cookie('login')=="")){
		logins(JSON.parse($.cookie('login')).type,JSON.parse($.cookie('login')).name);
	}
	
})