var Post = require("../db/Post");

//This is for normal hashtags, like Twitter uses
exports.hashtag = function(req, res)
{
	var tag = req.param("hashtag");

	Post.getPostsByHashtag(tag, function(posts){
		res.render("hashtag", {title: "#"+tag, posts: (posts || [])});
	});
}
//This is for our new language tag. Specific for programming languages
exports.language = function(req, res)
{
	var lang = req.param("language");

	Post.getPostsByLanguage(lang, function(posts){
		res.render("hashtag", {title: "%"+lang, posts: (posts || [])});
	});
}
