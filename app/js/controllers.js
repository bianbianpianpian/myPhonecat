'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
  }]);
/*var PhoneDetailCtrl = phonecatControllers.controller('PhoneDetailCtrl', function($scope, $routeParams, Phone){
  $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });
    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
});
PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];*/

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);
//双向数据绑定
phonecatControllers.controller('twowaybindViewCtrl', ['$scope', '$routeParams', 
  function($scope, $routeParams) {
   $scope.yourName = "world";
   $scope.yourNameChange = function(){
    console.log('模型变化',$scope.yourName);
   };
  }]);
//指令
phonecatControllers.controller('directiveViewCtrl', ['$scope', '$routeParams', 
  function($scope, $routeParams) {
   $scope.loggedInUser1 = {
      name: "Austin Powers"
    }; 
    $scope.loggedInUser2 = "Austin Powers2";
    $scope.add = function(x, y) {
      return x + y;
    };
  }]);
//controller之间的传递
phonecatControllers.controller('transmitViewCtrl', ['$scope', '$routeParams', 
  function($scope, $routeParams) {
   
  }]);
//$scope method
phonecatControllers.controller('scopeMethodViewCtrl', ['$scope', '$routeParams', 
  function($scope, $routeParams) {
    //$watch
    //基本类型
    $scope.count1 = 0;
    $scope.name = 'Alfred';
    $scope.$watch('name',function(newValue, oldValue){
        console.log(newValue, oldValue)
        $scope.count1++;
    });
    //引用类型
    $scope.count2 = 0;
    $scope.items = [{ "a": 1 },{ "a": 2 },{ "a": 3 },{ "a": 4 }];
    $scope.$watch('items',function(){
        $scope.count2++;
    },true);//第三个参数默认false,引用监视；true，全等监视

    //$watchCollection
    $scope.count3 = 0;
    $scope.itemCollections = [{ "a": 1 },{ "a": 2 },{ "a": 3 },{ "a": 4 }];
    $scope.$watchCollection('itemCollections',function(){
        $scope.count3++;
    });

    //$apply（browser DOM events, setTimeout->$timeout服务, XHR or third party libraries）
    setTimeout(function() {
        // $scope.message = 'Fetched after 2 seconds'; 
        $scope.$apply(function() {
         $scope.message = 'Fetched after 2 seconds'; 
        });
    }, 2000);

    //$eval
    $scope.a = 1;
    $scope.b = 2;
    console.log($scope.$eval('a+b'));
}]);
//$q服务
phonecatControllers.controller('asynViewCtrl', ['$scope', '$http', '$routeParams', 'kindInfo','$q',
  function($scope, $http, $routeParams, kindInfo, $q) {
    // 官网例子
    function okToGreet(name) {
      return false;
    }
    function asyncGreet(name) {
      var deferred = $q.defer();
      
      setTimeout(function() {
        // 因为此function 在未来的事件循环中异步执行,
        // 我们需要把代码包装到到一个 $apply 调用中,以便正确的观察到 model 的改变
        $scope.$apply(function() {
          deferred.notify('即将问候 ' + name + '.');
      
          if (okToGreet(name)) {
            deferred.resolve('你好, ' + name + '!');
          } else {
            deferred.reject('拒绝问候 ' + name + ' .');
          }
        });
      }, 1000);
      
      return deferred.promise;
    }
      
    var promise = asyncGreet('小漠漠');
    promise.then(function(greeting) {
      alert('成功: ' + greeting);
    }, function(reason) {
      alert('失败鸟: ' + reason);
    }, function(update) {
      alert('收到通知: ' + update);
    })
    // .catch(function(reason){
    //   alert('失败鸟2: ' + reason);
    // })
    .finally(function(){
      alert('结束！');
    });


    // 实际使用
    // var deferred = $q.defer();
    // $http({method:"GET",url:"data/1.json"}).success(function(data){
    //   console.log('first',data);
    //   $scope.datas = data;
    //   deferred.resolve();
    // }).error(function(){

    // }); 
    kindInfo.then(function (data) {
      console.log('类别',data);
      $scope.kinds = data;
      for(var i=0;i<$scope.kinds.length;i++){
        (function(i){
          $http({method:"GET",url:"data/"+$scope.kinds[i].id+".json"}).success(function(datas){
            console.log($scope.kinds[i].name,'的phones',datas);
            $scope.kinds[i].phones = datas;
          });
        })(i);
      }
    });

    var allPromise = $q.all(promise,kindInfo);

    var promiseB = allPromise.then(function (result){
      console.log('所有成功');
      return result;
    },function(reason){
      console.log('失败了！',reason);
      return $q.reject(reason);  
    }).finally(function(){
      console.log('真心结束');
    });
    promiseB.catch(function(reason){
      console.log('promiseB失败理由',reason);
    });
    $q.when('hello').then(function(){
      console.log('yes!!!!!!');
    }).catch(function(){
      console.log('no!!!!!!!');
    });
  }]);
//$resource服务
phonecatControllers.controller('resourceViewCtrl', ['$scope', '$http', '$routeParams', '$resource',
  function($scope, $http, $routeParams, $resource) {
    
    var Phones = $resource('phones/phones.json', {});
    console.log(Phones.query());
    $scope.phones = Phones.query();
    // var user = User.get({userId:123}, function() {
    //   user.abc = true;
    //   user.$save();
    // });

  }]);


phonecatControllers.controller('SelfCtrl', function($scope) {
  $scope.click = function () {
    $scope.$broadcast('to-child', '通过$broadcast传递给child');
    $scope.$emit('to-parent', '通过$emit传递给parent');
  }
});

phonecatControllers.controller('ParentCtrl', function($scope) {
  $scope.$on('to-parent', function(event,data) {
    console.log('ParentCtrl', data);     //父级能得到值
  });
  $scope.$on('to-child', function(event,data) {
    console.log('ParentCtrl', data);     //子级得不到值
  });
});

phonecatControllers.controller('ChildCtrl', function($scope){
  $scope.$on('to-child', function(event,data) {
    console.log('ChildCtrl', data);    //子级能得到值
  });
  $scope.$on('to-parent', function(event,data) {
    console.log('ChildCtrl', data);    //父级得不到值
  });
});

phonecatControllers.controller('BroCtrl', function($scope){  
  $scope.$on('to-parent', function(event,data) {  
    console.log('BroCtrl', data);     //平级得不到值  
  });  
  $scope.$on('to-child', function(event,data) {  
    console.log('BroCtrl', data);     //平级得不到值  
  });  
});
