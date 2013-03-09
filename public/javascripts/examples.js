	$(document).ready(function(){
		$("#submitButton").click(function(){
	 		if($("#password").val() !== $("#validatePass").val())
	 		{
	 			alert("passwords do not match.");
	 		}
	 	});
	});
	