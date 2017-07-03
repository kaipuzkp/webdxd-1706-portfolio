

/*
$('.search-btn').click(function(){
*/
$('#fetch-all').click(function() {

 $.get('https://webdxd-student-api.herokuapp.com/student/', function(response) {

     console.log(response)
     $('#user-container').html("")
     for(var i = 0; i<response.length; i++){
     		var userContainer = $('<div>').addClass('user').attr("id",response[i]._id)
     		$('<h1>').text(response[i].name).appendTo(userContainer)

     		$('#user-container').append(userContainer)


     }

 })
})



$("#user-container").on('click', '.user',function(event){

	var uid = $(this).attr('id')
	$.get('https://webdxd-student-api.herokuapp.com/student/' + uid, function(response){

		 console.log(response)

   		 $('.detail-info').empty()

   		 var detailInfo = $('<p class="detail-info">')
   		 $('<h2>').text(response.age).appendTo(detailInfo)
   		 $('<h2>').text(response.school).appendTo(detailInfo)
   		 $('#' + uid).append(detailInfo)

	})

})


$('#submit-form').click(function(){

	var newStudent = {

		"name": $('#sname').val(),
		"age": $('#sage').val(),
		"school": $('#sschool').val()

	}
	console.log(newStudent)
	$.ajax({
		type: 'POST',
		url: 'https://webdxd-student-api.herokuapp.com/new',
		data: JSON.stringify(newStudent),
		success: function(data) { console.log(data) },
        contentType: "application/json",
     	dataType: 'json'

	})

})

// $.get('https://webdxd-student-api.herokuapp.com/student/', function(response) {

//      console.log(response)
//     // $('#user-container').html("")
//      for(var i = 0; i<response.length; i++){
     		
//      		$("#"+response[i].name).click(function() {

//      			 $('#user-container').html("")
// 			     for(var i = 0; i<response.length; i++){
// 			     		var userContainer = $('<div>').addClass('user')
// 			     		$('<h1>').text(response[i].name).appendTo(userContainer)
// 			     		$('<h2>').text(response[i].id).appendTo(userContainer)
// 			     		$('#user-container').append(userContainer)

// 			     }
// 			})     

//      }

// })




$(".search-input").keyup(function() {	
	$('#user-container').html("")
	


	 for(var i = 0; i<userArray.length; i++){


	 	for(var k=0; k<userArray[i].skills.length; k++){
		 	if(new RegExp($(".search-input").val(),'i').test(userArray[i].skills[k]) ||
		 		new RegExp($(".search-input").val(),'i').test(userArray[i].name) ||
		 		new RegExp($(".search-input").val(),'i').test(userArray[i].age) ||
		 		new RegExp($(".search-input").val(),'i').test(userArray[i].school)){

			 	if (userArray[i].flag == 0){

		 			var userContainer = $('<div>').addClass('user')

				 	$('<h1>').text(userArray[i].name).appendTo(userContainer)
				 	$('<h2>').text(userArray[i].age).appendTo(userContainer)
				 	
					$('<h2>').text(userArray[i].school).appendTo(userContainer)
					
					var userSkills = $('<p>')	
				 		for(var j=0; j<userArray[i].skills.length; j++){
				 			$('<span>').text(userArray[i].skills[j]).appendTo(userSkills)}
				 			

				 	$(userSkills).appendTo(userContainer)
				 		
				 	
				 	
				 	$('#user-container').append(userContainer)
				 	userArray[i].flag = 1


	 		}


		 	}
	    }




	 	
	 } 

	for(var l=0; l<userArray.length; l++){
	 	 userArray[l].flag = 0

	 }

})