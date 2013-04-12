

$(document).ready(function()
{
	$("#toggle_follow").click(function(event)
	{
		var name = $(this).attr("name");
		var newName = (name === "toggle_follow") ? "toggle_unfollow" : "toggle_follow";
		var newButtonName = (name === "toggle_follow") ? "Unfollow" : "Follow";
		var queryString = name + "&toggle_follow_user=" + pageUser; 

		console.log(queryString + "This is query string");


		$.ajax({url: "/toggleFollow", type: "post", data: queryString}).done(function(data)
		{
			console.log("inside ajax call");
			console.log(newButtonName);
			console.log(newName);
			
			$("#toggle_follow").val(newButtonName);
			$("#toggle_follow").attr("name", newName); 
		});	
	});
});
