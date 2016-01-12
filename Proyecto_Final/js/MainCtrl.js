
angular.module('weatherApp').controller('MainCtrl', ['$scope', '$http', 'widgetsService',function ($scope,$http,widgetsService) {



  $scope.updateQuery = function(val) {
		
	
	
		$http({
		  method: 'GET',  
			url: 'https://query.yahooapis.com/v1/public/yql?q=select * from geo.places(0,2) where text="' + val + '" and country.code="AR" and placeTypeName.content="Town"&format=json&env=store://datatables.org/alltableswithkeys'
		  })
		  .success(function (data, status, headers, config) {
		
			  $scope.city_query = data.query.results.place;

		  })
		  .error(function (data, status, headers, config) {
		   
		  });
        
    }

    $scope.addWidget = function(val){

      $http({
        method: 'GET',  
        url: 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places where text="' + val + '" and country.code="AR") and u="c"&format=json&env=store://datatables.org/alltableswithkeys'
        })
        .success(function (data, status, headers, config) {
          
      
          widgetsService.add(data.query.results.channel);
          

        })
        .error(function (data, status, headers, config) {
         
        });

    }	
  
}]);


