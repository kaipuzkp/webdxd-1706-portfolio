var userArray = [
  
  {
    name: 'Yan Hong',
    age: 26,
    school: 'SFU',
    skills: ['HTML', 'CSS', 'JavaScript'],
    isPublic: true,
    flag: 0
  },
  
  {
    name: 'Neo Wang',
    age: 26,
    school: 'UBC',
    skills: ['Python', 'CSS', 'JavaScript'],
    isPublic: true,
    flag: 0
  },
  
  {
    name: 'Ben Sun',
    age: 30,
    school: 'SFU',
    skills: ['Logo Design', 'VI', 'UIUX', 'Branding'],
    isPublic: false,
    flag: 0
  },
  
];

/*
$('.search-btn').click(function(){
*/

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