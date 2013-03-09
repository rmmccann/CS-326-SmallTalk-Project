//var User = require('../lib/tables').User;
var Users = require('../lib/User/').Users;

/*
 * GET home page.
 */

exports.index = function(req, res)
{
	//check for cookie to see if user is logged in. If so, send them to the homepage instead of index (login) page.
	// if(/*cookie*/){
		res.render('index', { title: 'Express', routes: app.routes.get });
	// }else{
	//	res.render('home', {});
	// }
};

exports.signup = function(req, res)
{
	res.render('signup', {title: 'Sign Up'});
};


 exports.signin = function(req,res)
{//find user in database, compare 'stored' password with input password

	//var user = User.find(req.params.username)
	//if(user.password == req.params.password)
	//{
	//	res.redirect('home', {user: user})
	//}
	res.redirect('/');
}

exports.createNewUser = function(req, res)
{
	//forEach(fucntion(objsinarray){objsinarray.getstuff})

	var username = req.param("username");
	var pass = req.param("password");
	var email = req.param("email");
	var firstname = req.param("firstname");
	var lastname = req.param("lastname");



	if(username && pass && email)
	{
		var user = {
			username: "",
			password: "",
			email: "",
			firstname: "",
			lastname: "",
			followers: [],
			following: []
		}
		// enter name into the database
		

		if(firstname)
		{
			user.firstname = firstname;
		}
		if(lastname)
		{
			user.lastname = lastname;
		}

		res.redirect("/"); //if signup is successful, send them to home(cookie required)
	}
	else if(username = "" || pass = "" || email = "")
	{
		//return error (enter a valid username, pass, and email)
		res.redirect("/");
	}
	else
	{
		//return error (enter a valid username, pass, and email)
		res.redirect("/");
	}

	res.redirect("/signup");
};
