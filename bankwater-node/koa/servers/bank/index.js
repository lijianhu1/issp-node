var request = require('request-promise');
var path = require('path');
var config = require(path.resolve('plugins/read-config.js'));
var form = require(path.resolve('plugins/form.js'));
var urlEncode = require(path.resolve('plugins/urlEncode.js'));
module.exports = function(){
    this.listInfo = function(argvs){
        var options = {
            method :'GET',
            timeout : 3000,
            uri : config()['rurl'] +`/bankaccountinfo/v1/list?limit=10&page=${argvs.page}`,
            headers:{
                usertoken:argvs.token
            },
        };
        return request(options);
    };
    this.countInfo = function(){
        var options = {
            method : 'GET',
            timeout : 3000,
            uri : config()['rurl'] +'/bankaccountinfo/v1/count',
        };
        return request(options);
    };
    this.collectlistInfo = function(argvs){//汇总
         console.log(argvs);
         var options = {
             method :'GET',
             timeout : 3000,/*bankrecord/v1/analyze   collect*/
             uri : config()['rurl'] +`/bankrecord/v1/collect?year=${argvs.year}&month=${argvs.month}&accountName=${argvs.accountName}`,
             headers:{
                 usertoken:argvs.token
             },
         };
         return request(options);
     };

    this.analyselistInfo = function(argvs){//分析
        console.log(argvs);
        var options = {
            method :'GET',
            timeout : 3000,
            uri : config()['rurl'] +`/bankrecord/v1/analyze?year=${argvs.year}&month=${argvs.month}&accountName=${argvs.accountName}`,
            headers:{
                usertoken:argvs.token
            },
        };
        return request(options);
    };

    this.constrastlistInfo = function(argvs){//对比
        console.log(argvs);
        var options = {
            method :'GET',
            timeout : 3000,
            uri : config()['rurl'] +`/bankrecord/v1/compare?year=${argvs.year}&month=${argvs.month}`,
            headers:{
                usertoken:argvs.token
            },
        };
        return request(options);
    };
    this.addInfo = function(argvs){
        var options = {
            method : 'POST',
            timeout : 3000,
            uri : config()['rurl'] +'/bankaccountinfo/v1/add',
            headers:{
                usertoken:argvs.token
            },
            form:argvs
        };
        return request(options);
    };
    this.getInfo = function(argvs){
        var options = {
            method : 'GET',
            timeout : 3000,
            uri : config()['rurl'] +`/bankaccountinfo/v1/find/${argvs.id}`,
            headers:{
                usertoken:argvs.token
            },
        };
        return request(options);
    };
    this.editData = function(argvs){
        var options = {
            method : 'PUT',
            timeout: 3000,
            uri :config()['rurl'] +'/bankaccountinfo/v1/edit',
            headers:{
                usertoken:argvs.token
            },
            form:argvs
        };
        return request(options);
    };
    this.delInfo = function(argvs){
        var options = {
            method : 'DELETE',
            timeout: 3000,
            uri : config()['rurl'] +`/bankaccountinfo/v1/delete/${argvs.id}`,
            headers:{
                usertoken:argvs.token
            },
        };
        return request(options);
    };
    this.listaccount = function(){
        var options = {
            method : 'GET',
            timeout: 3000,
            uri : config()['rurl'] +'/bankrecord/v1/accounts?_includes=id,name',
        };
        return request(options);
    };
    this.bankself = function(argvs){
        var options = {
            method : 'GET',
            timeout: 3000,
            uri : config()['rurl'] +`/bankrecord/v1/find/${argvs.id}`,
        };
        return request(options);
    };
    this.collectCount=function(){
        var options = {
            method : 'GET',
            timeout : 3000,
            uri : config()['rurl'] +`/bankrecord/v1/count`,
        };
        return request(options);
    };
    this.listBankbill = function(argvs){

        var options = {
            method :'GET',
            timeout : 3000,
            uri : config()['rurl'] +`/bankrecord/v1/list?limit=10&page=${argvs.page}&accountId=${argvs.accountId}`,
            headers:{
                usertoken:argvs.token
            },
        };
        return request(options);
    };
    this.delBankbill = function(argvs){
        var options = {
            method : 'DELETE',
            timeout: 3000,
            uri : config()['rurl'] +`/bankrecord/v1/delete/${argvs.id}`,
            headers:{
                usertoken:argvs.token
            },
        };
        return request(options);
    };
    return this;

};