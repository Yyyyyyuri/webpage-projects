$(document).ready(function() {
	// login
	$("#LoginButton").click(function() {
		var password = $("#password").val();

		var link = '/admin?password=' + password;

		$.ajax({
			url: link,
			type: 'GET',
			dataType: 'json',
			success: function (response){
				if (response != "0") {
					var page = "administrate.html?id=" + response;
					window.location.replace(page);
				}
				else {
					window.alert("Passsword is invalid!");
					window.location.replace("index.html");
				}

			}
		});
		
	});

})


