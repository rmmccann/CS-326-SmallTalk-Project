var User = require("../lib/User");

exports.profile = function(req, res)
{	var user = User.getUser(req.param("user"))
	res.render('profile', {User:user , title: user.username+"'s Profile"});
};

exports.followers = function(req, res)
{
	res.render('followers', {User:User.getUser(res.locals.current_user), title: res.locals.current_user});
};

exports.following = function(req, res)
{
	res.render('following', {User:User.getUser(res.locals.current_user), title: res.locals.current_user});
};
