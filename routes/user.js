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


exports.edit = function(req, res)
{
	//find user in database to edit, if the found user is the current user
	User.getUser(req.param("user"), function(user)
	{
		if(user.name != 'N/A')
		{
			if(user.username == res.locals.current_user.username)
			{
				res.render('edit_user');
				return ;

			}else{
				req.flash('error', 'Editing other\'s accounts if forbidden');
				res.redirect("/");
			}

		}else{

			req.flash('error', 'User: '+ req.param("user") +' does not exist');
			res.redirect("/");
		}
	});

};

exports.update = function(req, res) // function for the post call to update user attributes
{
	console.log(JSON.stringify(req.param("newpassword")));

	var firstname = req.param("firstname");
	var lastname = req.param("lastname");

	var oldpassword = req.param("oldpassword");
	var newpassword = req.param("newpassword");
	var confirmpassword = req.param("confirmpassword");


	User.getUser(req.param(res.locals.current_user.username), function(user)
	{	
		if(firstname) user.firstname = firstname;
		if(lastname) user.lastname = lastname;

		if(oldpassword && newpassword && confirmpassword && (newpassword == confirmpassword ) && (oldpassword == user.password ))
		{
			user.password = newpassword;

		}else{
			req.flash('error', 'Password was not updated');
			res.redirect("/" +res.locals.current_user.username + "/edit");
		}

		//update user in DB here


		req.flash('success', 'Update was successful');
		res.redirect("/" +res.locals.current_user.username + "/edit");

	});


};

exports.delete = function(req, res)// to delete a users account if they want to
{	
	var user = req.param("user");
	var password = req.param("password");

	if(user && (user == res.locals.current_user.username) && (res.locals.current_user.password == password))
	{
		//delete the user from the DB, including all relations like posts and following/follower stuff



		delete req.session.user;	//deleted user account's can't be in the session


	}else if(res.locals.current_user.password != password){
		req.flash('error', 'Wrong Password');
		res.redirect("/settings");
	}

	req.flash('success', res.locals.current_user.username +	"'s Profile has been deleted");
	res.redirect("/");

};
