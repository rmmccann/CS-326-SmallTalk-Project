var User = require("../db/User");
var Post = require("../db/Post");

exports.searchAll = function(req, res)
{
	var query = req.param("query");

	User.getUsers(query, function(users)
	{
		Post.getPostsByKeyword(query, function(posts)
		{
			var results = [];
			for(var i=0; i<users.length; i++)
			{
				var name = users[i].username;
				results["@"+name] = "/"+name+"/profile";
				//TODO add alt attribute here too
			}
			for(var i=0; i<posts.length; i++)
			{
				var keywords, hashes, langs = [];
				hashes = posts[i].content.match(/#\w+/) || [];
				langs = posts[i].content.match(/%\w+/) || [];
				keywords = hashes.concat(langs);
				if(keywords==null) keywords = [];
				for(var j=0; j<keywords.length; j++)
				{
					// if(keyword) console.log(keyword.length);
					var keyword = keywords[j];
					if(keyword.charAt(0) === "#"){
						results[keyword] = "/hashtag/"+keyword.substring(1,keyword.length);
					}
					else {
						results[keyword] = "/language/"+keyword.substring(1,keyword.length);
					}
				}
			}

			var json_resp = [];
			for(key in results)
			{
				json_resp.push({text:key, url:results[key]});
			}

			res.json(json_resp);
		});
	});
}

exports.searchUsers = function(req, res)
{
	var query = req.param("query");
	searchUsersHelper(query, function(results){
		res.json(results);
	});
}

var searchUsersHelper = function(searchText, cb)
{
	User.getUsers(searchText.substring(1,searchText.length), function(users)
	{
		var results = [];
		for(var i=0; i<users.length; i++)
		{
			var u = users[i];
			results.push(
				{
					text: "@"+u.username,
					url: "/"+u.username+"/profile",
					alt: u.firstname+" "+u.lastname
				});
		}
		cb(results);
	});
}
