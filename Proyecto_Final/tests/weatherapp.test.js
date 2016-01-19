

(function() {
  describe('Testing WidgetsList', function() {

  
	beforeEach(function() {

	    // set up a default value for your mock
	    widgetsServiceMock = {
	        delete: ''
	    }

	    // use the $provide service to replace ServiceB
	    // with your mock
	    module('weatherApp', function($provide) {
	        $provide.value('widgetsService', widgetsServiceMock);

	    });
	    var $controller;
	});
  	
	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));

	
	describe('Function that returns weather codes', function () {
		it('should return icon-cloud-wind', function() {
		      var $scope = {};
		      var controller = $controller('WidgetsList', { $scope: $scope, widgetsService: widgetsServiceMock });
		      expect($scope.codeToIcon('0')).toBe('icon-cloud-wind');
		});
	});
  	


  });
}());