var app = angular.module('infoServer',[]);
app.factory('infoSer',function ($http) {
    return {
        listInfo :listInfo,
        countInfo:countInfo,
        addInfo:addInfo,
        getInfo:getInfo,
        editInfo:editInfo,
        delInfo:delInfo
    };
    function listInfo(data){
        return $http.get('/listInfo',{params:data})
    }
    function countInfo() {
        return $http.get('/countInfo')
    }
    function addInfo(data){
        return $http.post('/addInfo',data)
    }
    function getInfo(data){
        return $http.get('/getInfo',{params:data})
    }
    function editInfo(data){
        return $http.post('/editInfo',data)
    }
    function delInfo(data){
        return $http.get('/delInfo',{params:data})
    }
});
