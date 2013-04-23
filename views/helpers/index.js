exports.processPost = function(str)
{
	str = replaceHashTags(str);
	str = replaceLangTags(str);
	str = replaceAtTags(str);
	str = addLineBreaks(str);
	return str; 
};

function replaceHashTags(str)
{
	// matches can be an array (loop)
	var matches = str.match(/#\w+/);
	
	if(matches === null) matches = []; 
	
	for(var i = 0; i < matches.length; i++)
	{
		str = str.replace(matches[i], "<a href = '/hashtag/"+ matches[i].substring(1,matches[i].length) + "'>" + matches[0] + "</a>");
	}

	return str;
}
function replaceLangTags(str)
{
	var matches = str.match(/%\w+/);
	
	if(matches === null) matches = []; 
	
	for(var i = 0; i < matches.length; i++)
	{
		str = str.replace(matches[i], "<a href = '/language/"+ matches[i].substring(1,matches[i].length) + "'>" + matches[0] + "</a>");
	}

	return str;
}
function replaceAtTags(str)
{
	var matches = str.match(/@\w+/);
	
	if(matches === null) matches = []; 
	
	for(var i = 0; i < matches.length; i++)
	{
		str = str.replace(matches[i], "<a href = '/"+ matches[i].substring(1,matches[i].length) + "/profile'>" + matches[0] + "</a>");
	}

	return str;
}

function addLineBreaks(str)
{
	return str.replace(/\n/g, "<br>");
}
