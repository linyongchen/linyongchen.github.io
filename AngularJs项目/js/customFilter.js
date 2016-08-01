//定义新的模块
var cf = angular.module("filters",[]);

//方法二，自定义过滤器
		cf.filter("unique",function(){
			return function(data){
				if( angular.isArray(data) ){
					var categoryes = [];
					var obj = {};// 用途很大的空对象
					for (var i = 0; i < data.length; i++) {
						var category = data[i].category;
						if ( angular.isUndefined(obj[category]) ) {
							obj[category] = true;
							categoryes.push(category);
						}
					}
					return categoryes;
				}else{
					return [];
				}
			}
		})