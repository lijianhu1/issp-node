var app = angular.module('discussList', ['ng-pagination','toastr','ipCookie']);
app.controller('discussListCtrl',function($scope,discussSer,toastr,$location,ipCookie){
    $scope.$emit('changeId', null);
    function activatePage(page) {
        var listData = {
            page:page
        }
        discussSer.discussList(listData).then(function(response){
            if(response.data.code==0){

                $scope.discussLists = response.data.data
            }else if(response.data.code==403||response.data.code==401){
                toastr.error( "请登录用户,2秒后跳至登陆页面", '温馨提示');
                var absurl = $location.absUrl();
                ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes',domain:'issp.bjike.com' });
                setTimeout(function(){
                    window.location.href='http://localhost/login'
                },2000)
            }else if(response.data.code==1){
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    }

    $scope.selectList = function(event){
        angular.forEach($scope.discussLists,function(obj){
                obj._selectList = false
        });
        event._selectList = true;
        $scope.idListd = event.id;
        //向父Ctrl传递事件
        $scope.$emit('changeId', $scope.idListd);

    };
    //点击更多详细
    $scope.moreList = function(event){
        angular.forEach($scope.discussLists,function(obj){
            if(event.id!==obj.id){
                obj._moreList = false
            }
        });
        event._moreList = !event._moreList;
    };

    $scope.$on('deletedId',function(event,delid){
        angular.forEach($scope.discussLists,function(obj){
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

    discussSer.countDiscuss().then(function(response){
        if(response.data.code==0){
            $scope.custom.itemsCount = response.data.data;
        }else if(response.data.code==403||response.data.code==401){
            toastr.error( "请登录用户,2秒后跳至登陆页面", '温馨提示');
            var absurl = $location.absUrl();
            ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes',domain:'issp.bjike.com' });
            setTimeout(function(){
                window.location.href='http://localhost/login'
            },2000)
        }else if(response.data.code==1){
            toastr.error( response.data.msg, '温馨提示');
        }
    })

});

