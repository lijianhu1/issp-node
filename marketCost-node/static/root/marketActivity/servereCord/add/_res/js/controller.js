var app = angular.module('serveCordAdd', ['toastr','ipCookie']);
app.controller('serverecordAddCtrl', function($scope, servereCordSer,$state,toastr,ipCookie,$location){
    //添加竞争对手
    $scope.companyAddFun = function(){
        $scope.data.planActivityTiming = angular.element('.addPlanTime').val();//计划时间
        $scope.data.actualActivityTiming = angular.element('.addActualTime').val();//实际时间
        $scope.data.actualActivityTiming = '2015-01-27 10:11:12';//实际时间报错
        $scope.data.predictCharge = Math.floor($scope.num*100) / 100;//预计费用
        var data = $scope.data;
        servereCordSer.addMarketserveapply(data).then(function(response){
            if(response.data.code == 0){
                $state.go('root.marketActivity.servereCord.list');
                toastr.success( "已成功添加", '温馨提示');
            }else if(response.data.code==403  || response.data.code==401){
                toastr.error( "请登录用户,3秒后跳至登陆页面", '温馨提示');
                var absurl = $location.absUrl();
                ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes',domain:'issp.bjike.com' });
                setTimeout(function(){
                    window.location.href='http://localhost/login'
                },3000)
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    };
    //控制数字不能小于1
    $scope.changeNum =function(){
        if($scope.data.predictAttendNo < 1){
            $scope.data.predictAttendNo = 1;
        }
    }
});




