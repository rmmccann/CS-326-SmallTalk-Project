
/*
 * GET home page.
 */

exports.index = function(req, res)
{
	res.render('index', { title: 'Express' });
};

exports.signup = function(req, res)
{
	res.render('signup', {title: 'Sign Up'});
};

exports.createNewUser = function(req, res)
{
	var name = req.param("username");
	var pass = req.param("password");
	
	if(name && pass)
	{
		console.log(name + " " + pass);
		// enter name into the database
	}
};