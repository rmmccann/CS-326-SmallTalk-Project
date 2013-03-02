var profile_data = require("../lib/profile");

exports.profile = function(req, res)
{
	res.render('profile', {name: profile_data.username});
};

exports.followers = function(req, res)
{
	res.render('followers', {});
};

exports.following = function(req, res)
{
	res.render('following', {});
};