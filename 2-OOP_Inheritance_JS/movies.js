function Movie(attributes) {
	if (attributes == null) {
		this.attributes = {};
	} else {
		this.attributes = attributes;	
		
		}
		
		
	this.set = function (attr,value){
		this.attributes[attr] = value;
		
		}
	this.get = function (attr){
		return this.attributes[attr];
		}
	this.play = function (){
		return "Playing " + this.get('title') + "...";
		
		}
	this.stop = function (){
		return "Stopping playback of " + this.get('title') + "...";
		
		}
	
	}
	

/*function MovieObserver(){
	this.
	
	
	}*/
