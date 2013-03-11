$(document).ready(function()
{
	$("#submitButton").click(function(){
		//TODO validate form:
		//		-call checkpass()
		//		-run username through a regex
		var emailregex = "/\w+@[a-z]+.[a-z]+/";



	});

	//check if passwords match, in realtime, and display/hide the checkmark. Also check on blur (if user copy-pastes it, for instance).
	$("#validatePass").keyup(checkpass).blur(checkpass); //yay chaining!
	function checkpass()
	{
		if($(this).val() === $("#password").val())
		{
			$("#ok").show();
			return true;
		}
		else
		{
			$("#ok").hide();
			return false;
		}
	}
});
