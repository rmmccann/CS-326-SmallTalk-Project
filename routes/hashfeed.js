var Post = require("../lib/Post");
/*
 * GET hash feed.
 */

exports.feed = function(req, res)
{	
	var language = req.param("language");
	language.toLowerCase();


	if(hashtag == undefined){
		hashtag = "All"
	}
	res.render('hashfeed', { title: hashtag });
};
