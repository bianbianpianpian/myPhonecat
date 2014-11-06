'use strict';

/* Directives */
// phonecatApp.directive('phonecatDirectives', [function () {
// 	return {
// 		restrict: 'phoneTextarea',
// 		link: function (scope, iElement, iAttrs) {
// 			alert()
// 		}
// 	};
// }])；
phonecatApp.directive('helloWorld',function(){
    return {
        scope: true, //使用一个继承父作用域的子作用域，隔离作用域使用{}   
        restrict: 'AECM',
        replace: false,
        transclude: true,
        templateUrl: 'partials/helloWorld.html',
		compile: function(tElem,tAttrs){
			console.log("执行compile");
            //在这里原则性的做一些DOM转换   
            return function(scope,elem,attrs){
	             //这里编写link函数
	             console.log("执行compile中的小link");
	             elem.bind('click',function(){
	                //elem.css('background-color','white');
		            scope.$apply(function(){
		                scope.color = "pink";
		            });
	            });
	            elem.bind('mouseover',function(){
	                elem.css('cursor','pointer');
	            });
            }
        },
        link: function (scope, elem, attr) {
 			console.log('执行link');
			//elem事件绑定
			elem.bind('click',function(){
                //elem.css('background-color','white');
	            scope.$apply(function(){
	                scope.color = "red";
	            });
            });
            elem.bind('mouseover',function(){
                elem.css('cursor','pointer');
            });
            //attr属性
			console.log("attr（some-attribute）：",attr.class)
		}       
    }
}).directive("myUserDirective1", function() {
    return {
      restrict: "E",
      template: "子：<input ng-model='user.name' /></>",
      scope: {
        user: "="
      },
      link: function(scope) {
        
      }
    };
}).directive("myUserDirective2", function() {
    return {
      restrict: "E",
      template: "子：<input ng-model='fullname'/></>",
      scope: {
        fullname: "@"
      },
      link: function(scope) {
        
      }
    };
  }).directive("myAddThings", function() {
    return {
      restrict: "E",
      template: "{{result}}",
      scope: {
        localFn: "&fn"
      },
      link: function(scope) {
        scope.result = scope.localFn({
          x: 1,
          y: 2
        });
      }
    };
  });