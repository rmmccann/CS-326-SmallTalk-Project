
$(document).ready(function()
{
	var socket = io.connect("http://localhost");

	socket.on("connect", function()
	{
		socket.emit("set nickname", this_user);
	});

	//recieve messages
	socket.on("message", function(data)
	{
		var new_msg = $(".post-container").clone()[0];
		var msg_str = data.message;
		$(new_msg).children("span.name").html(data.from);
		$(new_msg).find("p.post_message").html(msg_str);
		$("#users-post-area").append(new_msg); //display msg
	});

	function sendMessage()
	{
		var new_msg = $(".post-container").clone()[0];
		var msg_str = $("#postTextField").val();
		//$(new_msg).children("span.name").html("name");
		$(new_msg).find("p.post_message").html(msg_str);
		$("#postTextField").val(""); //reset text field
		$("#users-post-area").append(new_msg); //display msg
		//socket.emit("echo", msg_str); //send message

		console.log(this_user);
		// socket.emit("relay", "test");
		socket.emit("relay", {message: msg_str, to: that_user, from: this_user });
	}

	$("#submitButton").click(sendMessage);

	$("#postTextField").keydown(function(event){
		if(event.which === 13){
			sendMessage();
			event.preventDefault();
			//return false;
		}
	});
});
