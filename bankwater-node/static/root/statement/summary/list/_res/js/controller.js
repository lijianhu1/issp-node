var app = angular.module('summaryList', ['ng-pagination','toastr']);
app.controller('summaryListCtrl',function($scope,summarySer,toastr){


     summarySer.listAccount().then(function(response){
         if(response.data.code==0){
             $scope.accounts=response.data.data;
             $scope.bank=$scope.accounts[1].id;

           /*  var bankId={id:$scope.bank};
             summarySer.bankSelf(bankId).then(function(response){
               if(response.data.code ==0){
                     $scope.infoLists2 = response.data.data;
                 }else{
                     toastr.error(response.data.msg, '温馨提示');
                 }
             });*/
            /* $scope.selectList2 = function(event){
                 angular.forEach($scope.infoLists2, function(obj){
                     obj._selectList2 = false
                 });
                 event._selectList2 = true;
                 //向父Ctrl传递事件
                 $scope.$emit('changeId', event.id);
             };*/
         }
     });
     $scope.bankSel=function(event){
     var bankId={id:event};
     summarySer.bankSelf(bankId).then(function(response){
         if(response.data.code ==0){
             $scope.infoLists2 = response.data.data;
         }else{
             toastr.error(response.data.msg, '温馨提示');
         }
     });
         $scope.selectList2 = function(event){
             angular.forEach($scope.infoLists2, function(obj){
                 obj._selectList2 = false
             });
             event._selectList2 = true;
             //向父Ctrl传递事件
             $scope.$emit('changeId', event.id);
         };
     };

     $scope.fn = function(yea,months,bank){
         if(yea, months, bank){
         var mavgs = {
             year : yea,
             month : months,
             accountName : bank,
         }
         summarySer.collectlistInfo(mavgs).then(function(response){
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
  /* $scope.selectinfo=function(event){
        if(event){
                console.log(event);
                var bankId={id:event,};

                summarySer.bankSelf(bankId).then(function(response){
                    if(response.data.code == 0){
                        $scope.infoLists2 = response.data.data;
                    } else {
                        toastr.error(response.data.msg, '温馨提示');
                    }
                });
            $scope.selectList2 = function(event){
                angular.forEach($scope.infoLists2, function(obj){
                    obj._selectList2 = false
                });
                event._selectList2 = true;
                //向父Ctrl传递事件
                $scope.$emit('changeId', event.id);
            };
        }
    }*/
    /*  $scope.weekSum = function(){
     var time={
     startDate:angular.element('.starttime').val(),
     endDate:angular.element('.endtime').val()
     };
     week(time)
     };
     function week(data){
     summarySer.listWeek(data).then(function(response){
     if(response.data.code==0){
     $scope.listWeeks = response.data.data;
     }else if(response.data.code==403||response.data.code==401){
     toastr.error("请登录用户,2秒后跳至登陆页面", '温馨提示');
     var absurl = $location.absUrl();
     ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes' });
     setTimeout(function(){
     window.location.href='http://localhost/login'
     },2000)
     }else{
     toastr.error( "请求超时，请联系管理员", '温馨提示');
     }
     });
     }
     week()*/

});


