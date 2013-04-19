/**
 * jQuery Instant Search plugin by Ryan McCann
 */

(function($){

	$.fn.instantSearch = function(search_list, jsonUrl, cb)
	{
		// this.keyup(checkMatch);
		// this.keydown(checkMatch);
		this.keypress(checkMatch);
		this.focus(checkMatch);
		function checkMatch(event)
		{			
			var searchText = $(this).val().trim().toLowerCase();
			console.log(searchText);
			if(event.which===8) //backspace
			{
				searchText = searchText.substring(0, searchText.length-1);
			}
			else
			{
				searchText = searchText + String.fromCharCode(event.which).trim();
			}
			console.log(searchText);

			//TODO implement trigger characters
			if(searchText.charAt(0) === "@")
			{
				$.ajax({url: "/search/users", type: "post", data:{query: searchText}}).done(function(data)
				{
					console.log("data: " + data);
					cb(data);
				});
			}
			else
			{
				$.ajax({url: jsonUrl, type: "post", data:{query: searchText}}).done(function(data)
				{
					cb(data);
				});
			}

			// var matches = checkArray(searchText);
			// cb(matches); // pass results array to callback
		}

		function checkArray(str) //returns array of matching indices
		{
			var ret = [];
			for(var i=0; i<search_list.length; i++)
			{
				if(search_list[i].substr(0, str.length).toLowerCase() === str.toLowerCase()) //this element begins with str
				{
					ret.push(search_list[i]);
				}
			}
			return ret;
		}

	}

	/*
		TODO:
		trigger: What keystroke/sequence will cause a search. If it is an empty string, "", or none set, any keystroke will trigger a search
		prefetch: default data to use. e.g., url to list of the user's followers/following - not too big, already known, most likely desired over non-followers
	*/

})(jQuery);
