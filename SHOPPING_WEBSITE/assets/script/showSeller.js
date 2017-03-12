var username;

//get the username from the url
function processUser(){
  if(location.search.substring(1).includes("&")){
    var parameters = location.search.substring(1).split("&");
    var temp = parameters[0].split("=");
    user = unescape(temp[1]);
    username=user;
    temp = parameters[1].split("=");
    var id = unescape(temp[1]);
    document.getElementById("curUser").innerHTML = user;
    if (typeof id !== 'undefined') {
      $.ajax({
        url: '/checkSeller?id=' + id + '&username=' + username,
        type: 'GET',
        success: function (response){
          if (response == "0") {
            window.location = "./login.html";
          }
          else {
            buildHtml();
          }
        }
      });
    }
  }
  else {
      window.location.replace("login.html");
  }
}

function deleteProduct(id, seller){
         $.ajax({
                  url: '/product?username='+ seller + '&productId=' + id,
                 type: 'DELETE',
                   success: function result(response) {
                     if(response !== "Success"){
                         alert("Error: Delete Failed");
                     }
                     else{
                         alert("Success! You remove successfully!");
                         location.reload(true);
                     }
                 }
             })
}

function buildHtml() {
  $.ajax({
    url: '/sellers?username=' + username,
    type: 'GET',
    success: function (response){

        let parent = $('#alllist');
        var row = $('<tr>');
        row.append($('<td type="text" class="lead">' + 'ID' + '</td>'));
        row.append($('<td type="text" class="lead">' + 'Name' + '</td>'));
        row.append($('<td type="text" class="lead">' + 'Department' + '</td>'));
        row.append($('<td type="text" class="lead">' + 'Price' + '</td>'));
        row.append($('<td type="text" class="lead">' + 'Comments' + '</td>'));
        parent.append(row);
        var comment = "";
      for (var i = 0; i < response.length; i++) {
        var row = $('<tr>');
        var id = response[i].id;
        var name = response[i].name;
        var seller = response[i].seller;
        var price = response[i].price;
        var department = response[i].department;
        if(response[i].comments.length === 0){
          comment = "no comment";
        }
        else{
          for(var j = 0; j< response[i].comments.length; j++){ 
              if(comment == ""){     
                comment = response[i].comments[j].username + ":" + response[i].comments[j].comment;
              }
              else{
                comment += response[i].comments[j].username + ":" + response[i].comments[j].comment;
              }
              comment += "<br>";
          }
        }
        row.append($('<td type="text">' + id + '</td>'));
        row.append($('<td type="text">' + name + '</td>'));
        row.append($('<td type="text">' + department + '</td>'));
        row.append($('<td type="text">' + price + '</td>'));
        row.append($('<td type="text">' + comment + '</td>'));
        parent.append(row);
        comment = "";
      }
      document.getElementById("showhi").innerHTML = "Hi," + username;
    }
  });
}

