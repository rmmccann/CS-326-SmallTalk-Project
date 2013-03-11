var Post = require("../lib/Post");

//Will check for either # or % and bring the user to the correct hashfeed
exports.feed = function(req, res)
{	
	var language = req.param("language");
	language.toLowerCase();


	if(hashtag == undefined){
		hashtag = "All"
	}
	res.render('hashfeed', { title: hashtag });
};
