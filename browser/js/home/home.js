app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeController'
    });
});


app.controller('homeController', function ($scope, $http) {
	$scope.current = 1;
	$scope.bigTotalItems = 0;

	var lastPage = (function(){
		$http.get('https://api.github.com/repos/npm/npm').success(function(data){
			$scope.bigTotalItems = data.open_issues_count
			$scope.numPages = Math.ceil($scope.bigTotalItems/30);
			 console.log("bigTotalItems", $scope.bigTotalItems)
		})

	})()

	$scope.$watch('bigCurrentPage', function(newVal){
		$scope.initialize(newVal)
	})
	$scope.initialize = function(pageNumber) { 
	console.log("pageNumber", pageNumber) 
		$http.get('https://api.github.com/repos/npm/npm/issues', {params: {page: pageNumber, per_page: 10}}).success(function(data, status, headers, config){
				console.log("headers", headers)
				console.log("status", status)
				console.log("config", config)

				$scope.data = data;
				console.log("data", data.length)
			})				
	}

 


  $scope.totalItems = 30;
  $scope.currentPage = 4;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    $log.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.maxSize = 5;
  $scope.bigCurrentPage = 1;


	// $scope.paginate = function(currentPage, type) {
	// 	if(currentPage <=3 && type === 'previous') {
	// 		return; 
	// 	} 
	// 	else if(type === 'previous') {
	// 		$scope.current = $scope.current - 3
	// 	}
	// 	else if (currentPage > $scope.number_of_issues - 3  && type === 'next') {
	// 		return;
	// 	}
	// 	else if(type === 'next'){
	// 		$scope.current = $scope.current + 3
	// 	}
	// }

});



	





/*
	var paginate = function() {
		



	}




*/