var Router = require('koa-router');
var fs = require('fs');
var path = require('path');
var sendfile = require('koa-sendfile');
var server = require(path.resolve('koa/servers/' + path.basename(path.resolve(__filename, '../')) + '/index.js'));
var config = require(path.resolve('plugins/read-config.js'));
var fetch = require('node-fetch');//url转发
var formData = require('form-data');
var parse = require('co-busboy');
var bodyParse =require('koa-better-body');
var koaBody = require('koa-body');
var request = require('request-promise');
module.exports = function(){
    var router = new Router();

    router.get('/listInfo', function*(){
        var $self = this;
        var page = $self.request.query;
        page.token=$self.cookies.get("token");
        yield (server().listInfo(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
                console.error(error.error);
            }));
    }).get('/countInfo', function*(){
        var $self = this;
        yield (server().countInfo()
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
                console.error(error.error);
            }));
    }).get('/collectlistInfo', function*(){//汇总列表信息查询analyselistInfo
        var $self = this;
        var page = $self.request.query;
        page.token=$self.cookies.get("token");
        yield (server().collectlistInfo(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
                console.error(error.error);
            }));
    }).get('/analyselistInfo', function*(){//分析列表信息查询
        var $self = this;
        var page = $self.request.query;
        page.token=$self.cookies.get("token");
        yield (server().analyselistInfo(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
                console.error(error.error);
            }));
    }).get('/constrastlistInfo', function*(){//对比列表信息查询
        var $self = this;
        var page = $self.request.query;
        page.token=$self.cookies.get("token");
        yield (server().constrastlistInfo(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
                console.error(error.error);
            }));
    }).post('/addInfo', function*(){
        var $self = this;
        var addData = $self.request.body;
        addData.token = $self.cookies.get('token');
        yield (server().addInfo(addData)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
                console.error(error.error);
            }));
    }).get('/getInfo', function*(){
        var $self = this;
        var getId = $self.request.query;
        getId.token = $self.cookies.get('token');
        yield (server().getInfo(getId)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
                console.error(error.error);
            }));
    }).post('/editInfo', function*(){
        var $self = this;
        var editData = $self.request.body;
        editData.token = $self.cookies.get('token');
        yield (server().editData(editData)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
                console.error(error.error);
            }));
    }).get('/delInfo', function*(){
        var $self = this;
        var delId = $self.request.query;
        delId.token = $self.cookies.get("token");
        yield (server().delInfo(delId)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
                console.error(error.error);
            }));
    }).get('/listaccount', function*(){
        var $self = this;
        yield (server().listaccount()
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
                console.error(error.error);
            }));
    }).get('/bankself', function*(){
        var $self = this;
        var bankself = $self.request.query;
        bankself.token = $self.cookies.get("token");
        yield (server().bankself(bankself)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
                console.error(error.error);
            }));
    }).post('/updateCheck', koaBody({multipart:true}),function *(next) {
        var $self = this;
        var file = this.request.body.files.files;
        var files = [];
        if(file instanceof Array){
            for(var i =0;i<file.length;i++){
                var f = file[i];
                var oo = {
                    value:fs.createReadStream(f.path),
                    options: {
                        filename: f.name
                    }
                };
                files.push(oo);
            }
        }else{
            var oo = {
                value:fs.createReadStream(file.path),
                options: {
                    filename: file.name
                }
            };
            files.push(oo);
        }
        var options = {
            url: config()['rurl']+'/bankrecord/v1/check',
            method: 'POST',
            formData: {
                files: files
            }
        };
        yield (request(options).then(function (body) {
            console.info(body);
            $self.body = body;
        }));
    }).get('/bankcountInfo', function*(){   //银行流水总条数
        var $self = this;
        yield (server().collectCount()
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
                console.error(error.error);
            }));
    }).get('/listBankbill', function*(){
        var $self = this;
        var page = $self.request.query;
        page.token=$self.cookies.get("token");
        yield (server().listBankbill(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
                console.error(error.error);
            }));
    }).get('/delBankbill', function*(){
        var $self = this;
        var delId = $self.request.query;
        delId.token = $self.cookies.get("token");
        yield (server().delBankbill(delId)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type', 'application/json;charset=utf-8');
                $self.body = error.error;
                console.error(error.error);
            }));
    });
    return router;
};

