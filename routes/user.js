var profile_data = require("../lib/profile");

exports.profile = function(req, res)
{
	res.render('profile', {title: profile_data.username, name: profile_data.username});
};

exports.followers = function(req, res)
{
	res.render('followers', {name: profile_data.username, followers: profile_data.followers});
};

exports.following = function(req, res)
{
	res.render('following', {name: profile_data.username, following: profile_data.following});
};