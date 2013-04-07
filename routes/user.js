var User = require("../db/User");

//Displays the profile view
exports.profile = function(req, res)
{
	User.getUser(req.param("user"), function(user)
	{
		User.isFollowing(req.session.user.id, user.id, function(is_following)
		{
			res.render('profile', {user: user , title: user.username+"'s Profile", is_following: is_following});
		});
	});
};

//Displays the followers of the current user
exports.followers = function(req, res)
{
	User.getUser(req.param("user"), function(user)
	{
		User.getFollowers(req.param("user"), function(followers)
		{
			res.render('followers', {user: user, title: user.username, followers: followers});
		});
	});
};

//Displays the people the current user is following
exports.following = function(req, res)
{
	User.getUser(req.param("user"), function(user)
	{
		User.getFollowing(req.param("user"), function(following)
		{
			res.render('following', {user: user, title: user.username, following: following});
		});
	});
};
