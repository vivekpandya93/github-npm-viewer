app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeController'
    });
});


app.controller('homeController', function ($scope, $http) {
	$scope.initialize = function() {
		$http.get('https://api.github.com/repos/npm/npm/issues', {params: {state: 'all'}}).success(function(data, status, headers, config){
			console.log("headers", headers)
			console.log("status", status)
			console.log("config", config)

			$scope.data = data;
			console.log("data", data.length)
		})

	}
});