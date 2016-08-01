var app = angular.module("shop",["filters","ngRoute"]);

app.config(function($routeProvider){
	$routeProvider.when("/products",{templateUrl:"template/products.html"});
	$routeProvider.when("/checkout",{templateUrl:"template/checkout.html"});
	$routeProvider.otherwise({templateUrl:"template/products.html"})
});

app.controller("mainCtrl",function($scope,$http){
	$scope.result = [];
	$scope.totalCount = function(){

		$scope.totalCost = 0;
		var sum = 0;

		for (var i = 0; i < $scope.result.length; i++) {
			sum += $scope.result[i].count;
			$scope.totalCost += $scope.result[i].price * $scope.result[i].count;
		}
		return sum;
	}

})

app.directive("navBar",function(){
	return{templateUrl:"navBar.html"}
})