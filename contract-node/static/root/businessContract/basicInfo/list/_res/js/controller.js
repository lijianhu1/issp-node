var app = angular.module('basicInfoList', ['ng-pagination','toastr']);
app.controller('basicListCtrl',function($scope,basicSer,toastr){
    $scope.$emit('changeId', null);
    $scope.teamInfo = {};
    function activatePage(page) {
        var listData = {
            page:page
        };
        basicSer.basicInfoList(listData).then(function(response){
            if(response.data.code==0){

                $scope.basicLists = response.data.data
            }else{
                toastr.error(response.data.msg, '温馨提示');
            }
        });
    }

    $scope.selectList = function(event){
        angular.forEach($scope.basicLists,function(obj){
                obj._selectList = false
        });
        event._selectList = true;
        $scope.idListd = event.id;
        //向父Ctrl传递事件
        $scope.$emit('changeId', $scope.idListd);

    };
    //点击更多详细
    $scope.moreList = function(event){
        angular.forEach($scope.basicLists,function(obj){
            if(event.id!==obj.id){
                obj._moreList = false
            }
        });
        event._moreList = !event._moreList;
    };

    $scope.$on('deletedId',function(event,delid){
        angular.forEach($scope.basicLists,function(obj){
            if(obj.id == delid){
                obj._delete = delid
            }
        })
    });

//分页
    $scope.custom = {
        itemsCount: 2, //总条数
        take: 10, //每页显示
        activatePage: activatePage
    };

    basicSer.countBasicInfo().then(function(response){
        if(response.data.code==0){
            $scope.custom.itemsCount = response.data.data;
        }else{
            toastr.error(response.data.msg, '温馨提示');
        }
    })

});

