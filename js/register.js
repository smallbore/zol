
$(function(){
	//验证码
	$.idcode.setCode();
	$(".idcode").click(function(){
		$.idcode.setCode();
	});
	
	$(".register-form>input").focus(function(){
		$(this).css('borderColor','red')
	})
	$(".register-form>input").blur(function(){
		$(this).css('borderColor','#ccc');
	})
	
	//验证手机号
	$("#J_register_phone_number").bind("blur", function(){
        var mobile = $(this).val();
        var obj    = $("#J_register_phone_tips");
        if ('' == mobile){
            registerTipsMsg(obj, false, '请填写手机号码');                        
            return false;
        }
        if (!checkMobile(mobile)){
            registerTipsMsg(obj, false, '请填写有效的11位手机号码');
            return false;            
        }else{
        	registerTipsMsg(obj, true);
            return false;  
        }
        
        return false;
        
    });

	var checkMobile = function (mobile){
        var flag = false;
        if (mobile){
            var regPartton = new RegExp(/1[3-8]+\d{9}/);
            if (regPartton.test(mobile)){
                flag = true;
            }
        }

        return flag;
    }    

 	var registerTipsMsg = function(obj, flag, msg){
        if (flag){
            obj.html('').removeClass("wrong-tips").addClass("right-tips").show();            
        }else{            
            obj.removeClass("right-tips").addClass("wrong-tips").html(msg).show();
        }        
    }
	
	$("#J_register_checkcode_phone").bind("blur", function(){
		var codeP = $(this).val();
		var codenew = $('font').text();
		if(codeP == ''){
			$('#J_register_checkcode_tips_phone').css('display','block').text('请填写验证码！');
			return;
		}
		
		if(codeP == codenew){
			$('#J_register_checkcode_tips_phone').css('display','none');
			return;
		}else{
			$('#J_register_checkcode_tips_phone').css('display','block').text('验证码输入错误，请重新填写！');
			return;
		}
		
	});
	
	$("#J_register_pasword_phone").bind("blur", function(){
		var codeP = $(this).val();
		
		if(codeP == ''){
			$('#J_register_pasword_phone_tips').css('display','block').text('请填写密码！');
			return;
		}
		
		if(codeP.length>=6){
			$('#J_register_pasword_phone_tips').css('display','none');
			return;
		}else{
			$('#J_register_pasword_phone_tips').css('display','block').text('密码格式错误，请重新填写！');
			return;
		}
		
	});
	
	$("#J_register_regPasword_phone").bind("blur", function(){
		var codeP = $(this).val();
		var pasw = $("#J_register_pasword_phone").val();
		if(codeP == ''){
			$('#J_register_regPasword_phone_tips').css('display','block').text('请填写再次输入密码！');
			return;
		}
		
		if(codeP==pasw){
			$('#J_register_regPasword_phone_tips').css('display','none');
			return;
		}else{
			$('#J_register_regPasword_phone_tips').css('display','block').text('两次密码不一致，请重新填写！');
			return;
		}
		
	});
	
	$('#J_register_phone_submit').click(function(){
		$(this).val('注册中...');
		var sUser = $("#J_register_phone_number").val();
		var sPsw = $("#J_register_regPasword_phone").val();
		setTimeout(function(){
		if(sUser=="" || sPsw==""){
			$('.tips-all').css('display','block').text("用户信息输入错误");
			$('.register-btn').val('注册');
			return;
		}else{				
			//新用户
			$('.tips-all').css('display','none');
			var  newUser = {"name":sUser,"pws":sPsw};
	
			//得到cookie里面原来的用户信息
			var sCookie = $.cookie('name');
							
			//判断字符是否没有定义或者为空
			if(sCookie==undefined  || sCookie==""){
			//没有用户信息
				var aCookie = [];
				aCookie.push(newUser);
			}else{
				//如果cookie里面有用户信息
				var aCookie = JSON.parse(sCookie);
						
				var  bReg  = false //用户没有被注册
				
				$.each(aCookie,function(){
					//this //数组里面遍历到的对象
					if(this.name==sUser){
						//表示用户已经被注册
						bReg = true;
					}
				})
				
				if(bReg){
					$('.tips-all').css('display','block').text('你输入的信息已经注册');
					$('.register-btn').val('注册');
					return;
				}else{
					aCookie.push(newUser);
				}
				
			}
		}		
		
		//修改cookie
		
			$.cookie('name',JSON.stringify(aCookie),{expires:7 , path:"/"});
			console.log( $.cookie('name') );
			window.location.href='../html/login.html'
		},3000)
	})

})
