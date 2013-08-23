/**
 * Main Javascript file included on every page. Used for global functions like search.
 */

$(document).ready(function()
{
	var results_box = $("#search-results");
	var search_box = $("#global-search-box");
	results_box.css("left", search_box.offset().left);
	// results_box.css("width", search_box.width()+30);
	// results_box.css("width", 265);

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

	$("#clear-button").click(function(){
		$("#global-search-box").val("");
	});

/**
 * Notifications stuff
 */
	$("#notification-button").tooltip(
		{
			placement: 'left',
			animation: false,
			title: numNotifications()
		}
	);
	$("#notification-button").popover(
		{
			placement: 'bottom',
			trigger: 'click',
			html: true,
			title: getNotificationTitle(),
			content: getNotificationText()
		}
	);
	function getNotificationTitle()
	{
		var dismiss = "<button id='dismiss-all' type='button' class='close dismiss-notification'>&times;</button>";
		dismiss = "";
		return "<strong>"+numNotifications()+" Notification(s)"+"</strong>" + dismiss;
	}
	function dismissMe()
	{
		alert("asldf");
	}
	function getNotificationText()
	{
		var out = "";
		var open_dismiss = "<button type='button' class='close dismiss-notification' data-id='";
		var close_dismiss = "'>&times;</button>";
		notifications.forEach(function(notif){
			out += ("<span>"+notif.message + open_dismiss+notif.id+close_dismiss + "<hr></span>");
		});
		return out;
	}
	function numNotifications()
	{
		return notifications.length || 0;
	}
	$("#notification-button").click(function(){
		$(this).removeClass("btn-danger");
		$(".tooltip").hide();
		$("head > title").html($("head > title").html().replace(/\(\d\)/, ""));
		$(".dismiss-notification").click(function(){
			var $id = $(this).attr("data-id");
			$.ajax({url:"/dismiss_notification", type: "post", data: "id="+$id});
			console.log($id);
			$(this).parent().hide();
			//TODO remove from notifications array
			for(var i=0; i<notifications.length; i++){
				if(notifications[i].id === $id){
					// notifications.splice(i,1);
					delete notifications[i];
				}
			}
		});
	});
	$("#notification-button").blur(function(){
		$(".popover").hide();
	});
	if(numNotifications()>0) $("head > title").html("("+numNotifications()+") "+$("head > title").html());
	
	//Debugging Stuff
	var debug = true;
	$(window).resize(function(e){
		if(debug){
			console.log("X:"+$(this).width()+" Y:"+$(this).height());
		}
	});
});
