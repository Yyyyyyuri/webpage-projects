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
	console.log(id);
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
		// data: { "item": curItem, "user": curUser },
		success: function (response){
			$("#name").empty();
			$("#price").empty();
			$("#name").append(response.name);
			$("#price").append('Price: ' + response.price);
		}
	});

	$("#confirm").click(function() {
		var itemName = document.getElementById("name").innerHTML;
		var priceText = document.getElementById("price").innerHTML;
		var price = Number(priceText.substring(7, priceText.length));
		var address = $("#addressText").val();
		$.ajax({
			url: '/bought?buyer=' + curUser,
			type: 'POST',
			data: {"id": curItem, "name": itemName, "price": price, "address": address, "comments": ""},
			success: function (response){
				if (response == "ERROR: NO MORE LEFT") {
					alert("Sorry, the item has sold out");
				} else {
					alert("Congratuation! Your order is on the way!");
					window.location = "/index.html?buyer=" + curUser + "&id=" + protectedId;
				}
			}
		})
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



})
