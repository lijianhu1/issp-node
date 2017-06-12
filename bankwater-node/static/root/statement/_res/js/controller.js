var app = angular.module('statement', []);
app.controller('statementCtrl', function ($scope,$state) {
    if ($state.current.url == '/statement') {//默认加载列表
        $state.go('root.statement.info');
    }
    //父 Ctrl 监听到事件，向下广播
    $scope.$on("changeId",function(event,id){
        $scope.$broadcast("passId",id)
    });

}).controller('navCtrl',function($scope,$state,$location){
    $scope.navCla='info';
    var active =$location.path().split('/')[3];
    $scope.navCla=active?active:'info';
    $scope.navClass= function(name){
       $scope.navCla=name;
    }
    $scope.showsList=[
        {id:"1",item:"银行流水管理",menuList:[{name:'银行账户信息'},{name2:"银行流水"},{name3:"汇总分析"}],showIs:false},
        /* {id:"2",item:"设置",menuList:[{name6:'设置'}],showIs:false},*/
    ];
    $scope.showMenu = function(obj,event) {
        if(event){
            if(obj.showIs){
                obj.showIs=!event;
            }else{
                obj.showIs=event;
                /* angular.forEach(function(item){ showSubAble sublist*/
                this.showsList.forEach(function(item){
                    if(item.id!=obj.id){
                        item.showIs=!event;
                    }else{
                        item.showIs=event;
                    }
                });
            }
        }
    };
   /* angular.element('.big').click(function(){

        angular.element(this).siblings('h3').find('i').addClass('change-angle').end().next().hide();

        angular.element(this).next().toggle().end().find('i').toggleClass('change-angle');

    })
    angular.element('.big').eq(0).trigger("click");
*/
});

