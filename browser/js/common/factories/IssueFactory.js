app.factory('IssueFactory', function ($http) {
    var path = '/api/issues/';
    function extractData (serverResponse) {
        return serverResponse.data;
      }
    return {
        getAllIssues: function (QueryDetails) {
            return $http.get(path+'allIssues', {params: QueryDetails}).then(extractData);
        },
        getOneIssue: function(num) {
        	return $http.get(path+'singleIssue', {params: num}).then(extractData);
        },
        getOneComment: function(num) {
            return $http.get(path+'getComments', {params: num}).then(extractData);
        },
        getNumberOfIssues: function() {
        	return $http.get(path+'getNumber').then(extractData);
        }
    }
});
