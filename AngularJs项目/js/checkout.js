var app = angular.module("shop");
app.controller("checkoutCtrl",function($scope){
	$scope.delete = function(product){
		for (var i = 0; i < $scope.result.length; i++) {
			if($scope.result[i].id == product.id){
				$scope.result.splice(i,1);
				break;
			}
		}
	}
	$scope.minusCount = function(product){
		if(product.count > 0){product.count -= 1;}
	}
	$scope.plusCount = function(product){
		product.count += 1;
	}
})