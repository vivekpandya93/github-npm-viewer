'use strict';

var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var githubConfig = app.getValue('env').GITHUB;

    var githubCredentials = {
        clientID: githubConfig.clientID,
        clientSecret: githubConfig.clientSecret,
        callbackURL: githubConfig.callbackURL
    };

var updateUserCredentials = function (user, profile) {
            console.log("profile", profile)

        user.github.login = profile.username;
        user.github.avatar_url = profile._json.avatar_url;
                console.log("user", user)

            return user.save()

    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {

        UserModel.findOne({ 'github.id': profile.id }).exec()
            .then(function (user) {
                if (user) {
                   return updateUserCredentials(user, profile)
                                        console.log("user", user)

                    return user;
                } else {
                    return UserModel.create({
                        github: {
                            id: profile.id,
                            login: profile.login,
                            avatar_url: profile.avatar_url
                        }
                    });
                }

            }).then(function (userToLogin) {
                done(null, userToLogin);
            }, function (err) {
                console.error('Error creating user from github authentication', err);
                done(err);
            });

    };

    passport.use(new GithubStrategy(githubCredentials, verifyCallback));

    app.get('/auth/github', passport.authenticate('github'));

    app.get('/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/login' }),
        function (req, res) {
            console.log('here')
            res.redirect('/home');
        });

};
