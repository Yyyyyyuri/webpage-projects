function msg(id) {
	var curUser = document.getElementById("username").innerHTML;
	if(curUser == "none"){
		window.alert("Please log in!");
	}
	else{
		//window.alert(id);
		var url = "itemDes.html?buyer="+curUser+"&item="+id+"&id="+document.getElementById("idname").innerHTML;
		window.location.href = url;
	}
}

function getuser(){
	if(location.search.substring(1).includes("&")){
		//console.log(1);
		var parameters = location.search.substring(1).split("&");
		var temp = parameters[0].split("=");
		type = temp[0];
		user = unescape(temp[1]);
		temp = parameters[1].split("=");
		curId = unescape(temp[1]);
		document.getElementById("userType").innerHTML = type;
		document.getElementById("username").innerHTML = user;
		document.getElementById("idname").innerHTML = curId;
	}
	else {
		if(location.search.substring(1).includes("=")){
			window.location.replace("index.html");
		}
	}
}

function checkuser(){
	var curName = document.getElementById("username").innerHTML;
	var curId = document.getElementById("idname").innerHTML;
	var curType = document.getElementById("userType").innerHTML;
	if(curType == "buyer"){
		$.ajax({
			url: '/checkBuyer?id=' + curId+"&username=" + curName,
			type: 'GET',
			success: function (response){
				if (response == "0") {
					window.location.replace("index.html");
				}
			}
		});
	}
	if(curType == "seller"){
		$.ajax({
			url: '/checkSeller?id=' + curId+"&username=" + curName,
			type: 'GET',
			success: function (response){
				if (response == "0") {
					window.location.replace("index.html");
				}
			}
		});
	}
}

$(document).ready(function() {
	getuser();
	if(document.getElementById("username").innerHTML!= "none"){
		checkuser();

		// change the top line that has a redirect to buyer homepage if logged in
		//remove the login and admin button first
		$("#logIn").remove();
		$("#admin").remove();

		var curUser = document.getElementById("username").innerHTML;
		$("#title").append('<button id="buyerHP" class="btn btn-info">Hi, ' + curUser + '</button>');
		$("#title").append('<button id="logout" class="btn btn-info">LOGOUT</button>');
	};




	$("#searchItem").click(function() {
		var itemSearch = $("#itemId").val();
		var deptResult = null;
		var sortResult = null;
		
			var dept = document.getElementById("sortbydept");
			deptResult = dept.options[dept.selectedIndex].value;
		
			var sort = document.getElementById("sortbyform");
			sortResult = sort.options[sort.selectedIndex].value;
		$.ajax({
			url: '/itemlist',
            type: 'GET',
            dataType: "json",
            data: {"itemIdSearch": itemSearch, "deptSearch": deptResult, "sortSearch": sortResult},
            success: function (response){
				if(response != "Error: not found!"){
					var result = response;
					document.getElementById("searchresult").style.display = "block";
					if(document.getElementById("itemlist").childNodes.length > 1){
						$(".itemNum").remove();
					}
					for(var p = 0; p < result.length; p++){
						var value = '<tr class = itemNum type = "button" id = ' + result[p].id+ ' onclick = "msg(' +result[p].id +')"></tr>';
						$("#itemlist").append(value);
						var name = '<td>' + result[p].name + '</td>';
						var depart = '<td>' + result[p].department + '</td>';
						var price = '<td>' + result[p].price + '</td>';
						$("#"+result[p].id).append(name);
						$("#"+result[p].id).append(depart);
						$("#"+result[p].id).append(price);
					}
				}
				else{
					document.getElementById("searchresult").style.display = "none";
					if(document.getElementById("itemlist").childNodes.length > 1){
						$(".itemNum").remove();
					}
					window.alert("Sorry. No such item!");
				}
			}
		});
	});

	$("#logIn").click(function() {
		window.location='login.html';
	});

	$("#admin").click(function() {
		window.location='admin.html';
	});

	$('#home').click(function() {
		window.location.reload();
	});

	var curId = document.getElementById("idname").innerHTML;
	$("#buyerHP").click(function() {
		window.location = "./buyerHP.html?username=" + curUser + "&id=" + curId;
	});

	$('#logout').click(function() {
		window.location = "./index.html";
	});
});
