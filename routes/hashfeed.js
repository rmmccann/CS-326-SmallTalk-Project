//Will check for either # or % and bring the user to the correct hashfeed
exports.feed = function(req, res)
{	
	var hashtag = req.param("hashtag");
	if(hashtag == undefined){
		hashtag = "All"
	}
	res.render('hashfeed', { title: hashtag });
};
