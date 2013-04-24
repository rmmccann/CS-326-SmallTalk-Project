var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("db/db.sqlite");

exports.insertPost = function(user_id, text)
{
	db.run("INSERT INTO Posts values(NULL, $id, $content, DATETIME())", {$id: user_id, $content: text});
}

exports.getPosts = function(user, cb)
{
	db.all("SELECT P.*, U.username, U.email FROM Posts P, Users U, Follows F WHERE P.author_id=$uid AND U.id=P.author_id GROUP BY P.id", {$uid: user.id}, function(err, rows){
		cb(rows);
	});
}

exports.getFollowedPosts = function(user, cb)
{
	db.all("SELECT P.*, U.username, U.email FROM Posts P, Users U, Follows F WHERE (P.author_id=$uid OR (F.follower_id=$uid AND F.followed_id=author_id)) AND U.id=P.author_id GROUP BY P.id", {$uid: user.id}, function(err, rows){
		cb(rows);
	});
}

exports.getPostsByHashtag = function(hashtag, cb)
{
	var str = "%#"+hashtag+"%";
	db.all("SELECT P.*, U.username, U.email FROM Posts P, Users U WHERE P.author_id=U.id AND content LIKE ?", [str], function(err, rows){
		cb(rows);
	});
}

exports.getPostsByLanguage = function(language, cb)
{
	var str = "%\%"+language+"%";
	db.all("SELECT P.*, U.username, U.email FROM Posts P, Users U WHERE P.author_id=U.id AND content LIKE ?", [str], function(err, rows){
		cb(rows);
	});
}

exports.getPostsByKeyword = function(keyword, cb)
{
	var str = "%"+keyword+"%";
	db.all("SELECT P.*, U.username, U.email FROM Posts P, Users U WHERE P.author_id=U.id AND content LIKE ?", [str], function(err, rows){
		cb(rows);
	});
}
