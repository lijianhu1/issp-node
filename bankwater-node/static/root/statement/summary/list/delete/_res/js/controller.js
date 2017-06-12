var app = angular.module('infoDel', ['toastr', 'ipCookie']);
app.controller('infoDelCtrl', function($scope, toastr, $stateParams, $state, infoSer, $location, ipCookie){
    //删除
    $scope.delYes = function(){

        var data = {
            id : $stateParams.id
        }

        infoSer.delInfo(data).then(function(response){
            if(response.data.code == 0){
                toastr.info("信息已删除", '温馨提示');
                $state.go('root.statement.info.list');
                $scope.deledId = $stateParams.id;
                //向父Ctrl传递事件
                $scope.$emit('deletedId', $scope.deledId);
            } else if(response.data.code == 403 || response.data.code == 401){
                toastr.error("请登录用户,2秒后跳至登陆页面", '温馨提示');
                var absurl = $location.absUrl();
                ipCookie('absurl', absurl, {expires : 3, expirationUnit : 'minutes'});
                setTimeout(function(){
                    window.location.href = 'http://localhost/login'
                }, 2000)
            }
        })
    }
});