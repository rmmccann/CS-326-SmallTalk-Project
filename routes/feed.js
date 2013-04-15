var Post = require("../db/Post");


exports.hashtag = function(req, res)
{
	var tag = req.param("hashtag");

	Post.getPostsByHashtag(tag, function(posts){
		res.render("hashtag", {title: "#"+tag, posts: (posts || [])});
	});
}

exports.language = function(req, res)
{
	var lang = req.param("language");

	Post.getPostsByLanguage(lang, function(posts){
		res.render("hashtag", {title: "%"+lang, posts: (posts || [])});
	});
}
