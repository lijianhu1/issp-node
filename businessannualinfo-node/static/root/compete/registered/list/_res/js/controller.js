var app = angular.module('registeredList', ['ng-pagination','toastr']);
app.controller('registeredListCtrl',function($scope,registeredSer,toastr) {

   //选择
    $scope.selectList = function(event){
        angular.forEach($scope.registeredLists,function(obj){
            obj._selectList = false
        });
        event._selectList = true;
        $scope.idList = event.id;
        //向父Ctrl传递事件
        $scope.$emit('changeId', $scope.idList);
    };
    //查看更多
    $scope.moreList = function(event){
        angular.forEach($scope.registeredLists,function(obj){
            if(event.id!==obj.id){
                obj._moreList = false
            }
        });
        event._moreList = !event._moreList;
    };
    
    function activatePage(page) {
        var listData = {
            page:page
        }
        registeredSer.loginList(listData).then(function(response){
            if(response.data.code==0){
                $scope.registeredLists = response.data.data
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    }
    $scope.abili = {
        itemsCount: 1, //总条数
        take: 10, //每页显示
        activatePage: activatePage
    };
    registeredSer.loginNews().then(function(response){
        if(response.data.code == 0){
            $scope.abili.itemsCount = response.data;
        }else{
                toastr.error( response.data.msg, '温馨提示');
            }
    });
    //删除
    $scope.$on('deletedId',function(event,delid){
        angular.forEach($scope.registeredLists.data,function(obj){
            if(obj.id == delid){
                obj._delete = true
            }
        })
    });
});
