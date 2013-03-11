var User = require("../lib/User");

//Displays the profile view
exports.profile = function(req, res)
{	var user = User.getUser(req.param("user"))
	res.render('profile', {User:user , title: user.username+"'s Profile"});
};

//Displays the followers of the current user
exports.followers = function(req, res)
{	var user = User.getUser(req.param("user"))
	res.render('followers', {User: user, title: user.username});
};

//Displays the people the current user is following
exports.following = function(req, res)
{	var user = User.getUser(req.param("user"))
	res.render('following', {User: user, title: user.username});
};
