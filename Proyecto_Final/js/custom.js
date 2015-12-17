

var weatherApp = angular.module('weatherApp', ['ngAnimate']);


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




weatherApp.controller('AdvSearch', function ($scope,$http,widgetsService){

    $http({
      method: 'GET',  
      url: 'https://query.yahooapis.com/v1/public/yql?q=select * from geo.states where place="argentina"&format=json&env=store://datatables.org/alltableswithkeys'
      })
      .success(function (data, status, headers, config) {
        console.log(data);
        $scope.provinces = data.query.results.place;

      })
      .error(function (data, status, headers, config) {
       
      });
        
    $scope.listOfCities = function(provinceid) {

      $http({
        method: 'GET',  
        url: 'https://query.yahooapis.com/v1/public/yql?q=select * from geo.places.descendants where ancestor_woeid=' + provinceid + ' and placetype="Town"&format=json&env=store://datatables.org/alltableswithkeys'
        })
        .success(function (data, status, headers, config) {
          console.log(data);
          $scope.cities= data.query.results.place;

        })
        .error(function (data, status, headers, config) {
         
        })
    }


    $scope.addWidget = function(val){

      $http({
        method: 'GET',  
        url: 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid=' + val + ' and u="c"&format=json&env=store://datatables.org/alltableswithkeys'
        })
        .success(function (data, status, headers, config) {
          
          console.log(data.query.results.channel);
          widgetsService.add(data.query.results.channel);
          

        })
        .error(function (data, status, headers, config) {
         
        });

    } 


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

  $scope.showCloseButton = function(index){

    document.getElementById("delete" + index).style.opacity = 1;
    //angular.select('#delete' + index).fadeIn(899);
  }

  $scope.codeToIcon = function(code){

    switch (code){
      case "0":
      case "1":
      case "2":
        return 'icon-cloud-wind'; //hurricane, tornado, tropical storm
      case "3":
      case "4":
      case "37":
      case "38":
      case "39":
      case "45":
      case "47":
       return 'icon-cloud-flash'; //severe thunderstorms, thunderstorms,isolated thunderstorms,thundershowers,isolated thundershowers
      case "5":
      case "6":
      case "7": 
        return 'icon-snow-1'; //mixed rain and snow, mixed snow and sleet, hail
      case "8":
      case "9":
        return 'icon-drizzle-1'; //drizzle, freezing drizzle
      case "10":
      case "11":
      case "12":
      case "35":
      case "40":
       return 'icon-rain'; //freezing rain, showers,mixed rain and hail,scattered showers
      case "13":
      case "14":
      case "15":
      case "16":
        return 'icon-snow';//snow flurries,light snow showers,blowing snow,snow
      case "17":
      case "18":
        return 'icon-hail'; //hail, sleet
      case "20":
      case "21":
      case "22":
        return 'icon-mist'; //foggy, haze, smoky
      case "19":         
      case "23":
      case "24":
        return 'icon-wind'; //dust,blustery, windy
      case "36":
        return 'icon-temperatire'; //hot
      case "25":
        return 'icon-temperature'; //cold
      case "26":
        return 'icon-clouds'; //cloudy
      case "27":
      case "29":
        return 'icon-cloud-moon';//mostly cloudy (night),partly cloudy (night)
      case "28":
      case "30":
      case "44":
        return 'icon-cloud-sun-1';//mostly cloudy (day),partly cloudy (day),partly cloudy
      case "31":
      case "33":
        return 'icon-moon'; //clear (night), fair (night)
      case "32":
      case "34":
        return 'icon-sun-2'; //sunny, fair (day)
      case "41":
      case "42":
      case "43":
      case "46":
        return 'icon-snow-heavy'; //heavy snow, scattered snow showers,snow showers
      default:
        return 'icon-na'; //not available, code 3200

      }
  };

    $scope.codeToImage = function(code){
      switch (code){
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "37":
        case "38":
        case "39":
        case "45":
        case "47":
          return "images/hg11_bg.jpg"; //hurricane, tornado, tropical stormsevere thunderstorms, thunderstorms,isolated thunderstorms,thundershowers,isolated thundershowers
        case "41":
        case "42":
        case "43":
        case "46":
        case "5":
        case "6":
        case "7":
        case "13":
        case "14":
        case "15":
        case "16": 
          return "images/hg9_bg.jpg"; //mixed rain and snow, mixed snow and sleet, hail, snow flurries,light snow showers,blowing snow,snow,heavy snow, scattered snow showers,snow showers
        case "8":
        case "9":
          return "images/hg6_bg.jpg"; //drizzle, freezing drizzle
        case "10":
        case "11":
        case "12":
        case "35":
        case "40":
        case "17":
        case "18":
         return "images/giphyfff.gif"; //freezing rain, showers,mixed rain and hail,scattered showers,//hail, sleet
        case "20":
        case "21":
        case "22":
          return "images/hg4_bg.jpg"; //foggy, haze, smoky
        case "19":         
        case "23":
        case "24":
          return "images/hg2_bg.jpg"; //dust,blustery, windy
        case "36":
          return "images/hg8_bg.jpg"; //hot
        case "25":
          return "images/hg8_bg.jpg"; //cold
        case "26":
        case "27":
        case "29":
        case "28":
        case "30":
        case "44":
          return "images/hg5_bg.jpg"; //cloudy,mostly cloudy (night),partly cloudy (night),mostly cloudy (day),partly cloudy (day),partly cloudy
        case "31":
        case "33":
        case "32":
        case "34":
          return "images/hg8_bg.jpg"; //sunny, fair (day),clear (night), fair (night) 
        default:
          return "images/hg8_bg.jpg"; //not available, code 3200

      }
    };

});

