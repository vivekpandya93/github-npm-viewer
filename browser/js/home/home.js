app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeController'
    });
});

var reg = new RegExp(/^[0-9\D]{0,140}\w+/, 'i');

function replaceEscapedCharacters(stringToReplace) {
    return stringToReplace.replace(/\r?\n/g, "").replace('```', '<code>').replace('```', '</code>')
}

var truncate = function(issues) {
    issues.forEach(function(issue) {
        issue.body = replaceEscapedCharacters(issue.body);

        if (issue.body.length < 140) {
            return;
        } else {
            issue.body = reg.exec(issue.body) + "...";
        }
    })
}
app.controller('homeController', function($scope, $http, IssueFactory, loader) {
    $scope.current = 1;
    $scope.bigTotalItems = 0;
    var QueryDetails = {
            PageNum: 2000,
            per_page: 10
        }

var lastPage = (function() {
    IssueFactory.getNumberOfIssues().then(function(data){
        $scope.numPages = data.numPages;
        $scope.bigTotalItems = data.TotalIssues;
    })
})()
    $scope.goToEvent = function(event) {
        var issueNum = event.target.innerText;
    }

    $scope.$watch('bigCurrentPage', function(newVal) {
        $scope.initialize(newVal)
    })
    $scope.initialize = function(pageNumber) {
        QueryDetails.PageNum = pageNumber;
        loader.show();
        IssueFactory.getAllIssues(QueryDetails).then(function(data) {

            $scope.data = data;
            loader.hide();

            truncate($scope.data);
        });
    }

    $scope.totalItems = 30;
    $scope.currentPage = 4;
    $scope.maxSize = 5;
    $scope.bigCurrentPage = 1;


});