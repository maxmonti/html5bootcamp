
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



$.ajax(
	{url:"https://api.spotify.com/v1/search?q=rolling+stones&type=album", success:
		function(data){
			
			$("#ajax-content").val(data) //Para pruebas
			
			alert(data.albums.items.length)
			$(data.albums.items).each(function(){
				
					$("#sidebar").append('<img src="' + data.albums.items[0].images[0].url + '" />');
				}
			)
			
		}
	}


);

$( document ).ready( fadeInSection );





