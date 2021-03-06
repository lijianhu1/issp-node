var app = angular.module('emailEdit', ['toastr','ipCookie']);
app.controller('emailEditCtrl', function($scope, emailSer,$state,toastr,$stateParams,ipCookie,$location){
    var emaiId = {id : $stateParams.id};
    //获取值
    emailSer.getFourById(emaiId).then(function(response){
        if(response.data.code==0){
            $scope.editInfo = response.data.data;
            $scope.myFunc = function() {
                var type={type:$scope.editInfo.type};
                emailSer.listNameType(type).then(function(response){
                    if(response.data.code == 0){
                        $scope.companyNames = response.data.data;
                    }else if(response.data.code==1){
                        toastr.error( response.data.msg, '温馨提示');
                    }
                });
            };
        }
    });
    $scope.emaiIdEditFun = function(){
        var vm = $scope;
        var data = {
            id:vm.editInfo.id,
            type: vm.editInfo.type,
            companyOrNames: vm.editInfo.comNames,
            remark: vm.editInfo.remark,
            sendNum: vm.editInfo.sendNum,
            collectSendUnit:vm.editInfo.collectSendUnit,
            collectUnit: vm.editInfo.collectUnit,
            status: vm.editInfo.status,
            sendObjectList: vm.editInfo.sendObjectList,
        };
        emailSer.editEmail(data).then(function(response){
            if(response.data.code == 0){
                $state.go('root.ability.email.list');
                toastr.success(vm.editInfo.type+ "已成功编辑", '温馨提示');
            }else if (response.data.code == 403||response.data.code==401) {
                toastr.error( "请登录用户,3秒后跳至登陆页面", '温馨提示');
                var absurl = $location.absUrl();
                ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes',domain:'issp.bjike.com' })
                setTimeout(function(){
                    window.location.href='http://localhost/login'
                },3000)
            }else if(response.data.code==1){
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    };
});