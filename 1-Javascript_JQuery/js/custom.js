
function fadeInSection() {
     $( "#texta").val("");
     
     $.when($("#hidden-section").fadeIn(3000)).done(
		function(){
			$( "#texta" ).focus();
			
			});
     
     
     
     
}



$( document ).ready( fadeInSection );

