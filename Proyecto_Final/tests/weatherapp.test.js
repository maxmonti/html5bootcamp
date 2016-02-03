
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

	    inject(function(_$controller_){
			$controller = _$controller_;
		});

	    
	});
  	
  	/*
	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	})); 
	*/
	
	
	describe('Function that returns weather codes', function () {
		it('should return the correct weather code', function() {
		      var $scope = {};
		      var controller = $controller('WidgetsList', { $scope: $scope, widgetsService: widgetsServiceMock });
		      //Testing codeToIcon function
		      expect($scope.codeToIcon('0')).toBe('icon-cloud-wind');
		      expect($scope.codeToIcon('42')).toBe('icon-snow-heavy');
		      expect($scope.codeToIcon('1000')).toBe('icon-na');
		   	  expect($scope.codeToIcon(false)).toBe('icon-na');



		});
	});

	describe('Function that returns weather images', function () {
		it('should return the correct image string', function() {
		      var $scope = {};
		      var controller = $controller('WidgetsList', { $scope: $scope, widgetsService: widgetsServiceMock });
		      
		   	  //Testing codeToImage function
		   	  expect($scope.codeToImage('44')).toBe("images/hg5_bg.jpg");
		   	  expect($scope.codeToImage('23')).toBe("images/hg2_bg.jpg");
		   	  expect($scope.codeToImage({})).toBe("images/hg8_bg.jpg");

		   	  


		});
	});

	describe('Function that shows the "close" button on the widget elements', function () {
		it('should set the hidden "close button" elements opacity to 1', function() {
		      var $scope = {};
		      var controller = $controller('WidgetsList', { $scope: $scope, widgetsService: widgetsServiceMock });
		      
		   	  //Mock HTML element for showCloseButton
		   	  var dummyElement = document.createElement('div');
		   	  document.getElementById = function(id){
		   	  	return dummyElement;}
		   	  	
		   	  $scope.showCloseButton('1');
		   	  expect(dummyElement.style.opacity).toBe('1');



		});
	});
  	


  });
}());
