$(document).ready(function() {
	// login
	$("#LoginButton").click(function() {
		var username = $("#username").val();
		var password = $("#password").val();
		var role = $("#role").val();

		var link = '/login' + '?role=' + role + '&username=' + username + '&password=' + password;
		//console.log(link);

		$.ajax({
			url: link,
			type: 'GET',
			success: function (response){
				if (response != "0") {

					if (role == 'seller') {
						var page = "sellerHP.html?" + role + "=" + username + "&id=" + response;
						window.location.replace(page);
					}
					else {
						var page = "index.html?" + role + "=" + username + "&id=" + response;
						window.location.replace(page);
					}
				}
				else {
					window.alert("Username or passsword is invalid!");
				}

			}
		});
		
	});

	$("#home").click(function() {
		window.location = "./index.html";
	});

	$("#home").click(function() {
		window.location = "./index.html";
	});

	$("#home").click(function() {
		window.location = "./index.html";
	});

})


