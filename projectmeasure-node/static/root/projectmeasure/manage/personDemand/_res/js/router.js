var app = angular.module('personDemand', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.projectmeasure.manage.personDemand", {
        url : "/personDemand",
        views : {// projectmeasure  
            "content@root.projectmeasure.manage" : {
                templateUrl : "root/projectmeasure/manage/personDemand/_res/html/index.html",
                controller:"personDemandCtrl"
            },"menu@root.projectmeasure.manage" : {
                templateUrl : "root/projectmeasure/manage/personDemand/_res/html/menu.html",
                controller:"personDemandMenuCtrl"
            }
        }
    }).state("root.projectmeasure.manage.personDemand.add[12]",{
        url:"/add[12]",
        views:{
            "content@root.projectmeasure.manage.personDemand":{
                templateUrl : "root/projectmeasure/manage/personDemand/add/_res/html/index.html",
                controller:'personDemandAddCtrl'
            }
        }
    }).state("root.projectmeasure.manage.personDemand.edit[12]",{
        url:"/edit[12]?id=",
        views:{
            "content@root.projectmeasure.manage.personDemand":{
                templateUrl : "root/projectmeasure/manage/personDemand/edit/_res/html/index.html",
                controller:'companyEditCtrl'
            }
        }
    })
});