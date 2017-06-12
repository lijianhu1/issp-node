var app = angular.module('bankbillServer',[]);
app.factory('bankbillSer',function ($http) {
    return {
        listAccount : listAccount,
        bankSelf:bankSelf,
        bankcountInfo:bankcountInfo,
        // updateCheck:updateCheck
        listBankbill:listBankbill,
        listInfo:listInfo,
        delBankbill:delBankbill,
    };
    function listAccount() {
        return $http.get('/listaccount')
    }
    function bankSelf(data) {
        return $http.get('/bankself',{params:data})
    }
    // function updateCheck(data) {
    //     return $http.post('/updateCheck',data)
    // }
    function bankcountInfo(){
        return $http .get('/bankcountInfo')
    }
    function listInfo(data){
        return $http .get('/listInfo',{params:data})
    }
    function listBankbill(data){
        return $http.get('/listBankbill',{params:data})
    }
    function delBankbill(data){
        return $http.get('/delBankbill',{params:data})
    }

});
