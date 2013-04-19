var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("db/db.sqlite");

exports.addUser = function(user_obj, cb)
{
	db.run("INSERT INTO Users VALUES(NULL,$username,$firstname,$lastname,$email,$password)", user_obj);
	cb();
};

exports.getUser = function(username, cb)
{
	if(!username) username = "";

	db.get("SELECT * FROM Users WHERE username=\""+username+"\"", function(err, row){
		if(err) console.log("DB ERROR: " + err);
		cb(row);
	});
};

exports.getFollowers = function(username, cb)
{
	db.all("SELECT A.* FROM Users A, Users B, Follows F WHERE F.follower_id=A.id AND F.followed_id=B.id AND B.username=\""+username+"\"", function(err, rows){ //TODO: cleaner query
		if(err) console.log("DB ERROR: " + err);
		cb(rows);
	});
};

exports.getFollowing = function(username, cb)
{
	db.all("SELECT B.* FROM Users A, Users B, Follows F WHERE F.follower_id=A.id AND F.followed_id=B.id AND A.username=\""+username+"\"", function(err, rows){
		if(err) console.log("DB ERROR: " + err);
		cb(rows);
	});
};

/*
make user1 follow user2
*/
exports.follow = function(user1_id, user2_id)
{
	db.run("INSERT INTO Follows VALUES($id1, $id2)", {$id1: user1_id, $id2: user2_id});
};

/*
make user1 unfollow user2
*/
exports.unfollow = function(user1_id, user2_id)
{
	db.run("DELETE FROM Follows WHERE follower_id=$id1 AND followed_id=$id2", {$id1: user1_id, $id2: user2_id});
};

exports.isFollowing = function(user1_id, user2_id, cb)
{
	db.get("SELECT * FROM Follows WHERE follower_id=$id1 AND followed_id=$id2", {$id1: user1_id, $id2: user2_id}, function(err, row){
		cb(row!==undefined);
	});
};

exports.getUsers = function(search_string, cb)
{
	var str = "%"+search_string+"%";
	/*
	'||' is concatenation in sqlite - may not work in postgres
	*/
	db.all("SELECT * FROM Users WHERE username LIKE $query OR (firstname || ' ' || lastname) LIKE $query", {$query: str}, function(err, rows){
		cb(rows);
	});
};
