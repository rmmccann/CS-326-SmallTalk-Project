
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

	var name = req.query.username;
	var pass = req.query.password;

	if(name && pass)
	{
		console.log(name + " " + pass);
		// enter name into the database
	}

};