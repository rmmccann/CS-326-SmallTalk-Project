//var User = require('../lib/tables').User;
var User = require('../lib/User/');
var Post = require('../lib/Post/');

/*
 * GET home page.
 */

exports.index = function(req, res)
{
	//check for cookie to see if user is logged in. If so, send them to the homepage instead of index (login) page.
	if(req.session.user == undefined){
		res.render('index', { title: 'SmallTalk', routes: app.routes.get });
	 }else{
		res.render('home', {title: "Welcome to SmallTalk"});
	 }
};

exports.signup = function(req, res)
{
	res.render('signup', {title: 'Sign Up'});
};


exports.submitNewPost = function(req, res)
{
	var regexp = /%\w+/;
	var postmsg = req.param("postTextField");
	var liked = req.param("like");
	var desiredlangs = regexp.exec(postmsg);
	//check if desired if not null.

	var newPost = Post.NewPost;

	if(desiredlangs != null)
	{
		for(var counter = 0; counter < desiredlangs.length; counter++)
		{
			desiredlangs[counter].slice(1, desiredlangs[counter].length);
			/*if(!Post.getLanguage(desiredlangs[counter]))
			{
				this will be for the nice dropdown box, async javascript
			}*/
		}
	}
	newPost.message = postmsg;
	newPost.user = req.session.username;
	newPost.language = desiredlangs;
	newPost.releationship = liked;

	Post.PostTable.push(newPost);

	res.redirect("/");

};

exports.signin = function(req, res)
{//find user in database, compare 'stored' password with input password
		user = User.getUser(req.param("username"));

		if(user != undefined){
			if(user.password == req.param("password")){
				req.session.user = user;
				res.redirect('home', {})
			}
		}

	res.redirect('/');
}

exports.signout = function(req,res)
{//find user in database, compare 'stored' password with input password
	req.session.username = undefined;
	console.log("Logging Out");
	res.redirect('/');
}

exports.toggleFollow = function(req, res){

	var toggled_user = req.param("toggle_follow_user");
	var current_user = req.session.user;

	var index = -1;

	if((index = (current_user.following.indexOf(toggled_user))) == -1){
		User.getUser(current_user.username).following.push(toggled_user)
	}else{
		User.getUser(current_user.username).following.splice(index,1)
	}

	req.session.user = User.getUser(current_user.username);

	console.log(req.session.user.following)
	res.redirect("/"+toggled_user+"/profile");
}

exports.createNewUser = function(req, res)
{
	//forEach(fucntion(objsinarray){objsinarray.getstuff})

	var username = req.param("username");
	var password = req.param("password");
	var email = req.param("email");
	var firstname = req.param("firstname");
	var lastname = req.param("lastname");

	var user = User.NewUser;
	user.username = username;
	user.password = password;
	user.email = email;
	user.firstname = firstname;//no validations 
	user.lastname = lastname;// for real names, just add to user object

	if(user.username != "" && user.password != "" && user.email != "")
	{	
		tabled_user = User.getUser(user.username);

		if(tabled_user != undefined){//username is already taken
			res.redirect("/signup"); //if signup is successful, send them to home(cookie required)
		}
		else
		{
			User.UserTable.push(user);
			req.session.user = user;
			res.redirect("/");
		}
	}
	else
	{
		res.redirect("/signup");
	}
};
