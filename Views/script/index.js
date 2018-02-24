$(document).ready(function(){

});

function call(val){
	$("#btn").html('<i class="fa fa-spinner fa-spin"></i>'); 
	var obj= {};
	obj["name"] = $("#name").val();
	obj["roll"] = $("#roll").val();
	obj["email"] = $("#email").val();
	obj["phoneno"] = $("#mob").val();
	obj["level"] = $( "#level option:selected" ).text();
	obj["dept"] = $( "#dept option:selected" ).text();
	obj["gender"] =  $("input:radio[name=gender]:checked").val()

	for (var key in obj) {
  		if( !obj[key] || obj[key]=="" || obj[key]=="" || obj[key]=="Select Department" || obj[key]=="Select Level"){
			$.toast({
    			heading: 'Error',
    			text: 'Please fill up all the options',
    			showHideTransition: 'fade',
    			icon: 'error',
    			position: 'bottom-right',
			});
			$("#btn").html('Register'); 
			return;
		}
	}

	if(!obj.roll.match(/^[0-9]+$/)){
		$.toast({
    			heading: 'Error',
    			text: 'Invalid Student Id',
    			showHideTransition: 'fade',
    			icon: 'error',
    			position: 'bottom-right',
		});
		$("#btn").html('Register'); 
		return;
	}


	$.ajax({
		type : 'POST',
		url : '/register',
		data : obj,
		success : function(data){
			//console.log(data);
			if(data=="OK"){
				$.toast({
    				heading: 'Success',
    				text: 'Registration Successfull',
    				showHideTransition: 'slide',
    				icon: 'success',
    				position: 'bottom-right'
				});
				$("#btn").html('Register'); 
				window.location.replace("/showform?id="+obj.roll);
				//console.log("/showform?id="+obj.roll);
				return;
			}
			else{
				$.toast({
    				heading: 'Error',
    				text: 'Something went wrong, Please try again',
    				showHideTransition: 'fade',
    				icon: 'error',
    				position: 'bottom-right',
				});
				$("#btn").html('Register'); 

				return;
			}
		}
	})

}