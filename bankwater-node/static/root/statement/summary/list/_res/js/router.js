var app = angular.module('summaryList', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.statement.summary.list", {
        url : "/list",
        views : {
            "content@root.statement.summary" : {
                templateUrl : "root/statement/summary/list/_res/html/index.html",
                controller:"summaryListCtrl"
            }
        }
    })
});