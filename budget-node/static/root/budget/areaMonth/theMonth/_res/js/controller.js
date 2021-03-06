var app = angular.module('collectTheMonth', ['toastr']);
app.controller('collectTheMonthCtrl', function($scope,$state,$stateParams,toastr,areaMonthSer){
    var getId = {id:$stateParams.id};
    areaMonthSer.listTheMonthArea(getId).then(function(response){
        if(response.data.code==0){
            $scope.showInfo=response.data.data;
        }
    });
    $scope.moreList = function(event){
        angular.forEach($scope.monthLists,function(obj){
            if(event.id!==obj.id){
                obj._moreList = false
            }
        });
        event._moreList = !event._moreList;
    };
});





