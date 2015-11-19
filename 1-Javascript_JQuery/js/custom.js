
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
				$(" #hidden-section-h1 ").text(result.response);
				$(" #hidden-section-h1 ").css("color", "inherit");
								}, 
		error: function(){
			$(" #hidden-section-h1 ").css("color", "red");
			$(" #hidden-section-h1 ").text("Network error");
						
			}
		
		});
}); 

$( document ).ready( fadeInSection );

