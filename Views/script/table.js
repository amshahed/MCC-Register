$(document).ready(function(){
	$.ajax({
		type : 'POST',
		url : '/getalldata',
		success : function(data){
			data.sort(function(a,b){ 
				if(a.level == b.level){
					return a.roll-b.roll;
				}
				else return a.level-b.level;
			 });
			var serial = 1 ;
			$("#load").hide();
			for(var i = 0 ; i< data.length;i++){
				$("#table").append( '<tr>'+
					'<td class="center">'+serial + '</td>'+
					'<td>'+data[i].name + '</td>'+
					'<td class="center">'+data[i].roll + '</td>'+
					'<td class="center">'+data[i].dept + '</td>'+
					'<td class="center">'+data[i].level + '</td>'+
					'<td>'+data[i].email + '</td>'+
					'<td class="center">'+data[i].phoneno + '</td>'+
					'<td>'+data[i].gender + '</td> </tr>'
				 );
				serial++;
			}
		}
	})
});