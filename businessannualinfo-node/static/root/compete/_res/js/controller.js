var app = angular.module('compete', []);
app.controller('competeCtrl', function ($scope,$state) {
    if ($state.current.url == '/compete') {//默认加载列表
         $state.go('root.compete.registered');
    }
    //父 Ctrl 监听到事件，向下广播
    $scope.$on('changeId',function(event,msg){
        $scope.$broadcast('listId',msg)
    });
}).controller('navCtrl',function($scope,$state,$location){
    $scope.navCla='registered';
    var active = $location.path().split('/')[3];
    $scope.navCla=active?active:'registered';
    $scope.navClass= function(name){
        $scope.navCla=name
    }
})

