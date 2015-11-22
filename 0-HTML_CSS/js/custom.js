function validateFields(){
	
	var regex = /^\w+[.-]?\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	//We blank everything
	$("#errorFirstName").text("")
	$("#errorLastName").text("")
	$("#errorEmail").text("")
	$("#errorArea").text("")
	$("#errorSport").text("")
	
	
	if ($("#inputFirstName").val() == ""){
		$("#errorFirstName").text("Required field")
		
		}
		
	
	if ($("#inputLastName").val() == ""){
		$("#errorLastName").text("Required field")
		
		}
		
	if ($("#inputEmail").val().match(regex) == null){
		$("#errorEmail").text("Invalid email")
		
		}
	if ($("#inputBirthday").val() == ""){
		$("#errorBirthday").text("Required field")
		
		}
	if ($("#textArea").val() == ""){
		$("#errorArea").text("Required field")
		}
		
	if ($("#favoriteSport").val() == ""){
		$("#errorSport").text("Required field")
		}
	
	if ($("#textArea").val() == ""){
		$("#errorArea").text("Required field")
		}
	
	}

