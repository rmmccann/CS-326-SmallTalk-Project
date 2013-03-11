//var User = require('../lib/tables').User;
var User = require('../lib/User/');
var Post = require('../lib/Post/');

/*
 * GET home page.
 */

exports.index = function(req, res)
{
	console.log(req.session.username);
	//check for cookie to see if user is logged in. If so, send them to the homepage instead of index (login) page.
	if(req.session.username == undefined){
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
	var regexp = /%\w+/; // regular expression to accept a % followed by the set [a-z ,A-Z ,0-9,_] at least one or more times
	var postmsg = req.param("postTextField");
	var liked = req.param("like");
	var desiredlangs = regexp.exec(postmsg); // takes in the the postmsg and returns an array of any string that fits the regular expression defined above

	var newPost = Post.NewPost; // creates a new post object to be populated

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
				req.session.username = user.username;
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
			req.session.username = username;
			res.redirect("/");
		}
	}
	else
	{
		res.redirect("/signup");
	}
};
