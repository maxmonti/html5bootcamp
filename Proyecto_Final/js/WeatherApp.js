

angular.module('weatherApp', ['ngAnimate']);


/* function that wraps around js' localstorage internal handling
 * We use this to save the model to local storage so that changes are shared 
 * across different tabs and persisted on each page reload
*/
angular.module('weatherApp').factory('$localstorage', ['$window', function($window) {
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
  model (MainCtrl and AdvSearch) so that both have the ability to add new widgets
  We also use this to wrap around the localstorage functions
*/
angular.module('weatherApp').factory('widgetsService', function($localstorage){
  
  if ($localstorage.get("firstrun",0) == 0 ){
    var widgets =  [];
    $localstorage.set("firstrun",1)
    $localstorage.setObject('widgets-storage',widgets)
  }else{
    var widgets = $localstorage.getObject("widgets-storage")

  }

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


