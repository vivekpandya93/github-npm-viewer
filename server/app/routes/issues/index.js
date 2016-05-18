'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var http = require('https'); 
var request = require('request')
var env = require('../../../env/')
var gitCliendID = env.GITHUB.clientID;
var clientSecret = env.GITHUB.clientSecret;
var oauth ='client_id='+gitCliendID+'&'+'client_secret='+clientSecret; 


router.get('/getNumber', function(req, res){

    var bigTotalItems;
    var totalPages;
    var responseObject = {};
    var options = {
       url: 'https://api.github.com/repos/npm/npm?'+oauth,
      headers: {
      'User-Agent': 'npm'
      }
   }
  function callback(error, response, body) {
    // if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      console.log("data", data)
      bigTotalItems = data.open_issues_count
      totalPages = Math.ceil(bigTotalItems/30);
      responseObject = {
        numPages: totalPages,
        TotalIssues: bigTotalItems
      }
      console.log("numPages", responseObject)
      res.send(responseObject);
    // }
  }
  request(options, callback);
});

router.get('/allIssues', function (req, res){ 
  var options = {
   url: 'https://api.github.com/repos/npm/npm/issues?'+oauth+'&page='+req.query.PageNum+'&'+'per_page=10',
   headers: {
      'User-Agent': 'npm'
    }
  }

  function callback(error, response, body) {
    // if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.send(data);
    // }
  }
  request(options, callback);
});


router.get('/singleIssue', function (req, res){ 
  console.log("here")
  console.log("req.query in singleIssue", req.query)
  var options = {
   url: 'https://api.github.com/repos/npm/npm/issues/'+req.query.issueNum+'?'+oauth,
   headers: {
      'User-Agent': 'npm'
    }
  }

  function callback(error, response, body) {
    // if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      console.log("data", data)
      res.send(data);
    // }
  }
  request(options, callback);
});



router.get('/getComments', function (req, res){ 

  var options = {
   url: 'https://api.github.com/repos/npm/npm/issues/'+req.query.issueNum+'/comments'+'?'+oauth,
   headers: {
      'User-Agent': 'npm'
    }
  }

  function callback(error, response, body) {
    // if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      console.log("DATA FROM get comments:", data)
      res.send(data);
    // }
  }
  request(options, callback);
});


        // var listedComments = "https://api.github.com/repos/npm/npm/issues/"+num+"/"+"comments";
            //      return $http.get(listedComments).success(function(data){
            //         return data;
            //   })