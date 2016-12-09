$(function(){
	var tipS = $('#J_login-wrong-tips');
	
	$('.text').focus(function(){
		$(this).parent('div').css('borderColor','red')
	})
	$('.text').blur(function(){
		$(this).parent('div').css('borderColor','#dedede')
	})
	
	var oUser = 0
	
	$('#J_loginBtn').click(function(){
		var oUser = $('#J_loginUser').val();
		var passw = $('#J_loginPsw').val();
		if(oUser==""){
			tipS.css("display","block").find('span').text('请填写手机号/邮箱/用户名');
			return;
		}
		if((oUser.length)<6){
			tipS.css("display","block").find('span').text('用户名不合法！');
			return;
		}
		if((oUser.length)>=6 && passw==""){
			tipS.css("display","block").find('span').text('密码不能为空！');
			return;
		}
		if((passw.length)<6){
			console.log(1111)
			tipS.css("display","block").find('span').text('密码不能少于6位！');
			return;
		}
		if((oUser.length)>=6 && (passw.length)>=6){
			
			$('#J_loginBtn').val("登录中...");
//			console.log(oUser,passw);
			// var obj = {type:true,name:oUser};
			// $.cookie('login',JSON.stringify(obj),{expires:7 , path:"/"})
			setTimeout(function(){
				var sCookie = $.cookie('name');
				if(sCookie==undefined || sCookie==""){
					//cookie为空时表示没有注册用户
					tipS.css("display","block").find('span').text('用户没有注册或用户名密码错误！');
					$('#J_loginBtn').val("登录")
				}else{
					var bRegister = false;  //表示用户没有注册
					//将cookie转换成数组
					
					var aCookie = JSON.parse(sCookie);
//					console.log(aCookie);
					
					//遍历数组判断输入的用户信息是否已注册
					$.each(aCookie, function() {
						// console.log(this.pws)
						
						if( this.name == oUser && this.pws == passw ){
							//已注册修改 注册状态；
							bRegister = true;
							return;
						}
						
					});
					
					if(bRegister){
						//用户已注册
						// console.log("登陆成功");
						//修改登录状态
						var obj = {type:true,name:oUser};
						// console.log($.cookie('login'));
						// setTimeout(function(){window.location.href='../html/index.html'},1200);
					}else{
						
						//用户未注册
						// console.log("登陆失败");
						var obj = {type:false};
						tipS.css("display","block").find('span').text('用户没有注册或用户名密码错误！');
						$('#J_loginBtn').val("登录")
					}
					//修改cookie里面的登录状态
					// console.log(JSON.stringify(obj))
					$.cookie('login',JSON.stringify(obj),{expires:7 , path:"/"});

					// console.log(($.cookie('login').type)==true)
					// console.log((JSON.parse($.cookie('login')).type))
					// console.log($.cookie('login'));
					if((JSON.parse($.cookie('login')).type)){
						setTimeout(function(){window.location.href='../html/index.html'},500);
					}
					// setTimeout(function(){window.location.href='../html/index.html'},500);
				}
			
			//setTimeout(function(){
//				window.location.href='../html/index.html'
//				window.history.go(-1);
			},1000)
		}
	})
	
	
})
