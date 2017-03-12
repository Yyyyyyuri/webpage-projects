function processUser(){
	var parameters = location.search.substring(1).split("&");
	var temp = parameters[0].split("=");
	user = unescape(temp[1]);
	temp = parameters[1].split("=");
	item = unescape(temp[1]);
	document.getElementById("curUser").innerHTML = user;
    document.getElementById("curItem").innerHTML = item;

	temp = parameters[2].split("=");
	id = unescape(temp[1]);
	document.getElementById("idname").innerHTML = id;
	if (typeof id !== 'undefined') {
		$.ajax({
			url: '/checkBuyer?id=' + id + '&username=' + user,
			type: 'GET',
			dataType: 'json',
			success: function (response){
				if (response == "0") {
					window.location = "./login.html";
				}
			}
		});
	}
	else {
		window.location = "./login.html";
	}
}

$(document).ready(function() {
	processUser();
	var curUser = document.getElementById("curUser").innerHTML;
	var curItem = document.getElementById("curItem").innerHTML;
	var protectedId = document.getElementById("idname").innerHTML;

	$("#title").append('<button id="buyerHP" class="btn btn-info">Hi, ' + curUser + '</button>');
	$("#title").append('<button id="logout" class="btn btn-info">LOGOUT</button>');

	$.ajax({
		url: '/product?buyer=' + curUser + '&item=' + curItem,
		type: 'GET',
		success: function (response){
			var p = response;
			$("#itemName").append("<p>" + p.name + "</p>");
			$("#itemDept").append("<p> In " + p.department + "</p>");
			$("#itemPrice").append("<p> Price: " + p.price + "</p>");
			$("#itemQuantity").append("<p> Quantity left: " + p.quantity + "</p>");
		}
	});

	$("#description").click(function() {
		console.log(1);
		$("#bottom").empty();
		$.ajax({
			url: '/product?buyer=' + curUser + '&item=' + curItem,
			type: 'GET',
			success: function (response){
				var p = response;
				$("#bottom").append("<p>" + p.description + "</p>");
			}
		});
	});

	$("#comment").click(function() {
		console.log(1);
		$.ajax({
			url: '/product?buyer=' + curUser + '&item=' + curItem,
			type: 'GET',
			dataType: 'json',
			success: function (response){
				var c = response.comments;
				$("#bottom").empty();
				if (c.length == 0) {
					$("#bottom").append("<p> No comments </p>");
				}
				for (var i = 0; i < c.length; i++) {
					$("#bottom").append("<p>" + c[i].username + ": " + c[i].comment + "</p>");
				}
			}
		});

  	});

	$("#buyIt").click(function() {
		//redirect to confirmation page
		$("#itemInfo").append('<input type="hidden" name="buyer" value=' +
		 curUser + ' />');
		$("#itemInfo").append('<input type="hidden" name="item" value=' + curItem + ' />');
		$("#itemInfo").append('<input type="hidden" name="id" value=' + protectedId + ' />');

  	});

	$('#home').click(function() {
		window.location = "./index.html?buyer=" + curUser + "&id=" + protectedId;
	});

	$("#buyerHP").click(function() {
		window.location = "./buyerHP.html?username=" + curUser + "&id=" + protectedId;
	});

	$('#logout').click(function() {
		window.location = "./index.html";
	});

});
