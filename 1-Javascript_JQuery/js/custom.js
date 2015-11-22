
var empty_input = 0;
/*
 * Functions 
 */

function renderAlbumResults(data){
	
	$("#ajax-content").val(data) //Para pruebas
	
	$("p.not-found").remove()
	$("article.rs-album").remove()
			
	$(data.albums.items).each(function(){
		$("#sidebar").append('<article  class="rs-album">')	
		})
	
	$("article.rs-album").each(function(index){
		//name, type, image, release_date, and a link to spotify

		$(this).append("<h4><strong>Name:</strong> " + data.albums.items[index].name + "</h4>")
		$(this).append("<h4><strong>Type:</strong> " + data.albums.items[index].type + "</h4>")
		$(this).append("<h4><strong>Release date:</strong> " + data.albums.items[index].release_date + "</h4>")
		$(this).append('<img src="' + data.albums.items[index].images[0].url + '"/>')
		$(this).append('<h4><a href="' + data.albums.items[index].external_urls.spotify + '">Link</a></h4>')
		
		});
		
		if (data.albums.items == ""){
			$("#sidebar").append('<p  class="not-found"><i>Sorry, no albums found!</i></p>')				
			}
	}
	
function onLoadEvents(){
	
	fadeInSection()
	
	$("#album-query").val("Enter your album name here").css({fontStyle: "italic", color: "gray"})
	
	$.ajax({url:"https://api.spotify.com/v1/search?q=rolling+stones&type=album", success:
		function(data){
			renderAlbumResults(data)
		}
	});
	
	
	
}

	
function fadeInSection() {
     $( "#texta").val("");
     
     $.when($("#hidden-section").fadeIn(3000)).done(
		function(){
			$( "#texta" ).focus();
			
			});
}

/*
 * Events  
 */

 
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


$( "#album-query" ).focus(function() {
	if (empty_input == 0){
			$( "#album-query" ).val("").css({fontStyle: "normal", color: "black"})
			empty_input = 1
		
		}
  
});

$("#album-query").keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
        $( "#query-button" ).click();
    }
});


$( "#query-button" ).click(function() {
  $( "#loading" ).html("<img src='img/loading.gif' height='30'>")
  
  $.ajax({url:"https://api.spotify.com/v1/search?q=" + $( "#album-query" ).val() + "&type=album", success:
		function(data){
			renderAlbumResults(data)
			$( "#loading" ).html("")
		}})
});


$( document ).ready( onLoadEvents );





