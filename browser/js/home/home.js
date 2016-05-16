
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
app.controller('homeController', function($scope, $http, IssueFactory) {
    $scope.current = 1;
    $scope.bigTotalItems = 0;
    var QueryDetails = {
            PageNum: 2000,
            per_page: 10
        }

var lastPage = (function() {
    $http.get('https://api.github.com/repos/npm/npm').success(function(data) {
        $scope.bigTotalItems = data.open_issues_count
        $scope.numPages = Math.ceil($scope.bigTotalItems / 30);
        console.log("bigTotalItems", $scope.bigTotalItems)
    })
})()
    $scope.goToEvent = function(event) {
        var issueNum = event.target.innerText;
        console.log("issueNum", issueNum)
    }

    $scope.$watch('bigCurrentPage', function(newVal) {
        $scope.initialize(newVal)
    })
    $scope.initialize = function(pageNumber) {
        QueryDetails.PageNum = pageNumber;
        IssueFactory.getAllIssues(QueryDetails).then(function(data) {
            $scope.data = data;
            truncate($scope.data);
        });
    }




    $scope.totalItems = 30;
    $scope.currentPage = 4;

    // $scope.setPage = function (pageNo) {
    //   $scope.currentPage = pageNo;
    // };

    // $scope.pageChanged = function() {
    //   $log.log('Page changed to: ' + $scope.currentPage);
    // };

    $scope.maxSize = 5;
    $scope.bigCurrentPage = 1;


    // $scope.paginate = function(currentPage, type) {
    // if(currentPage <=3 && type === 'previous') {
    // return; 
    // } 
    // else if(type === 'previous') {
    // $scope.current = $scope.current - 3
    // }
    // else if (currentPage > $scope.number_of_issues - 3  && type === 'next') {
    // return;
    // }
    // else if(type === 'next'){
    // $scope.current = $scope.current + 3
    // }
    // }

});