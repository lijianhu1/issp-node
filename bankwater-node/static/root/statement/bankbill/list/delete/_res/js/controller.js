var app = angular.module('bankbillDel', ['toastr']);
app.controller('bankbillDelCtrl', function($scope, toastr, $stateParams, $state, bankbillSer){
    //删除
    $scope.delYes = function(){

        var data = {
            id : $stateParams.id
        }

        bankbillSer.delBankbill(data).then(function(response){
            if(response.data.code == 0){
                toastr.bankbill("信息已删除", '温馨提示');
                $state.go('root.statement.bankbill.list');
                $scope.deledId = $stateParams.id;
                //向父Ctrl传递事件
                $scope.$emit('deletedId', $scope.deledId);
            }else {
                toastr.error(response.data.msg,'温馨提示')
            }
        })
    }
});