$(document).ready(function() {
    processUser();

    
    
    //onclick function to change the view
    $("#AllListButton").click(function(){
        document.getElementById("alllistpart").style.display = "block";
        document.getElementById("addpost").style.display = "none";
        document.getElementById("soldlistpart").style.display = "none";
    })
     $("#SoldListButton").click(function(){
        document.getElementById("addpost").style.display = "none";
        document.getElementById("alllistpart").style.display = "none";     
         document.getElementById("soldlistpart").style.display = "block";
    })
    $("#PostItemButton").click(function(){
        document.getElementById("addpost").style.display = "block";
        document.getElementById("alllistpart").style.display = "none";     
         document.getElementById("soldlistpart").style.display = "none";
    })
    $("#DeleteItemButton").click(function(){
        document.getElementById("alllistpart").style.display = "block";
        document.getElementById("addpost").style.display = "none";
         document.getElementById("soldlistpart").style.display = "none";
    })
	$("#AllListButton").click(function(){
  		$.ajax({
        url: '/sellers?username=' + username,
        type: 'GET',
        success: function (response){
        $('#alllist').empty();
        let parent = $('#alllist');
        var row = $('<tr>');
        row.append($('<td type="text" class="lead">' + 'ID' + '</td>'));
        row.append($('<td type="text" class="lead">' + 'Name' + '</td>'));
        row.append($('<td type="text" class="lead">' + 'Department' + '</td>'));
        row.append($('<td type="text" class="lead">' + 'Price' + '</td>'));
        row.append($('<td type="text" class="lead">' + 'Comments' + '</td>'));
        parent.append(row);
        var comment = "";
      for (var i = 0; i < response.length; i++) {
        var row = $('<tr>');
        var id = response[i].id;
        var name = response[i].name;
        var seller = response[i].seller;
        var price = response[i].price;
        var department = response[i].department;
        if(response[i].comments.length === 0){
          comment = "no comment";
        }
        else{
          for(var j = 0; j< response[i].comments.length; j++){ 
              if(comment == ""){     
                comment = response[i].comments[j].username + ":" + response[i].comments[j].comment;
              }
              else{
                comment += response[i].comments[j].username + ":" + response[i].comments[j].comment;
              }
              comment += "<br>";
          }
        }
        row.append($('<td type="text">' + id + '</td>'));
        row.append($('<td type="text">' + name + '</td>'));
        row.append($('<td type="text">' + department + '</td>'));
        row.append($('<td type="text">' + price + '</td>'));
        row.append($('<td type="text">' + comment + '</td>'));
        //row.append($('<input id="commenttext" type="text" style="display: none;">'));
        //username,id,productname,comment
        //row.append($('<td style="display: none;" id= "commentcommitbt" onClick="commit(\'' + username + '\',\'' + id + '\',\'' +  comment + '\'); ">Sumit Comment</td>'));

        parent.append(row);
        comment = "";
      }
    }








    });
  });



    $("#SoldListButton").click(function(){
      $.ajax({
        url: '/sellers?username=' + username,
        type: 'GET',
        success: function (response){
        $('#soldlist').empty();
        let parent = $('#soldlist');
        var row = $('<tr>');
        row.append($('<td type="text" class="lead">' + 'ID' + '</td>'));
        row.append($('<td type="text" class="lead">' + 'Name' + '</td>'));
        row.append($('<td type="text" class="lead">' + 'Department' + '</td>'));
        row.append($('<td type="text" class="lead">' + 'Price' + '</td>'));
        row.append($('<td type="text" class="lead">' + 'Comments' + '</td>'));
        parent.append(row);
        var comment = "";
      for (var i = 0; i < response.length; i++) {
        if(response[i].quantity === 0){
          var row = $('<tr>');
          var id = response[i].id;
          var name = response[i].name;
          var seller = response[i].seller;
          var price = response[i].price;
          var department = response[i].department;
          for(var j = 0; j< response[i].comments.length; j++){ 
              if(comment == ""){     
                comment = response[i].comments[j].username + ":" + response[i].comments[j].comment;
              }
              else{
                comment += response[i].comments[j].username + ":" + response[i].comments[j].comment;
              }
              comment += "<br>";
          }
          if (comment === undefined){
          comment = "no comment";
          }
        
          row.append($('<td type="text">' + id + '</td>'));
          row.append($('<td type="text">' + name + '</td>'));
          row.append($('<td type="text">' + department + '</td>'));
          row.append($('<td type="text">' + price + '</td>'));
          row.append($('<td type="text">' + comment + '</td>'));
          parent.append(row);
          comment = "";

        }
      }
    }
    });
  });



	//add the post onclick function
    $("#addButton").click(function (e) {
    	if (confirm('Are you sure you want to add this product?')) {
    		  // Save it!
          e.preventDefault();
          var productname = document.getElementById('productname').value;
          var dept = document.getElementById("deptlist");
          departmentname = dept.options[dept.selectedIndex].value;
          var price = document.getElementById('price').value;
          if(price == null || price == ""){
            price = 0;
          }
          var quantity =  document.getElementById('quantity').value;
          if(quantity == null || quantity == ""){
            quantity = 1;
          }
          var descript = "";
          var description = document.getElementById('description').value;
          if (! (description == null || description == "")){
            descript = description;
          }
          if(productname !== ""){
           $.ajax({
             url:'/product?username=' + username,
             type: "POST",
             data: {productname : productname, departmentname : departmentname, price : price, quantity: quantity, description: descript},
             success: function result(response) {
            	if(response == "error"){
                   alert('post failed');
               }
               else{
                   alert('You add ' + document.getElementById('productname').innerHTML + 'successfully!');
                   document.getElementById('productname').value = ""
                   document.getElementById('price').value = "";
                   document.getElementById('quantity').value = "";
                   document.getElementById('description').value = "";
               }
             }
          })
         }
         else{
          alert("please name your product!");
         }

       }

        else {
            // Do nothing!
            e.preventDefault();
        }
     });
     $("#DeleteItemButton").click(function (e) {
     	  $.ajax({
        url: '/sellers?username=' + username,
        type: 'GET',
        success: function (response){
        $('#alllist').empty();
        let parent = $('#alllist');
        var row = $('<tr>');
        row.append($('<td type="text" class="lead">' + 'ID' + '</td>'));
        row.append($('<td type="text" class="lead">' + 'Name' + '</td>'));
        row.append($('<td type="text" class="lead">' + 'Department' + '</td>'));
        row.append($('<td type="text" class="lead">' + 'Price' + '</td>'));
        row.append($('<td type="text" class="lead">' + 'Comments' + '</td>'));
        row.append($('<td type="text" class="lead">' + 'Delete?' + '</td>'));
        parent.append(row);
        var comment;
      for (var i = 0; i < response.length; i++) {
        var row = $('<tr>');
        var id = response[i].id;
        var name = response[i].name;
        var seller = response[i].seller;
        var price = response[i].price;
        var department = response[i].department;

        for(var j = 0; j< response[i].comments.length; j++){  
              comment += response[i].comments[j].username + ":" + response[i].comments[j].comment;
              comment += "<br>";
          }
        if (comment === undefined){
          comment = "no comment";
        }
        var Delete = "Delete";
        row.append($('<td type="text">' + id + '</td>'));
        row.append($('<td type="text">' + name + '</td>'));
        row.append($('<td type="text">' + department + '</td>'));
        row.append($('<td type="text">' + price + '</td>'));
        row.append($('<td type="text">' + comment + '</td>'));
        row.append($('<button type="button" class="btn btn-danger" onClick="deleteProduct(\'' + id + '\',\'' + seller + '\')";>Delete</button>'));
        if(response[i].quantity !== 0){
          parent.append(row);


        }
        comment = "";
        }
     	}
        })
    });

    $('#logout').click(function() {
        window.location = "./index.html";
    });
})
