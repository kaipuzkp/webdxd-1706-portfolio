

/*
$('.search-btn').click(function(){
*/
//Fetch Function///////////////////////////////////////////////////////////////////////////////////////////////////////////////


$('#fetch-all').click(function() {

 $.get('https://webdxd-student-api.herokuapp.com/student/', function(response) {

     console.log(response)
     $('#user-container').html("")
     for(var i = 0; i<response.length; i++){
     		var userContainer = $('<div>').addClass('user').attr("id",response[i]._id)
     		$('<h1>').text(response[i].name).appendTo(userContainer)
     		//$('<button>').addClass('delBtn').attr("id","_delete").text("Delete").appendTo(userContainer)
     		$('#user-container').append(userContainer)


     }

 })
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Show Detail Function///////////////////////////////////////////////////////////////////////////////////////////////////////


$("#user-container").on('click', '.user',function(event){

	var uid = $(this).attr('id')
	$.get('https://webdxd-student-api.herokuapp.com/student/' + uid, function(response){

		 console.log(response)

   		 $('.detail-info').empty()

   		 $('#'+uid).empty('<h1>')
   		 $('#'+uid).append($('<h1>').text(response.name))
   		 var detailInfo = $('<div class="detail-info">')
   		 $('<h2>').text(response.age).appendTo(detailInfo)
   		 $('<h2>').text(response.school).appendTo(detailInfo)
		 $('<button>').addClass('delBtn').attr("id","delBtn").text("Delete").appendTo(detailInfo)
   		 $('<button>').addClass('updBtn').attr("id","updBtn").text("Update").appendTo(detailInfo)
   		 $('#' + uid).append(detailInfo)


	})


})




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Delete Function////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("#user-container").on('click', '.delBtn',function(event){
	var uid = $(this).parent().parent().attr('id')
		console.log(uid)
		console.log('clicked')
		if(confirm('This action will permanently delete current Contract! Are you sure?')){
  
			$.ajax({
				type: 'DELETE',
				url: 'https://webdxd-student-api.herokuapp.com/student/'+uid,
				success: function(data) { console.log(data) },
		        contentType: "application/json",
		     	dataType: 'json'
			})
			$('#'+uid).remove()
			
		}

})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Update Function////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("#user-container").on('click', '.updBtn',function(event){
	var uid = $(this).parent().parent().attr('id')
	console.log('Update button clicked')
	var newName = prompt("Please Enter Your New Name", "");
	var newAge = prompt("Please Enter Your New Age", "");
	var newSchool = prompt("Please Enter Your New School", "");


	if(!(newName == null && newAge == null && newSchool == null) ){

		$.get('https://webdxd-student-api.herokuapp.com/student/' + uid, function(response){

			console.log(response)

			if(newName == null){newName = response.name}
			if(newAge== null){newAge = response.age};
			if(newSchool == null){newSchool = response.school};


		

			if(confirm('This action will permanently change the information of current Contract! Are you sure?')){
		  		var updStudent = {

					"name": newName,
					"age": newAge,
					"school": newSchool

			    }
				$.ajax({
					type: 'PUT',
					url: 'https://webdxd-student-api.herokuapp.com/student/'+uid,
					data: JSON.stringify(updStudent),
					success: function(data) { console.log(data) },
			        contentType: "application/json",
			     	dataType: 'json'

				})



			}
		})	
	}

})



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Submit button for Create new Contract//////////////////////////////////////////////////////////////////////////////////////


$('#submit-form').click(function(){
	if(!($("#sname").val()=="") || !($("#sage").val()=="") || !($("#sschool").val()=="") ){
		var newStudent = {

			"name": $('#sname').val(),
			"age": $('#sage').val(),
			"school": $('#sschool').val()

		}
		var clearText = function(id) {
	        $(id).val("");
	      }

	      clearText('#sname');
	      clearText('#sage');
	      clearText('#sschool');


		console.log(newStudent)
		$.ajax({
			type: 'POST',
			url: 'https://webdxd-student-api.herokuapp.com/new',
			data: JSON.stringify(newStudent),
			success: function(data) { console.log(data) },
	        contentType: "application/json",
	     	dataType: 'json'

		})
	}

})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

//Search Function has to be changed////////////////////////////////////////////////////////////////////////////////////////////
$(".search-input").keyup(function() {	
	$('#user-container').html("")
	
	$.get('https://webdxd-student-api.herokuapp.com/student/', function(response){

		 for(var i = 0; i<response.length; i++){


		 	
			 	if(new RegExp($(".search-input").val(),'i').test(response[i].name)){

				 	

					var userContainer = $('<div>').addClass('user').attr("id",response[i]._id)
     				$('<h1>').text(response[i].name).appendTo(userContainer)
     		
     				$('#user-container').append(userContainer)


		 		


			    }




		 	
		 } 


	})	 

})



// $(".search-input").keyup(function() {	
// 	$('#user-container').html("")
	


// 	 for(var i = 0; i<userArray.length; i++){


// 	 	for(var k=0; k<userArray[i].skills.length; k++){
// 		 	if(new RegExp($(".search-input").val(),'i').test(userArray[i].skills[k]) ||
// 		 		new RegExp($(".search-input").val(),'i').test(userArray[i].name) ||
// 		 		new RegExp($(".search-input").val(),'i').test(userArray[i].age) ||
// 		 		new RegExp($(".search-input").val(),'i').test(userArray[i].school)){

// 			 	if (userArray[i].flag == 0){

// 		 			var userContainer = $('<div>').addClass('user')

// 				 	$('<h1>').text(userArray[i].name).appendTo(userContainer)
// 				 	$('<h2>').text(userArray[i].age).appendTo(userContainer)
				 	
// 					$('<h2>').text(userArray[i].school).appendTo(userContainer)
					
// 					var userSkills = $('<p>')	
// 				 		for(var j=0; j<userArray[i].skills.length; j++){
// 				 			$('<span>').text(userArray[i].skills[j]).appendTo(userSkills)}
				 			

// 				 	$(userSkills).appendTo(userContainer)
				 		
				 	
				 	
// 				 	$('#user-container').append(userContainer)
// 				 	userArray[i].flag = 1


// 	 		}


// 		 	}
// 	    }




	 	
// 	 } 

// 	for(var l=0; l<userArray.length; l++){
// 	 	 userArray[l].flag = 0

// 	 }

// })

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////