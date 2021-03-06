var app = angular.module('competitorOrganize', ['toastr','ipCookie']);
app.controller('servereCordOrganizeCtr',function($scope,servereCordSer,$state,toastr,$stateParams,$location,ipCookie){
    var EditId = {id : $stateParams.id};
    //获取值
    servereCordSer.getOneById(EditId).then(function(response){
        if(response.data.code==0){
            $scope.data = response.data.data;
        }
    });
    $scope.organizeSmit = function(){
        var vm = $scope;
        var data = $scope.data;
        servereCordSer.fundModuleOpinionEidt(data).then(function(response){
            if(response.data.code == 0){
                toastr.success('温馨提示','资金模块审核成功');
                $state.go('root.marketActivity.servereCord.list')
            }else if(response.data.code==403  || response.data.code==401){
                toastr.error( "请登录用户,3秒后跳至登陆页面", '温馨提示');
                var absurl = $location.absUrl();
                ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes',domain:'issp.bjike.com' });
                setTimeout(function(){
                    window.location.href='http://localhost/login'
                },3000)
            }else {
                toastr.error( response.data , '温馨提示')
            }
        })
    }
});