//Who am I chatting with!?
exports.index = function(req, res)
{
	var who = req.query["with"];
	res.render("chat", {who: who});
};
