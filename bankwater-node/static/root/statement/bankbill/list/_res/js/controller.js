var app = angular.module('bankbillList', ['ng-pagination','toastr','ipCookie']);
app.controller('bankbillListCtrl',function($scope,bankbillSer,toastr,ipCookie,$location){

    var pages2 = {
        page:1
    };
    bankbillSer.listInfo(pages2).then(function(response){
        /*console.log(response);*/
        if(response.data.code==0){
            $scope.bankbillLists2 = response.data.data;
        }
    });

 /*   $scope.bankSel=function(){
        var bankId={id:$scope.bank};
        bankbillSer.bankSelf(bankId).then(function(response){
            console.info(response);
        })
    };*/
     //分页
    $scope.pagination = {
        itemsCount: 11, //总条数
        take: 10,        //每页显示
        activatePage: activatePage
    };
   function activatePage(page) {
      /*console.log($scope.a);*/
    }

    if($scope.a){
    }
    $scope.fn = function(val){
        if(val){
            var pages={
                page:1,
                accountId:val
            };

            bankbillSer.listBankbill(pages).then(function(response){
                if(response.data.code==0){
                    $scope.bankbillLists = response.data.data;
                }else{
                    toastr.error( response.data.msg, '温馨提示');
                }
            });
            var accont ={ accountId:$scope.bank};
            bankbillSer.bankcountInfo(accont).then(function(response){
                if(response.data.code==0){
                    $scope.pagination.itemsCount=response.data.data
                }
            });
            $scope.selectList = function(event){
                angular.forEach($scope.bankbillLists,function(obj){
                    obj._selectList = false
                });
                event._selectList = true;
                //向父Ctrl传递事件
                $scope.$emit('changeId', event.id);
            };
        }
    }

     $scope.$on("deletedId",function(event,id){
        angular.forEach($scope.bankbillLists,function(item){
             if(item.id==id){
                 item._delete=true
             }
        })
     })

});


