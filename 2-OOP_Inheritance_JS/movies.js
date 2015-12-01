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
	this.watchPlayback = function (movie) {
		if (movie[1] == "play") {
			return "Playing " + movie[0] + "...";
		}else{
			return "Stopping playback of " + movie[0];
		}

	}
};

function PlayBackConsoleLogger() {
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
console_observer = new PlayBackConsoleLogger();

observer = new MovieObserver();
observer.makePublisher(movie1);

			
movie1.addSubscriber(play_observer.watchPlayback);
movie1.addSubscriber(console_observer.logPlayback);
movie1.play();
movie1.stop();
