$(document).ready(function(){
	var url =  window.location.href;
	var id = url.split("id=");
	
	if(id.length!=2){
		window.location.replace("/");
		return;
		
	}
	id = id[1];

	if(id.length != 9){
		window.location.replace("/");
		return;
		
	}

	$.ajax({
		type : 'POST',
		url : '/getdata',
		data : {id : id},
		success: function(data){
			if(data == "error"){
				$.toast({
    				heading: 'Error',
    				text: 'Something went wrong, Please try again',
    				showHideTransition: 'fade',
    				icon: 'error',
    				position: 'bottom-right',
				});
			}
			else if(data =="not found"){
				$.toast({
    				heading: 'Warning',
    				text: 'You are not registered yet . Please Register <a href="/">here</a>',
    				hideAfter: false,
    				icon: 'warning',
    				
				});
			}
			else{
				for(var key in data){
					$("#"+key).html( data[key]);
				}
			}
		}
	})
});

function p(){
	$("#print").hide();
	$("#com").html("");
	window.print();
	$("#print").show();
	$("#com").html("(will be filled up by club committee)");
}