$(document).ready( function() {
    
    $("#RegisButton").click(function() {
		var username = $("#username").val();
		var password = $("#password").val();
		var role = $("#role").val();

		if ((username == "") || (password === "")) {
            window.alert("Username and password can not be empty!");
            return;
        }

		var link = '/register' + '?role=' + role + '&username=' + username + '&password=' + password;
		//console.log(link);

		$.ajax({
			url: link,
			type: 'POST',
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
					window.alert("Username had been taken!");
				}

			}
		});
		
	});

	$("#home").click(function() {
		window.location = "./index.html";
	});
 
});