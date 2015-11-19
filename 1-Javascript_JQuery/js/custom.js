
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
							$(" #hidden-section-h1 ").append( "<a class='highlight'> delayed highlight </a>" )
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

