

$(document).ready(function()
{
	$("#toggle-follow").click(function(event)
	{
		var name = $(this).attr("name");
		var newName = (name === "follow") ? "unfollow" : "follow";
		var newButtonName = (name === "follow") ? "Unfollow" : "Follow";

		var queryString = {
			action: name,
			user: pageUser
		};

		$.ajax({url: "/toggleFollow", type: "post", data: queryString}).done(function(data)
		{
			$("#toggle-follow").val(newButtonName);
			$("#toggle-follow").attr("name", newName);
		});
	});
});
