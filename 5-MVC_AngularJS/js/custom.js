var moviesApp = angular.module('moviesApp', []);

/* function that wraps around js' localstorage internal handling
 * We use this to save the model to local storage so that changes are shared 
 * across different tabs and persisted on each page reload
*/
moviesApp.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    //Localstorage can only save strings. So we transform objects to string and back to objects
    setObject: function(key, value) { 
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);
    


/*
  We use a separate service that's injected into both controllers that make use of the movie 
  model (MoviesCtrl and ListMovies) so that both have access to the list of movies
  We also use this to wrap around the localstorage functions
*/
moviesApp.factory('moviesService', function($localstorage){
  
  //$localstorage.set("first",$localstorage.get("first") + 1);
  //console.log($localstorage.get("first"))

  //We only set the list of movies if this is the first time we run the application and localstorage is empty
  if ($localstorage.get("firstrun",0) == 0 ){
    var movies = [{
      "name": "Enemy",
      "description": "Enemy is a 2013 Canadian-Spanish psychological thriller film directed by Denis Villeneuve, loosely adapted by Javier Gullón from José Saramago's 2002 novel The Double.",
      "year": "2013"
    },{
      "name": "Eraserhead",
      "description": "Eraserhead is a 1977 American surrealist body horror film written and directed by filmmaker David Lynch. Shot in black-and-white, Eraserhead is Lynch's first feature-length film, coming after several short works.",
      "year": "1977"
    }];
    $localstorage.setObject('movies-storage',movies)
    $localstorage.set("firstrun",1)

  } else {

    var movies = $localstorage.getObject("movies-storage")
  }

  //Adding empty movie at the end
  movies.add = function(){
    movies.push({"name": '', "description": '', "year": ''});
    $localstorage.setObject('movies-storage',movies);
  };

  movies.delete = function (index) {
        movies.splice(index, 1)
        $localstorage.setObject('movies-storage',movies)
    };

  //Using ng-change, we make sure every input type is automatically persisted to localstorage
  movies.update = function(){
    $localstorage.setObject('movies-storage',movies);

  }

  return movies;

});






moviesApp.controller('MoviesCtrl', function ($scope,moviesService) {
    
  $scope.movies = moviesService;
  $scope.deleteMovie = moviesService.delete;
  $scope.addMovie = moviesService.add;
  $scope.updateLocalStorage = moviesService.update;
  
	
});

moviesApp.controller('MoviesList', function ($scope,moviesService) {
    
  $scope.movies = moviesService;
  
  
});




