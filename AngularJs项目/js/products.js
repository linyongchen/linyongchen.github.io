
//angular.module函数有2个作用，第一：创建一个新模块。第二：获取已创建的模块
//如果只有一个参数，代表我要 【获取】 某一模块，前提是【之前定义过】该模块
//如果有2个参数，表示要创建一个新的模块，第二个参数是一个数组，里面是若干字符串，每个字符串代表一个已有模块的名称。表示新建的这个模块需要依赖这些模块。


var app = angular.module("shop");//获取创建的shop模块 所以对应是js文件放在之后 
app.controller("productsCtrl",function($scope,$http){

	$http(
		{
		url:"php/getProducts.php",
		method:"GET"
		}
	).then(
	function(response){
		
		$scope.products = response.data;

		//方法一
		// $scope.makeCategoryes = function(){
		// 	var categoryes = [];
		// 	var obj = {};// 用途很大的空对象
		// 	for (var i = 0; i < $scope.products.length; i++) {
		// 		var category = $scope.products[i].category;
		// 		if ( angular.isUndefined(obj[category]) ) {
		// 			obj[category] = true;//如果找不到obj的category，就给它一个true
		// 			categoryes.push(category);
		// 		}
		// 	}
		// 	$scope.categoryes = categoryes;
		// }
		// $scope.makeCategoryes();//调用函数

		$scope.findCategory = function(category){
			//用一个变量保存选中的分类的名称
			$scope.currentCategory = category;
			var result = [];
			if (category == "全部"){
				result = $scope.products;
			}else{
				for (var i = 0; i < $scope.products.length; i++) {
					if($scope.products[i].category == category){
						result.push($scope.products[i]);
					}
				}
			}
			$scope.categoryProducts = result;
			$scope.productsPage(1,3);
		}

		$scope.pages = function(numPerPage){
			var count = $scope.categoryProducts.length;
			var pagesArray = [];
			var totalpage = Math.ceil(count / numPerPage);
			for (var i = 0; i < totalpage; i++) {
				pagesArray.push(i+1);
			}
			return pagesArray;
		}

		$scope.productsPage = function(pageNum,numPerPage){
			$scope.clickNum = pageNum;

			var startIndex = (pageNum - 1) * numPerPage;
			var endIndex = Math.min(pageNum * numPerPage,$scope.categoryProducts.length);
			var result = [];
			for (var i = startIndex; i < endIndex; i++) {
				result.push($scope.categoryProducts[i]);
			}
			$scope.pageProducts = result;
		}

		$scope.classOfSelectedCategory = function(category){
			return $scope.currentCategory == category ? "btn-primary" : "";
		}

		$scope.classOfSelectedPage = function(pageNum){
			return $scope.clickNum == pageNum ? "btn-primary" : "";
		}

		
		$scope.addToCart = function(product){
			var hasThisProduct = false;//假设购物车里没有这个商品
			for (var i = 0; i < $scope.result.length; i++) {
				if($scope.result[i].id == product.id){
					$scope.result[i].count++;
					hasThisProduct = true;
					break;//已经找到相同商品，不用往后看是否还有相同
				}
			}
			
			if(hasThisProduct == false){
				$scope.result.push({id:product.id,name:product.name,price:product.price,count:1});
			}
			
			console.log($scope.result);

		}


		$scope.findCategory("全部");

	},
	function(response){

	})

})