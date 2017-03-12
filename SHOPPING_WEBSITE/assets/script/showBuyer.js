var username;
var productid;
//get the username from the url
function processUser(){
  var parameters = location.search.substring(1).split("&");
  var temp = parameters[0].split("=");
  user = unescape(temp[1]);
  username = user;
  document.getElementById("curUser").innerHTML = user;

  temp = parameters[1].split("=");
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
              }else {
                  buildHtml ();
              }
          }
      });
  }
  else {
      window.location = "./login.html";
  }
}
function appendComment(i){
	document.getElementById("cmtText" + i).style.display = "block";
	document.getElementById("commentcommitbt" + i).style.display = "block";
}

function commit(username, id, comment, i, orderNum){
	if (confirm('Are you sure you want to comment this product?')) {
	 	var username = username;
	 	var newcomment = document.getElementById('cmtText' + i).value;
	 	if(comment !== ""){
	 		alert("Don't be toxic! you already wrote the comment!");
	 	} else if (newcomment == "") {
            alert("Comment cannot be empty!");
        } else{
	 		 $.ajax({
				url: '/buyers?username=' + username,
				type: 'POST',
				data:{id: id, comment: newcomment, orderNum: orderNum},
				success: function result(response){
                    window.location.reload();
				}
			});
	 	}
	}
}

function buildHtml () {

   $.ajax({
    url: '/buyers?username=' + username,
    type: 'GET',
    dataType: 'json',
    success: function (response){

      let parent = $('#shoplist');
            $("#shoplist").append('<tr><td>ORDER NUMBER</td><td>NAME</td>' +
                                    '<td>PRICE</td><td>ADDRESS</td><td>COMMENTS</td></tr>');

      for (var i = 0; i < response.length; i++) {
        var j = i;
        var row = $('<tr>');
                var orderNum = response[j].orderNum;
        var id = response[j].id;
        productid = id;
        var name = response[j].name;
        var price = response[j].price;
                var address = response[j].address;
        var comment = response[j].comments;

                row.append($('<td type="text">' + orderNum + '</td>'));
        row.append($('<td type="text">' + name + '</td>'));
        row.append($('<td type="text">' + price + '</td>'));
                row.append($('<td type="text">' + address + '</td>'));
                if (comment == "") {
                    row.append($('<td id="td' + i + '"><button id="addCmt' + i + '" onClick="appendComment(\'' + i + '\');">Write Comment</button>' +
                                '<input id="cmtText' + i + '" type="text" style="display: none;" />' +
                                '<button style="display: none;" id="commentcommitbt' + i +
                                '" onClick="commit(\'' + username + '\',\'' + id + '\',\'' +
                                comment + '\',\'' + i + '\',\'' + orderNum + '\'); ">SUBMIT</button></td>'));
                } else {
                    // $("#td" + i).remove();
                    row.append($('<td type="text">' + comment + '</td>'));
                }
        // row.append($('<td><input id="cmtText' + i + '" type="text" style="display: none;">' +
                // '<button style="display: none;" id="commentcommitbt' + i +
                // '" onClick="commit(\'' + username + '\',\'' + id + '\',\'' +
                // comment + '\',\'' + i + '\',\'' + orderNum + '\'); ">SUBMIT</button></td>'));
                row.append($('</tr>'));
        $('#shoplist').append(row);

      }
      document.getElementById('showHi').innerHTML = "Hi," + username;
    }
  });
}
$(document).ready(function() {
	processUser();
	

    //onclick function to change the view
    $("#shoplistButton").click(function(){
        document.getElementById("shoplistdiv").style.display = "block";
        document.getElementById("passworddiv").style.display = "none";
    })

    $("#changepasswordButton").click(function(){
        document.getElementById("shoplistdiv").style.display = "none";
        document.getElementById("passworddiv").style.display = "block";
    })
    

	$("#shoplistButton").click(function(){
        $("#shoplist").empty();
        $.ajax({
    		url: '/buyers?username=' + username,
    		type: 'GET',
    		dataType: 'json',
    		success: function (response){

    			let parent = $('#shoplist');
                $("#shoplist").append('<tr><td>ORDER NUMBER</td><td>NAME</td>' +
                                        '<td>PRICE</td><td>ADDRESS</td><td>COMMENTS</td></tr>');

    			for (var i = 0; i < response.length; i++) {
    				var j = i;
    				var row = $('<tr>');
                    var orderNum = response[j].orderNum;
    				var id = response[j].id;
    				productid = id;
    				var name = response[j].name;
    				var price = response[j].price;
                    var address = response[j].address;
    				var comment = response[j].comments;

                    row.append($('<td type="text">' + orderNum + '</td>'));
    				row.append($('<td type="text">' + name + '</td>'));
    				row.append($('<td type="text">' + price + '</td>'));
                    row.append($('<td type="text">' + address + '</td>'));
                    if (comment == "") {
                        row.append($('<td><button id="addCmt' + i + '" onClick="appendComment(\'' + i + '\');">Write Comment</button>' +
                                    '<input id="cmtText' + i + '" type="text" style="display: none;" />' +
                                    '<button style="display: none;" id="commentcommitbt' + i +
                                    '" onClick="commit(\'' + username + '\',\'' + id + '\',\'' +
                                    comment + '\',\'' + i + '\',\'' + orderNum + '\'); ">SUBMIT</button></td>'));
                    } else {
                        row.append($('<td type="text">' + comment + '</td>'));
                    }
                    row.append($('</tr>'));
    				$('#shoplist').append(row);
    			}
    		}
    	});
 	});

  //var curUser = document.getElementById("curUser").innerHTML;
  //var protectedId = document.getElementById("idname").innerHTML;

  $('#changePassword').click(function(){
    var curUser = document.getElementById("curUser").innerHTML;
    var protectedId = document.getElementById("idname").innerHTML;
    var newPassword = document.getElementById("password").value;
    if(newPassword == '') {
      window.alert("password can't be empty!");
    }
    else{
      var link = "/password?user="+ curUser + "&password="+ newPassword;
      $.ajax({
        url: link,
        type: 'POST',
        success: function (response){
          if (response == "Success") {
            window.alert("Your password has changed successfully!");
          }
          else {
            window.alert("Action failed!");
          }

        }
      });
    }
  });


    $('#home').click(function() {
        var curUser = document.getElementById("curUser").innerHTML;
        var protectedId = document.getElementById("idname").innerHTML;
        window.location = "./index.html?buyer=" + curUser + "&id=" + protectedId;
    });
    $('#logout').click(function() {
        window.location = "./index.html";
    });
})
