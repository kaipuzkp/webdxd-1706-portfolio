

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


//Search Function ///////////////////////////////////////////////////////////////////////////////////////////////////////////
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



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////