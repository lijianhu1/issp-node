var app = angular.module('infoList', ['ng-pagination','toastr','ipCookie']);
app.controller('infoListCtrl',function($scope,infoSer,toastr,ipCookie,$location){

    //分页
    $scope.pagination = {
        itemsCount: 11,//总条数
        take: 10,        //每页显示
        activatePage: activatePage
    };
    function activatePage(page) {
        var pages = {
            page:page
        };
        infoSer.listInfo(pages).then(function(response){
            if(response.data.code==0){
                $scope.infoLists = response.data.data;
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    }
    infoSer.countInfo().then(function(response){
        if(response.data.code==0){
            $scope.pagination.itemsCount=response.data.data
        }
    });
    $scope.selectList = function(event){
        angular.forEach($scope.infoLists,function(obj){
            obj._selectList = false
        });
        event._selectList = true;
        //向父Ctrl传递事件
        $scope.$emit('changeId', event.id);
    };

    $scope.$on("deletedId",function(event,id){
       angular.forEach($scope.infoLists,function(item){
            if(item.id==id){
                item._delete=true
            }
       })
    })
});


