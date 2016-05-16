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



router.get('/allIssues', function (req, res){ 
  var options = {
   url: 'https://api.github.com/repos/npm/npm/issues?'+oauth+'&page='+req.query.PageNum+'&'+'per_page=10',
   headers: {
      'User-Agent': 'npm'
    }
  }

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.send(data);
    }
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
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      console.log("data", data)
      res.send(data);
    }
  }
  request(options, callback);
});



router.get('/getComments', function (req, res){ 

  var options = {
   url: 'https://api.github.com/repos/npm/npm/issues/'+req.query.issueNum+'/comments',
   headers: {
      'User-Agent': 'npm'
    }
  }

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      console.log("DATA FROM get comments:", data)
      res.send(data);
    }
  }
  request(options, callback);
});

