
function fadeInSection() {
     $( "#texta").val("");
     
     $.when($("#hidden-section").fadeIn(3000)).done(
		function(){
			$( "#texta" ).focus();
			
			});
     
     
     
     
}

$("#ajax-button").click(function(){
    $.ajax(
    
		{url: "http://bootcamp.aws.af.cm/welcome/yourname", success: 
			function(result){
				$.when(
					$(" #hidden-section-h1 ").text(result.response).css("color", "inherit")
					).done(
						setTimeout(function(){
							string = $(" #hidden-section-h1 ").text()
							string = string.replace("yourname!", "")
							$(" #hidden-section-h1 ").text(string)
							$(" #hidden-section-h1 ").append( "<a class='highlight'>yourname!</a>" )
									}, 1000)
						
										
					);
				
				
				
								}, 
		error: function(){
			$(" #hidden-section-h1 ").css("color", "red");
			$(" #hidden-section-h1 ").text("Network error");
						
			}
		
		});
}); 

$( document ).ready( fadeInSection );


$.ajax(
	{url:"https://api.spotify.com/v1/search?q=rolling+stones&type=album", success:
		function(result){
			$("#ehh").val(result)
			
			
			}
		}


);
