var app = angular.module('bankbillImport', ['toastr','ngFileUpload']);
app.controller('bankbillImportCtrl', function($scope,$state,toastr,bankbillSer,$http,Upload){
    bankbillSer.listAccount().then(function(response){
        if(response.data.code==0){
            $scope.accounts=response.data.data;
        }
    });

    $scope.updataSel =function(){
        var fd = new FormData();
        var file =document.getElementById('updata').files[0];
        fd.append('files', file);
        $http({
            method: 'POST',
            url: '/updateCheck',
            headers:{
                'Content-Type': undefined
            },
            data: fd,
            transformRequest: function (data, headersGetter){
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });
                return formData;
            }
        },function (data){
            console.info(data);

        });
    }

    $scope.upload= function(data,){
     var formData = new FormData();


    }


});




