/**
 * Main Javascript file included on every page. Used for global functions like search.
 */

$(document).ready(function()
{
	var results_box = $("#search-results");
	var search_box = $("#global-search-box");
	results_box.css("left", search_box.offset().left);
	// results_box.css("width", search_box.width()+30);

	var source = $("#results-template").html();
	var search_template = Handlebars.compile(source);

	$("#global-search-box").instantSearch(null, "/search", function(results){
		results_box.show();
		results_box.html("");

		// console.log(results);

		results_box.append(search_template({results: results}));

		if(results.length===0) results_box.append("No results found");
	});

	$("#global-search-box").blur(function(){
		setTimeout(function(){results_box.hide(200);}, 100); //hide after 300ms
	});


	$("#notification-button").tooltip(
		{
			placement: 'bottom',
			animation: false,
			title: '0'//if no title is defined in the html or is empty	
		}
	);
	$("#notification-button").popover(
		{
			placement: 'bottom',
			title: 'Notifications',
			trigger: 'click',
			content: '<a href="#">test</a>',
			html: true
		}
	);
});
