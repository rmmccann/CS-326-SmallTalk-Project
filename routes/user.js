
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.profile = function(req, res)
{
	res.render('profile', {});
};

exports.followers = function(req, res)
{
	res.render('followers', {});
};

exports.following = function(req, res)
{
	res.render('following', {});
};
