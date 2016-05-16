app.config(function ($stateProvider) {
    $stateProvider.state('login', {
        url: '/login/:num',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl',
        resolve: {
            one_issue: function($stateParams, IssueFactory) {
                var num = $stateParams.num;
                var issueNum = {
                    issueNum: num
                }
                return IssueFactory.getOneIssue(issueNum)
            }, 
            comments: function($stateParams, IssueFactory) {
            var num = $stateParams.num;
              var issueNum = {
                issueNum: num
            }
            return IssueFactory.getOneComment(issueNum)
    
            }
        }
    })
})

app.controller('LoginCtrl', function ($scope, $state, one_issue, $sce, $showdown, comments) {
    var markIt = function(comments) {
            comments.forEach(function(comment){
                comment.body = $showdown.makeHtml(comment.body)
                comment.body = $sce.trustAsHtml(comment.body)
            })
        }
 
    if(comments.length > 0) {
        $scope.comments = comments
        markIt($scope.comments)
    }
    $scope.data = one_issue;
    $scope.data.body = $showdown.makeHtml($scope.data.body)
    $scope.data.body = $sce.trustAsHtml($scope.data.body)
    $scope.state = $scope.data.state; 

    if($scope.data.labels.length) {
        $scope.labels = $scope.data.labels;
    }
    $scope.error = null;

});