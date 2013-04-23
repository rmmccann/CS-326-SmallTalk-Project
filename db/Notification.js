var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("db/db.sqlite");


exports.getNotifications = function(user, cb)
{
	db.all("SELECT * FROM Notifications WHERE user_id=$uid", {$uid: user.id}, function(err, rows){
		cb(rows);
	});
}

exports.deleteNotification = function(id)
{
	// db.run("DELETE FROM Follows WHERE follower_id=$id1 AND followed_id=$id2", {$id1: user1_id, $id2: user2_id});
	db.run("DELETE FROM Notifications WHERE id=$id", {$id: id});
}
