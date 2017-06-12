var app = angular.module('summaryContrast', ['ng-pagination','toastr']);
app.controller('summaryContrastCtrl',function($scope,summarySer,toastr){

    $scope.ConSum = function(yea,months){
        if(yea, months){
            var mavgs = {
                year : yea,
                month : months,
            }
            summarySer.constrastlistInfo(mavgs).then(function(response){
                //console.log(mavgs);
                if(response.data.code == 0){
                    $scope.infoLists = response.data.data;
                } else {
                    toastr.error(response.data.msg, '温馨提示');
                }
            });
            $scope.selectList = function(event){
                angular.forEach($scope.infoLists, function(obj){
                    obj._selectList = false
                });
                event._selectList = true;
                //向父Ctrl传递事件
                $scope.$emit('changeId', event.id);
            };
        }
    }

});


