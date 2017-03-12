function checkLogin () {
	var parameters = location.search.substring(1).split("&");
	var temp = parameters[0].split("=");
	var id = temp[1];

	//alert(id);
	
	if (typeof id !== 'undefined') {
		$.ajax({
			url: '/checkAdmin?id=' + id,
			type: 'GET',
			dataType: 'json',
			success: function (response){
				if (response == "0") {
					window.location.replace("index.html");
				}

			}
		});
	}
	else {
		window.location.replace("index.html");
	}
}

function deleteSeller (username, ban) {
	var link = '/banSeller?username=' + username + '&ban=' + ban;

	$.ajax({
			url: link,
			type: 'POST',
			dataType: 'json',
			success: function (response){
				buildSellers();

			}
		});

}

function deleteBuyer (username, ban) {
	var link = '/banBuyer?username=' + username + '&ban=' + ban;
	$.ajax({
			url: link,
			type: 'POST',
			dataType: 'json',
			success: function (response){
				buildBuyers();

			}
		});

}

function deleteProduct (id, ban) {
	var link = '/banProduct?id=' + id + '&ban=' + ban;
	$.ajax({
			url: link,
			type: 'POST',
			dataType: 'json',
			success: function (response){
				buildProducts();

			}
		});

}

function changePassword (user, role) {
	var link = "";
	if (role == 'seller') {
		link += '/passwordSeller?user=' + user;
	}
	else {
		link += '/password?user=' + user;
	}

	var password = prompt("Please enter the new password", "");

	if (password == null || password == "") {
		alert("Input password can not be empty!");
	} 
	else {
		link += '&password=' + password;
		$.ajax({
			url: link,
			type: 'POST',
			success: function (response){
				if (response == 'Success') {
					buildSellers();
					buildBuyers();

				}
			}
		});
	}

}

function buildSellers () {
	$.ajax({
		url: "/sellers",
		type: 'GET',
		dataType: 'json',
		success: function (response){
			$('#showS tr').remove();

			let parent = $('#showS');

			parent.append($('<tr><th>Username</th><th>Password</th><th>Product IDs</th><th>Status</th></tr>'));

			for (var i = 0; i < response.length; i++) {
				var j = i;
				var row = $('<tr>');

				var username = response[j].username;
				var password = response[j].password;
				var products = response[j].products;

				// ban status
				var ban = "";
				if (response[j].ban == "1") {
					ban += "ACTIVE";
				}else {
					ban += "BANNED";
				}

				var pIDs = [];
				for (var n = 0; n < products.length; n++) {
					var m = n;
					pIDs.push(products[m].id);
				}
				var str_pIDs = JSON.stringify(pIDs);

				row.append($('<td type="text">' + username + '</td>'));
				row.append($('<td type="button" onclick="changePassword(\'' + username + '\', \'seller\');">' + password + '</td>'));
				row.append($('<td type="text">' + str_pIDs + '</td>'));

				row.append($('<td type="text">' + ban + '</td>'));

				row.append($('<td><input type="button" value="Ban/Activate" onclick="deleteSeller(\'' + username + '\', \'' + ban + '\');"></input></td>'));

				parent.append(row);
			}	
		}
	});
}

function buildBuyers() {
	$.ajax({
		url: "/buyers",
		type: 'GET',
		dataType: 'json',
		success: function (response){

			$('#showB tr').remove();

			let parent = $('#showB');

			parent.append($('<tr><th>Username</th><th>Password</th><th>Product IDs</th><th>Status</th></tr>'));

			for (var i = 0; i < response.length; i++) {
				var j = i;
				var row = $('<tr>');

				var username = response[j].username;
				var password = response[j].password;
				var products = response[j].products;

				// ban status
				var ban = "";
				if (response[j].ban == "1") {
					ban += "ACTIVE";
				}else {
					ban += "BANNED";
				}

				var pIDs = [];
				for (var n = 0; n < products.length; n++) {
					var m = n;
					pIDs.push(products[m].id);
				}
				var str_pIDs = JSON.stringify(pIDs);

				row.append($('<td type="text">' + username + '</td>'));
				row.append($('<td type="button" onclick="changePassword(\'' + username + '\', \'buyer\');">' + password + '</td>'));
				row.append($('<td type="text">' + str_pIDs + '</td>'));

				row.append($('<td type="text">' + ban + '</td>'));

				row.append($('<td><input type="button" value="Ban/Activate" onclick="deleteBuyer(\'' + username + '\', \'' + ban + '\');"></input></td>'));

				parent.append(row);
			}	
		}
	});
}

function buildProducts() {
	$.ajax({
		url: "/products",
		type: 'GET',
		dataType: 'json',
		success: function (response){

			$('#showP tr').remove();

			let parent = $('#showP');

			parent.append($('<tr><th>ID</th><th>Product name</th><th>Description</th><th>Quantity</th><th>Status</th></tr>'));

			for (var i = 0; i < response.length; i++) {
				var j = i;
				var row = $('<tr>');

				// ban status
				var ban = "";
				if (response[j].ban == "1") {
					ban += "ACTIVE";
				}else {
					ban += "BANNED";
				}

				var id = response[j].id;
				var name = response[j].name;
				var des = response[j].description;
				var quantity = response[j].quantity;

				row.append($('<td type="text">' + id + '</td>'));
				row.append($('<td type="text">' + name + '</td>'));
				row.append($('<td type="text">' + des + '</td>'));
				row.append($('<td type="text">' + quantity + '</td>'));
				row.append($('<td type="text">' + ban + '</td>'));

				row.append($('<td><input type="button" value="Ban/Activate" onclick="deleteProduct(\'' + id + '\', \'' + ban + '\');"></input></td>'));

				parent.append(row);
			}	
		}
	});
}

$(document).ready(function() {
	// login
	checkLogin();
	buildSellers();
	buildBuyers();
	buildProducts();
})


