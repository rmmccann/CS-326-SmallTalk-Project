var User = require('../db/User/');
var Post = require('../db/Post/');

exports.index = function(req, res)
{
	//check for cookie to see if user is logged in. If so, send them to the homepage instead of index (login) page.
	if(req.session.user == undefined){
		res.render('index', { title: "SmallTalk" });
	}else{
		Post.getPosts(req.session.user, function(posts){
			res.render('home', {title: "Welcome to SmallTalk", posts: posts});
		});
	}
};

//Display the Sign Up view
exports.signup = function(req, res)
{

	res.render('signup', {title: 'Sign Up'});
};

//Submits a new post by the user to the database
exports.submitNewPost = function(req, res)
{
	var regexp = /%\w+/; // regular expression to accept a % followed by the set [a-z ,A-Z ,0-9,_] at least one or more times
	var postmsg = req.param("postTextField");
	var liked = req.param("like");
	var desiredlangs = regexp.exec(postmsg); // takes in the the postmsg and returns an array of any string that fits the regular expression defined above

	// if(desiredlangs != null)
	// {
	// 	for(var counter = 0; counter < desiredlangs.length; counter++)
	// 	{
	// 		desiredlangs[counter].slice(1, desiredlangs[counter].length);
	// 		/*if(!Post.getLanguage(desiredlangs[counter]))
	// 		{
	// 			this will be for the nice dropdown box, async javascript
	// 		}*/
	// 	}
	// }


	Post.insertPost(req.session.user.id, postmsg);
	
	res.redirect("/");
};

//Creates a session for the user upon entering username and password
exports.signin = function(req, res)
{
	//find user in database, compare 'stored' password with input password
	User.getUser(req.param("username"), function(user)
	{
		if(user != undefined)
		{
			if(user.password == req.param("password"))
			{
				req.session.user = user;
			}else{
				req.flash('error', 'Username/Password do not match');
			}
		}
		res.redirect("/");
	});
}

//Ends the session for the user
exports.signout = function(req,res)
{
	delete req.session.user;
	req.flash('info', "You have Logged Out")
	res.redirect("/");
}

//Allows the user to follow/unfollow other users
exports.toggleFollow = function(req, res)
{
	var toggled_user = req.param("user");
	var action = req.param("action");	// either 'follow' or 'unfollow'

	User.getUser(toggled_user, function(other_user)
	{
		var current_user = req.session.user;

		if(action === "follow")
		{
			User.follow(current_user.id, other_user.id);
		}
		else
		{
			User.unfollow(current_user.id, other_user.id);
		}
	});
	res.send("Success");
}

exports.help = function( req, res)
{
	res.render('help');
}

exports.settings = function( req, res)
{
	res.render('settings');
}
exports.shorty = function( req, res)
{
	res.render('shorty');
}

//Validates fields and creates a user in the database
exports.createNewUser = function(req, res)
{
	var username = req.param("username");
	var firstname = req.param("firstname");
	var lastname = req.param("lastname");
	var email = req.param("email");
	var password = req.param("password");

	var user = {
		$username: username,
		$firstname: firstname,
		$lastname: lastname,
		$email: email,
		$password: password
	};

	//TODO: do this check client side instead.
	if(username!="" && password!="" && email!="") // check that required fields are not blank
	{
		User.getUser(username, function(existing_user)
		{
			if(existing_user != undefined) //username is already taken
			{
				req.flash('error', 'That Username already Exists');
				res.redirect("/signup");
			}
			else
			{
				User.addUser(user, function(){ //parameterless callback invoked when query is complete
					User.getUser(username, function(new_user){

						req.session.user = new_user;
						req.flash('success', 'Thank you for signing up with SmallTalk '+new_user.username);
						res.redirect("/"); //if signup is successful, send them to home
					});
				});
			}
		});
	}
	else
	{
		var error = "These fields must be filled out: ";
		if(username == ""){ error += " Username ";}
		if(password == ""){ error += " Password ";}
		if(email == ""){ error += " Email ";}
		req.flash('error', error );
		res.redirect("/signup");
	}
};
