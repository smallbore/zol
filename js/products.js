$(function(){

	$.ajax({
		type:"get",
		url:"../data/goodList/iPhone7.json",
		success:function(res){
//						console.log(res);
//						console.log(typeof res);
//						console.log(res.data[0].img);
			update(res.data);		
		}
	})
	function update(data){
//		console.log(data);
		$.each(data,function(){
//			console.log(this)
			$('.p_list_ul').append('<li>'+this.title+'</li>')
		})
	}
	

})
