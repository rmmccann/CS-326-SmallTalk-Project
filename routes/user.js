
/*
 * GET users listing.
 */

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