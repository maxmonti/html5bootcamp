

angular.module('weatherApp').controller('AdvSearch', function ($scope,$http,widgetsService){

    $http({
      method: 'GET',  
      url: 'https://query.yahooapis.com/v1/public/yql?q=select * from geo.states where place="argentina"&format=json&env=store://datatables.org/alltableswithkeys'
      })
      .success(function (data, status, headers, config) {
    
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
      
          $scope.cities= data.query.results.place;

        })
        .error(function (data, status, headers, config) {
         
        })
    }


    $scope.addAWidget = function(val){

      $http({
        method: 'GET',  
        url: 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid=' + val + ' and u="c"&format=json&env=store://datatables.org/alltableswithkeys'
        })
        .success(function (data, status, headers, config) {
          
     
          widgetsService.add(data.query.results.channel);
          

        })
        .error(function (data, status, headers, config) {
         
        });

    } 


});


