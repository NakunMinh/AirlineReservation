var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'khuhoi.html'
	})
	.when('/khuhoi', {
		templateUrl: 'khuhoi.html'
	})
	.when('/motchieu', {
		templateUrl: 'motchieu.html'
	})
	.when('/minhnhi', {
		templateUrl: 'minhnhi.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});

app.controller('Abc', function($scope, $http, $location) {

	$http.get('http://localhost:3333/api/sanbaydi')
	.then(function(response){
		console.log(response.data);
		$scope.states = response.data;
	});

	$scope.change = function(){
		var noidi = $('#noidi').find(":selected").text();
		$http.get('http://localhost:3333/api/sanbayden/' + noidi.toString())
		.then(function(response){
			console.log(response.data);
			$scope.states1 = response.data;
		});
	};

	$scope.khuhoitimkiem = function(){
		console.log("here");
		var a = $('#abc').find(":selected").text();
		var b = $('.nav-tabs .active').text();
		console.log(b);
		$scope.abc = "Minh aaa";
		window.location.hash = '#/minhnhi';
	};
});