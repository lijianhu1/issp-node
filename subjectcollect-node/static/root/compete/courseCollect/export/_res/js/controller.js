var app = angular.module('recordEdit', ['toastr','ipCookie']);
app.controller('recordEditCtrl', function($scope, recordSer,$state,toastr,$stateParams,ipCookie,$location,$filter){
    var recordId = {id : $stateParams.id};
    //获取值
    recordSer.moneyId(recordId).then(function(response){
        if(response.data.code==0){
            $scope.data = response.data.data;
        }
    });
    //提交
    $scope.recordEditFun = function(){
        var vm = $scope;
        var data = vm.data;

        var d =  angular.element('.time').val();
        data.submitDate=d;
        //只取两位小数
        $scope.data.income = Number($scope.data.income).toFixed(2);
        $scope.data.expenditure = Number($scope.data.expenditure).toFixed(2);
        recordSer.moneyEdit(data).then(function(response){
            if(response.data.code == 0){
                $state.go('root.compete.record.list');
                toastr.success( "已成功编辑", '温馨提示');
            }else if(response.data.code==403||response.data.code==401){

                toastr.error( "请登录用户,2秒后跳至登陆页面", '温馨提示');
                var absurl = $location.absUrl();
                ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes' });
                setTimeout(function(){
                    window.location.href='http://localhost/login'
                },2000)
            }else{
                toastr.error(response.data.msg,'温馨提示');
            }
        });
    };
});