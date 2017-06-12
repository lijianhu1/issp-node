var app = angular.module('summary', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.statement.summary", {
        url : "/summary",
        views : {
            "content@root.statement" : {
                templateUrl : "root/statement/summary/_res/html/index.html",
                controller:"summaryCtrl"
            },"menu@root.statement" : {
                templateUrl : "root/statement/summary/_res/html/menu.html",
                controller:"summaryMenuCtrl"
            }
        }
    }).state("root.statement.summary.analyse[12]", {
        url : "/analyse[12]",
        views : {
            "content@root.statement.summary" : {
                templateUrl : "root/statement/summary/analyse/_res/html/index.html",
                controller:"summaryAnalyCtrl"
            }
        }
    }).state("root.statement.summary.constrast[12]", {
        url : "/constrast[12]",
        views : {
            "content@root.statement.summary" : {
                templateUrl : "root/statement/summary/constrast/_res/html/index.html",
                controller:"summaryContrastCtrl"
            }
        }
    })
});