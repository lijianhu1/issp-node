var app = angular.module('companyEdit', ['toastr','ipCookie']);
app.controller('companyEditCtrl', function($scope, companycapSer,$state,toastr,$stateParams,ipCookie,$location){
    var companyId = {id : $stateParams.id};
    //获取值
    companycapSer.getOneById(companyId).then(function(response){
        if(response.data.code==0){
            $scope.editInfo = response.data.data;
        }else if (response.data.code == 403||response.data.code==401) {
            toastr.error( "请登录用户,3秒后跳至登陆页面", '温馨提示');
            var absurl = $location.absUrl();
            ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes',domain:'issp.bjike.com' })
            setTimeout(function(){
                window.location.href='http://localhost/login'
            },3000)
        }else if(response.data.code==1){
            toastr.error( response.data.msg, '温馨提示');
        }
    });
    $scope.companyEditFun = function(){
        var vm = $scope;
        var data = {
            id:vm.editInfo.id,
            company: vm.editInfo.company,
            professionAuthen: vm.editInfo.professionAuthen,
            manageAuthen: vm.editInfo.manageAuthen,
            companyCertificate: vm.editInfo.companyCertificate,
            companyDevelop: vm.editInfo.companyDevelop,
            projectDevelop: vm.editInfo.projectDevelop,
            area: vm.editInfo.area,
            money: vm.editInfo.money,
            personForm: vm.editInfo.personForm,
            config: vm.editInfo.config,
            device: vm.editInfo.device,
            companyArea: vm.editInfo.companyArea,
            companyBusiness: vm.editInfo.companyBusiness,
            cooperate: vm.editInfo.cooperate,
            completePro: vm.editInfo.completePro,
            inProjct: vm.editInfo.inProjct,
            culture: vm.editInfo.culture,
            holidayActive: vm.editInfo.holidayActive,
            bulletinBoard: vm.editInfo.bulletinBoard,
            createTime: vm.editInfo.createTime,
            modifyTime: vm.editInfo.modifyTime,
        };
        companycapSer.editCompanyAbility(data).then(function(response){
            if(response.data.code == 0){
                $state.go('root.ability.companycap.list');
                toastr.success( "已成功编辑", '温馨提示');
            }else if (response.data.code == 403||response.data.code==401) {
                toastr.error( "请登录用户,3秒后跳至登陆页面", '温馨提示');
                var absurl = $location.absUrl();
                ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes',domain:'issp.bjike.com' })
                setTimeout(function(){
                    window.location.href='http://localhost/login'
                },3000)
            }else if(response.data.code==1){
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    };
    //可手填的下拉框
    $scope.changeSelect=function(){$scope.editInfo.professionAuthen = $scope.editInfo.professionAuthen2;};
    $scope.changeSelect2=function(){$scope.editInfo.manageAuthen = $scope.editInfo.manageAuthen2;};
    $scope.changeSelect3=function(){$scope.editInfo.companyDevelop = $scope.editInfo.companyDevelop2;};
    $scope.changeSelect4=function(){$scope.editInfo.area = $scope.editInfo.area2;};
    $scope.changeSelect5=function(){$scope.editInfo.money = $scope.editInfo.money2;};
    $scope.changeSelect6=function(){$scope.editInfo.personForm = $scope.editInfo.personForm2;};
    $scope.changeSelect7=function(){$scope.editInfo.cooperate = $scope.editInfo.cooperate2;};
});