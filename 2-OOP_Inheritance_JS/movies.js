/*
 * Inherit prototype function 
 * Source: http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/
 * 
 * 
 * */

 function inheritPrototype(childObject, parentObject) {
	// As discussed above, we use the Crockford’s method to copy the properties and methods from the parentObject onto the childObject​
	//So the copyOfParent object now has everything the parentObject has ​
	var copyOfParent = Object.create(parentObject.prototype);
	    
	//Then we set the constructor of this new object to point to the childObject.​
	//Why do we manually set the copyOfParent constructor here, see the explanation immediately following this code block.​
	copyOfParent.constructor = childObject;
	    
	// Then we set the childObject prototype to copyOfParent, so that the childObject can in turn inherit everything from copyOfParent (from parentObject)​
	childObject.prototype = copyOfParent;
	}


/*
 * Design patterns javascript excercise 
 * 
 * */

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
		
	this.play = function(){
		this.publish([this.get('title'),"play"]);
		}
		
	this.stop = function(){
		this.publish([this.get('title'),"stop"]);
		}
	
}

function MovieObserver() {
		
	this.addSubscriber = function (callback) {
		this.subscribers[this.subscribers.length] = callback;
	},
		
	this.removeSubscriber = function (callback) {
		for (var i = 0; i < this.subscribers.length; i++) {
			if (this.subscribers[i] === callback) {
				delete(this.subscribers[i]);
			}
		}
	},
				
	this.publish = function (what) {
		for (var i = 0; i < this.subscribers.length; i++) {
			if (typeof this.subscribers[i] === 'function') {
				this.subscribers[i](what);
			}
		}
	},
				
	this.makePublisher = function (o) { 
		for (var i in this) {
			o[i] = this[i];
			o.subscribers = [];
		}
	}
				
};
		
		
		
function PlayBackObserver() {
	this.logPlayback = function (movie) {
		if (movie[1] == "play") {
			console.log("Playing " + movie[0] + "...")
		}else{
			console.log("Stopping playback of " + movie[0])
		}
		
	}
};
			

movie1 = new Movie();
movie1.set('title', 'Enemy');
play_observer = new PlayBackObserver();

observer = new MovieObserver();
observer.makePublisher(movie1);

			
movie1.addSubscriber(play_observer.logPlayback);
movie1.play();
movie1.stop();


var MovieModule =  (function(){
					
	//Private				
	var attributes = {};
	
	//Public
	return {
		
		set: function(attr,value){
			attributes[attr] = value;
			},
			
		get: function(attr){
			return attributes[attr];
			},
			
		play: function(){
			this.publish([this.get('title'),"play"]);
			},
			
		stop: function(){
			this.publish([this.get('title'),"stop"]);
			}
	}
	
})();

MovieModule.set('title', 'The Guest');
observer.makePublisher(MovieModule);

			
MovieModule.addSubscriber(play_observer.logPlayback);
MovieModule.play();
MovieModule.stop();


//We make it so DownloadableMovie inherits from Movie
function DownloadableMovie(attributes){
	
	Movie.call(this, attributes);
	}

inheritPrototype(DownloadableMovie, Movie);

DownloadableMovie.prototype.download = function () {
	
	}
	
	
	
//Social mixin to extend the functionality of Movie
var Social = function() {
	this.share = function(friendName) {
	  console.log("Sharing " + this.get('title') + " with " + friendName)
	};
	this.like = function() {
	console.log("You liked " + this.get('title'))
	};
	return this;
};

 
Social.call(Movie.prototype);
movie1.share('Pedro');	



function Actor(attributes) {
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
		
}

actor1 = new Actor({'name': 'Jake Gyllenhaal'});
actor2 = new Actor({'name': 'Sarah Gadon'});


Movie.prototype.arrayOfActors = [];
Movie.prototype.getActor = function(index){
	return this.arrayOfActors[index];
	
	};

Movie.prototype.addActor = function(actor){
	this.arrayOfActors.push(actor);
	
	};
	
Movie.prototype.getListOfActors = function() {
	return this.arrayOfActors;
	
	
	};
	
Movie.prototype.printListOfActors = function() {
	console.log('List of actors: ');
	for (i = 0; i < this.getListOfActors().length; i++) {
    console.log(this.getActor(i).get('name'));
		}
	}
	
	
movie1.addActor(actor1);
movie1.addActor(actor2);
movie1.printListOfActors();
	


