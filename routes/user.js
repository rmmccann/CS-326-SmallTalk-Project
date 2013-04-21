var User = require("../db/User");
var Post = require("../db/Post");

//Displays the profile view
exports.profile = function(req, res)
{
	User.getUser(req.param("user"), function(user)
	{
		Post.getPosts(user, function(posts)
		{
			var cur_usr = req.session.user || null;
			if(cur_usr)
			{
				User.isFollowing(cur_usr.id, user.id, function(is_following)
				{
					res.render('profile', {user: user , title: user.name+"'s Profile", posts: posts, is_following: is_following});
				});
			}
			else
			{
				res.render('profile', {user: user, title: user.name, posts: posts, is_following: null});
			}
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
