var Notification = require('../db/Notification');

exports.remove = function(req, res)
{
	var id = req.param("id");
	console.log("Notification ID: " + id);
	Notification.deleteNotification(id);
}