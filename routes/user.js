var User = require("../lib/User");

exports.profile = function(req, res)
{	var user = User.getUser(req.param("user"))
	res.render('profile', {User:user , title: user.username+"'s Profile"});
};

exports.followers = function(req, res)
{	var user = User.getUser(req.param("user"))
	res.render('followers', {User: user, title: user.username});
};

exports.following = function(req, res)
{	var user = User.getUser(req.param("user"))
	res.render('following', {User: user, title: user.username});
};
