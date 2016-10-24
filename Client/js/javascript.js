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
	.when('/resultkhuhoi', {
		templateUrl: 'result_khuhoi.html'
	})
	.when('/resultmotchieu',{
		templateUrl: 'result_motchieu.html'
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
		$scope.ngaydi = $('#ngaydi').val();
		$scope.ngayve = $('#ngayve').val();
		var noidi = $('#noidi').find(":selected").text();
		var noiden = $('#noiden').find(":selected").text();
		$http.get('http://localhost:3333/api/resultkhuhoi?noidi=' + noidi.toString() + '&noiden=' + noiden.toString())
		.then(function(response){
			console.log(response.data);
			$scope.resultkhuhoidi = response.data;
		});
		$http.get('http://localhost:3333/api/resultkhuhoi?noidi=' + noiden.toString() + '&noiden=' + noidi.toString())
		.then(function(response){
			console.log(response.data);
			$scope.resultkhuhoive = response.data;
		});
		window.location.hash = '#/resultkhuhoi';
	};

	$scope.checkboxchange = function(){
		var tongtien = 0;
		var selected1 = [];
		var selected2 = [];
		var table1 = document.getElementById('khuhoidi');
		var table2 = document.getElementById('khuhoive');
		$('#khuhoidi input:checked').each(function() {
    		selected1.push($(this).attr('name'));
		});
		$('#khuhoive input:checked').each(function() {
    		selected2.push($(this).attr('name'));
		});
		for (var i = 0; i < selected1.length; i++){
			tongtien += parseInt(table1.rows[parseInt(selected1[i]) + 1].cells[5].innerHTML, 10);
		}
		for (var i = 0; i < selected2.length; i++){
			tongtien += parseInt(table2.rows[parseInt(selected2[i]) + 1].cells[5].innerHTML, 10);
		}
		$scope.tongtien = tongtien;
	}
	$scope.continue = function(){
		var tongtien = 0;
		var selected1 = [];
		var selected2 = [];
		var table1 = document.getElementById('khuhoidi');
		var table2 = document.getElementById('khuhoive');
		$('#khuhoidi input:checked').each(function() {
    		selected1.push($(this).attr('name'));
		});
		$('#khuhoive input:checked').each(function() {
    		selected2.push($(this).attr('name'));
		});
		for (var i = 0; i < selected1.length; i++){
			tongtien += parseInt(table1.rows[parseInt(selected1[i]) + 1].cells[5].innerHTML, 10);
		}
		for (var i = 0; i < selected2.length; i++){
			tongtien += parseInt(table2.rows[parseInt(selected2[i]) + 1].cells[5].innerHTML, 10);
		}
		$scope.tongtien = tongtien;
		$scope.luutru = [];
		for (var i = 0; i < selected1.length; i++){
			var Obj = {
				gio: table1.rows[parseInt(selected1[i]) + 1].cells[1].innerHTML,
				hang: table1.rows[parseInt(selected1[i]) + 1].cells[2].innerHTML,
				mucgia: table1.rows[parseInt(selected1[i]) + 1].cells[3].innerHTML,
				soluongghe: parseInt(table1.rows[parseInt(selected1[i]) + 1].cells[4].innerHTML),
				giaban: parseInt(table1.rows[parseInt(selected1[i]) + 1].cells[5].innerHTML)
			};
			$scope.luutru.push(Obj);
		}
		for (var i = 0; i < selected2.length; i++){
			var Obj = {
				gio: table2.rows[parseInt(selected2[i]) + 1].cells[1].innerHTML,
				hang: table2.rows[parseInt(selected2[i]) + 1].cells[2].innerHTML,
				mucgia: table2.rows[parseInt(selected2[i]) + 1].cells[3].innerHTML,
				soluongghe: parseInt(table2.rows[parseInt(selected2[i]) + 1].cells[4].innerHTML),
				giaban: parseInt(table2.rows[parseInt(selected2[i]) + 1].cells[5].innerHTML)
			};
			$scope.luutru.push(Obj);
		}
		console.log($scope.luutru[0].giaban);
		//khoi tao ma dat cho - trang thai 0
	};
});