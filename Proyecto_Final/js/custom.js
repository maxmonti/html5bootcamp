
var weatherApp = angular.module('weatherApp', []);

/* function that wraps around js' localstorage internal handling
 * We use this to save the model to local storage so that changes are shared 
 * across different tabs and persisted on each page reload
*/
weatherApp.factory('$localstorage', ['$window', function($window) {
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
weatherApp.factory('widgetsService', function($localstorage){
  
  if ($localstorage.get("firstrun",0) == 0 ){
    var widgets =  [];
    $localstorage.set("firstrun",1)
    $localstorage.setObject('widgets-storage',widgets)
  }else{
    var widgets = $localstorage.getObject("widgets-storage")

  }
    
  

  console.log(widgets);

  //Adding empty movie at the end
  widgets.add = function(weatherItem){
    widgets.push(weatherItem);
    $localstorage.setObject('widgets-storage',widgets);
  };

  widgets.delete = function (index) {
        widgets.splice(index, 1)
        $localstorage.setObject('widgets-storage',widgets)
    };

 
  return widgets;

});



weatherApp.controller('MainCtrl', ['$scope', '$http', 'widgetsService',function ($scope,$http,widgetsService) {



  $scope.updateQuery = function(val) {
		
		//Log for testing
		console.log(val);
		$http({
		  method: 'GET',  
			url: 'https://query.yahooapis.com/v1/public/yql?q=select * from geo.places(0,2) where text="' + val + '" and country.code="AR" and placeTypeName.content="Town"&format=json&env=store://datatables.org/alltableswithkeys'
		  })
		  .success(function (data, status, headers, config) {
			  console.log(data);
			  $scope.city_query = data.query.results.place;

		  })
		  .error(function (data, status, headers, config) {
		   
		  });
        
    }

    $scope.addWidget = function(val){

      $http({
        method: 'GET',  
        url: 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + val + '") and u="c"&format=json&env=store://datatables.org/alltableswithkeys'
        })
        .success(function (data, status, headers, config) {
          
          console.log(data.query.results.channel);
          widgetsService.add(data.query.results.channel);
          

        })
        .error(function (data, status, headers, config) {
         
        });



    }

 	

  
  		

  
}]);



weatherApp.controller('WidgetsList', function ($scope,widgetsService) {

  $scope.deleteWidget = widgetsService.delete;  
  $scope.widgets = widgetsService;
  
  
});

