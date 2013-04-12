
$(document).ready(function()
{
	var socket = io.connect("http://"+location.host);

	socket.on("connect", function()
	{
		socket.emit("set nickname", this_user);
	});

	//recieve messages
	socket.on("message", function(data)
	{
		displayMessage(data);
	});

	function sendMessage()
	{
		var msg_str = $("#postTextField").val();
		var data = {message: msg_str, to: that_user, from: this_user};
		$("#postTextField").val(""); //reset text field

		displayMessage(data);		//update the page
		socket.emit("relay", data);	//send the messsage
	}

	function displayMessage(data)
	{
		var new_msg = $(".post-container").clone()[0];
		$(new_msg).children("span.name").html(data.from);
		$(new_msg).find("p.post_message").html(data.message);
		$("#users-post-area").prepend(new_msg); //display msg
	}

	$("#submitButton").click(sendMessage);

	$("#postTextField").keydown(function(event){
		if(event.which === 13){
			sendMessage();
			event.preventDefault();
		}
	});
});
