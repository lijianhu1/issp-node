var app = angular.module('summaryServer',[]);
app.factory('summarySer',function ($http) {
    return {
        bankSelf:bankSelf,
        listAccount:listAccount,
        collectlistInfo:collectlistInfo,
        analyselistInfo:analyselistInfo,
        constrastlistInfo:constrastlistInfo,
    };

    function bankSelf(data) {
        return $http.get('/bankself',{params:data})
    }
    function listAccount() {
        return $http.get('/listaccount')
    }

    function collectlistInfo(data){
        return $http.get('/collectlistInfo',{params:data})
    }
    function analyselistInfo(data){
        return $http.get('/analyselistInfo',{params:data})
    }
    function constrastlistInfo(data){
        return $http.get('/constrastlistInfo',{params:data})
    }
});