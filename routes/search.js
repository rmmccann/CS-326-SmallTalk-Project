var User = require("../db/User");
var Post = require("../db/Post");


exports.searchAll = function(req, res)
{
	var query = req.param("query");

	User.getUsers(query, function(users)
	{
		Post.getPostsByKeyword(query, function(posts)
		{
			// var results = [];
			// for(var i=0; i<users.length; i++)
			// {
			// 	var name = users[i].username;
			// 	results.push({text:"@"+name, url:"/"+name+"/profile"});
			// }
			// for(var i=0; i<posts.length; i++)
			// {
			// 	var keywords = [];
			// 	keywords = posts[i].content.match(/(#|%)\w+/);
			// 	if(keywords==null) keywords = [];
			// 	for(var j=0; j<keywords.length; j++)
			// 	{
			// 		// if(keyword) console.log(keyword.length);

			// 		var element = {text:keywords[j], url:"/hashtag/"+keywords[j].substring(1,keywords[j].length)};
			// 		if(results.indexOf(element) === -1)
			// 		{
			// 			results.push(element);
			// 		}
			// 	}
			// }

			var results = [];
			for(var i=0; i<users.length; i++)
			{
				var name = users[i].username;
				results["@"+name] = "/"+name+"/profile";
			}
			for(var i=0; i<posts.length; i++)
			{
				var keywords = [];
				keywords = posts[i].content.match(/(#|%)\w+/);
				if(keywords==null) keywords = [];
				for(var j=0; j<keywords.length; j++)
				{
					// if(keyword) console.log(keyword.length);
					var keyword = keywords[j];
					results[keyword] = "/hashtag/"+keyword.substring(1,keyword.length);
				}
			}

			console.log(results);

			var json_resp = [];
			for(key in results)
			{
				json_resp.push({text:key, url:results[key]});
			}

			res.json(json_resp);
		});
	});
}
