var Schema = require('../model/schema');
var Product = Schema.model('Products');
var Buyer = Schema.model('Buyers');
var Seller = Schema.model('Sellers');

//to keep track of the username that already logged in, otherwise doesn't log in
var global_username = "";
// kylin
exports.findItem = function(req, res) {
		var item = req.query.itemIdSearch;
		var dept = req.query.deptSearch;
		var sort = req.query.sortSearch;

		if(item != ''){
			if(dept != 'none'){
				Product.find({"name": { "$regex": item, "$options": "i"}, "quantity": { $gt: 0 }, "department": dept, ban: "1"}, function(err, itemList) {
					if (err) {
						throw err;
					}
					else {
						if(itemList == ''){
							return res.json("Error: not found!");
						}
						else{
							if(sort != 'none'){
								itemList.sort(function(a, b){
									if(a.price < b.price){
										return -1;
									}
									if(a.price > b.price){
										return 1;
									}
									return 0;
								});
							}
							return res.send(itemList);
						}
					}
				});

			}
			else if(dept == 'none'){
				Product.find({name: { "$regex": item, "$options": "i"}, quantity: { $gt: 0 }, ban: "1"},function(err, itemList) {
					 if (err) {
						throw err;
					}
					else{
						if(itemList == ''){
							return res.json("Error: not found!");
						}
						else{
							if(sort != 'none'){
								itemList.sort(function(a, b){
								if(a.price < b.price){
									return -1;
								}
		                        if(a.price > b.price){
									return 1;
								}
								return 0;
								});
							}
							return res.json(itemList);
						}
					}
				});

			}

		}
		else{
			if(dept != 'none'){
				Product.find({quantity: { $gt: 0 }, department:dept, ban: "1"}, function(err, itemList) {
					//console.log(itemList);
					if(err){
						throw err;
					}
					else{
						if(itemList == ''){
							return res.json("Error: not found!");
						}
						else{
							if(sort != 'none'){
								itemList.sort(function(a, b){
								if(a.price < b.price){
									return -1;
								}
		                        if(a.price > b.price){
									return 1;
								}
								return 0;
								});
							}
							return res.send(itemList);
						}
					 }
				});
			}
			else{
				return res.json("Error: not found!");
			}
		}

};

exports.changePassword = function(req, res){
	var user = req.query.user;
	var password = req.query.password;
	//console.log(password);
	Buyer.findOne({username: user}, function(err, buyer){
		if(err) throw err;
		Buyer.update(
			{username: user},
			{ $set: {password: password}}, function(err) {
				if (err) throw err;
				res.send("Success");
			}
		);

	})
}

exports.changeSellerPassword = function(req, res){
	var user = req.query.user;
	var password = req.query.password;
	//console.log(password);
	Seller.findOne({username: user}, function(err, seller){
		if(err) throw err;
		Seller.update(
			{username: user},
			{ $set: {password: password}}, function(err) {
				if (err) throw err;
				res.send("Success");
			}
		);

	})
}

// jasper
exports.findAllBuyers = function(req,res){
    //console.log('findAllBuyers');
    Buyer.find({}, function(err, allBuyers){
        if (err) throw err;
        //console.log(allBooks)
        res.send(allBuyers);
    });
}

exports.findBySellername = function(req, res){
    var result = [];
    var name = req.query.username;
    Seller.find({username: name},function(err,seller){
        if (err) throw err;
        //console.log(seller);
        var soldproductArray = seller[0].products;
        // console.log(seller.products);
        // for(index in soldproductArray){
        //      result.push(soldproductArray[index]);
        //      console.log(result);
        // }
        res.send(soldproductArray);
    })
};

//Buyer part
exports.findByBuyername = function(req,res){
    var result = [];
    var name = req.query.username;
    //console.log("in!");
    Buyer.find({username: name},function(err,buyer){
        if (err) throw err;
        var boughtproductArray = buyer[0].products;
        res.send(boughtproductArray);
    });
};

// exports.findByBuyername = function(req,res){

// }


// the unique ID for every product, need to fix this!!
exports.addproduct = function(req,res){
    //let's assume the username is is the request, otherwise cannot keep track of the user
    //need to add id,picture some kinds of thing in the ajax call to satisfy the Book Schema
   	Product.count({} , function(err, count){
    // item.itemId is the max value

    var uniqueId = (count + 1).toString();
    console.log(req.body.description);
    var name = req.query.username;
    var newproduct = new Product({
        id : uniqueId,
        seller: name,
        name : req.body.productname,
        price : parseInt(req.body.price, 10),
		quantity : req.body.quantity,
        department: req.body.departmentname,
        ban : "1",
        description : req.body.description,
        comment : []
    });
     Seller.update(
        { username : name},
        { $push: {products: newproduct}} , function(err){
            if(err) throw err;
            //     res.send("add product to seller.json failed");
            // }
			// console.log("wocaonima");
			// newproduct.save(function(err){
	        //    if(err) return handleError(err);
	        //        //console.log(err);
	        //     //    res.send("add product to product.json failed");
			//
	        // //    }
	        // //    else{
			// 	   console.log("kekeke");
	        //        res.send("Success");
	        // //    }
	    //    });
        });
		newproduct.save(function(err){
        if(err) throw err
            //console.log(err);
            // res.send("add product to product.json failed");
        // }
        // else{
        	// uniqueId += 1;
            res.send("Success");
        // }
    });
	});
}

exports.deleteproduct = function(req,res){
    //let's assume the username is is the request, otherwise cannot keep track of the user

    //finding the product name in product.json, delete it, then find out its id, del it in seller.json
    var username = req.query.username;
    var productId = req.query.productId;

     //console.log(productId);
      Seller.findOne({"username": username}, function(err, curUser) {
      		if (err) {
      			res.send("err");
      		}
      		else{
				 var productArray = curUser.products;
				  //console.log(productArray);
				 for (var i = 0; i < productArray.length; i++) {
			  		if (productArray[i].id === productId) {
			  			//console.log(curUser.products[i].price);
		 	 			Seller.update(
	    						{ username: curUser.username, 'products.seller': curUser.username, 'products.id' : productId},
	  	 					{ $pull: { products: {'id':productId} } }, function(err) {
				 					if (err) {
				 						res.send("err");
				 					}
				 			}
	  					)
		 	 		}
		 	 	}
	 	 	}
	 	 })
      Product.findOne({"id": productId}, function(err, curProduct) {
      	if (err) {
      		res.send("err");
      	}
      	else{
      		Product.update({id: curProduct.id},
      			{ $set: { quantity : 0}}, function(err){
      				if(err) {
      					res.send("err");
      				}
      				else{
      					res.send("Success");
      				}
      			})
      	}
      })
   //   Product.findOne({"products.id" : productId},function(err,curProduct){
   //   	if(err) throw err;
   //   	//console.log(curProduct);
   //   	var productArray = curProduct.products;
   //   	for (var i = 0; i < productArray.length; i++) {
   //   		if (productArray[i].id === productId) {
		 //     	Product.update(
		 //     		{'products.id'},
		 //     		{$pull: { products:{ 'id': productId }}},function(err){
		 //     			if(err) throw err;
		 //     		}
   //   			)
		 //     }
		 // }
   //   })

	//Product.findOneAndDelete({ id: productId });

        //res.send(allSellers);

}
exports.findAllproducts = function(req,res){
    Product.find({}, function(err,allProducts){
        if (err) throw err;
        allProducts.sort(function(a, b){
		if(parseInt(a.id, 10) < parseInt(b.id, 10)) {
			return -1;
		}
		if(parseInt(a.id, 10) > parseInt(b.id, 10)){
			return 1;
		}
		return 0;
		});
		res.send(allProducts);
    });
}

exports.addproductcomment = function(req,res){
	var username = req.query.username; // buyer username
	var comment = req.body.comment;
	var order = req.body.orderNum;
	var newCmt = {"username": username, "comment": comment};
	Product.update(
		{id: req.body.id},
		{$push: {"comments": newCmt}}, function (err) {
			if (err) throw err;
	});
	Product.findOne({"id": req.body.id}, function (err, curProduct) {
		if (err) throw err;
		var curSeller = curProduct.seller;
		Seller.update(
			{username: curSeller, "products.id": req.body.id},
			{$push: {"products.$.comments": newCmt}}, function (err) {
				if (err) throw err;
			});
	});
	Buyer.update(
		{username: req.query.username, 'products.orderNum': order},
		{$set: {'products.$.comments': comment }},function(err){
			if(err) throw err;
			// res.send("Success");
	});
	res.send("Success");
};


// yuri
exports.findItemDesc = function(req, res) {
	//console.log(req.query);

	if (req.query.buyer != null && req.query.item != null) {
		Product.findOne({"id": req.query.item}, function(err, curGoods) {
	      if (err) throw err;
		  //console.log(curGoods);
	      res.send(curGoods);
	    })
	}
};

function updateQuantity(product) {
		// console.log("this is helper function");
		// console.log(product);
		var newQuantity = product.quantity - 1;
		Product.update(
			{id: product.id,},
			{ $set: {quantity: newQuantity}}, function(err) {
				if (err) throw err;
			});
	};

// Since there is already one order in our database
exports.saveBoughtItem = function(req, res) {
	//check the avaliability of the product
	Product.findOne({"id": req.body.id}, function(err, curProduct) {
		if (curProduct.quantity > 0) {
			updateQuantity(curProduct);
			// update the buyer information
			Buyer.findOne({"username": req.query.buyer}, function(err, curUser) {
				if (err) throw err;
				var newBought = req.body;
				// Buyer.findOne().sort("-lastOrder").exec(function(err, result) {
				// 	console.log(result);
				// 	// console.log(result.products.orderNum);
				// 	var orderNum = result.lastOrder;
				// });
				Buyer.findOne().sort("-lastOrder").exec(function(err, result) {
					var ordernum = result.lastOrder + 1;
					newBought.orderNum = ordernum;
					// orderNum += 1;
					Buyer.update(
						{ username: req.query.buyer},
						{ $set: {lastOrder: ordernum}}, function(err) {
							if (err) throw err;
					});
					Buyer.update(
						{ username: req.query.buyer},
						{ $push: {products: newBought}}, function(err) {
							if (err) throw err;
							res.send("Success");
						});
				});
			});
			// udpate the quantity in seller.json
			var seller = curProduct.seller;
			Seller.findOne({"username": seller}, function(err, curSeller) {
				if (err) throw err;
				for (var i = 0; i < curSeller.products.length; i++) {
					if (curSeller.products[i].id == req.body.id) {
						var newQuantity = curSeller.products[i].quantity - 1;
						Seller.update(
							{username: curSeller.username, 'products.id': req.body.id},
							{$set: {'products.$.quantity': newQuantity}}, function(err) {
								if (err) throw err;
							});
					}
				}
			});
		} else {
			res.send("ERROR: NO MORE LEFT");
		}
	});

}


// steve
exports.findAllSellers = function(req, res) {
    //console.log('findAllSellers');
    Seller.find({}, function(err, allSellers) {
        if (err) throw err;
        // console.log(allSellers);
        res.send(allSellers);
    });
};

var seller_ids = [];

var buyer_ids = [];

exports.userLogin = function(req, res) {
    // buyer or seller
    var role = req.query.role;

    // seller
    if (role == "seller") {
	Seller.findOne({username: req.query.username, password: req.query.password, ban: "1"}, function(err, seller) {
	    if (err) throw err;
	    //console.log(JSON.stringify(seller));
	    if (!seller) {
	    	res.send(JSON.stringify(0));
	    }else {

	    	// update list
	    	for (var i = 0; i < seller_ids.length; i++) {
	    		var j = i;
	    		if (seller_ids[j].name == req.query.username) {
	    			seller_ids.splice(j, 1);
	    		}
	    	}
	    	var id = randid();
	    	seller_ids.push({name: req.query.username, id: id});

	    	//console.log(id);
	        res.send(id);
	    }
	});
    }

    // buyer
    else {
	Buyer.findOne({username: req.query.username, password: req.query.password, ban: "1"}, function(err, buyer) {
	    if (err) throw err;

	    if (!buyer) {
	    	res.send(JSON.stringify(0));
	    }else {

	    	// update list
	    	for (var i = 0; i < buyer_ids.length; i++) {
	    		var j = i;
	    		if (buyer_ids[j].name == req.query.username) {
	    			buyer_ids.splice(j, 1);
	    		}
	    	}
	    	var id = randid();
	    	buyer_ids.push({name: req.query.username, id: id});

	        res.send(id);
	    }
	});
    }
};

exports.userRegister = function(req, res) {
	// buyer or seller
    var role = req.query.role;

    // seller
    if (role == "seller") {
    	Seller.findOne({username: req.query.username}, function(err, seller) {
	    	if (err) throw err;
	    	//console.log(JSON.stringify(seller));
	    	if (!seller) {
	    		var newseller = new Seller({username: req.query.username, password: req.query.password, products: [], ban: "1"});
	    		newseller.save(function(err){
    				if(err) throw err;

    				var id = randid();
    				seller_ids.push({name: req.query.username, id: id});
    				//console.log(JSON.stringify(id));

    				res.send(id);
   				});
	    	}else {
	        	res.send(JSON.stringify(0));
	    	}
	    });
    }

    // buyer
    else {
	    Buyer.findOne({username: req.query.username}, function(err, buyer) {
	    	if (err) throw err;
	    	//console.log(JSON.stringify(buyer));
	    	if (!buyer) {
	    		var newbuyer = new Buyer({username: req.query.username, password: req.query.password, products: [], ban: "1"});
	    		newbuyer.save(function(err){
    				if(err) throw err;
    				var id = randid();
    				buyer_ids.push({name: req.query.username, id: id});
    				res.send(id);
   				});
	    	}else {
	        	res.send(JSON.stringify(0));
	    	}
	    });
    }
};

var admin_id = "";
exports.adminLogin = function(req, res) {
    if (req.query.password == "wozuidiao") {
    	admin_id = randid();
    	//console.log(admin_id);
    	res.send(JSON.stringify(admin_id));
    }
    else {
    	res.send(JSON.stringify(0));
    }
};

exports.checkAdmin = function(req, res) {
    if (req.query.id == admin_id) {
    	res.send(JSON.stringify(1));
    }
    else {
    	res.send(JSON.stringify(0));
    }
};

exports.checkSeller = function(req, res) {
	var seller_id = "";
	for (var i = 0; i < seller_ids.length; i++) {
	    var j = i;
	    if (seller_ids[j].name == req.query.username) {
	    	seller_id += seller_ids[j].id;
	    }
	}

    if (req.query.id == seller_id) {
    	res.send(JSON.stringify(1));
    }
    else {
    	res.send(JSON.stringify(0));
    }
};

exports.checkBuyer = function(req, res) {
	//console.log(0);
	var buyer_id = "";
	for (var i = 0; i < buyer_ids.length; i++) {
	    var j = i;
	    if (buyer_ids[j].name == req.query.username) {
	    	buyer_id += buyer_ids[j].id;
	    }
	}

    if (req.query.id == buyer_id) {
    	res.send(JSON.stringify(1));
    }
    else {
    	res.send(JSON.stringify(0));
    }
};

function randid() {

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

exports.banSeller = function(req, res) {
	var cur_ban = req.query.ban;
	if (cur_ban == "BANNED") {
		Seller.update({username: req.query.username}, { $set: { ban: "1"}}, function(err, b) {
			if (err) throw err;
			res.send(JSON.stringify(1));
		});
	}
	else {
		Seller.update({username: req.query.username}, { $set: { ban: "0"}}, function(err, b) {
			if (err) throw err;
			res.send(JSON.stringify(1));
		});
	}
}

exports.banBuyer = function(req, res) {
	var cur_ban = req.query.ban;
	if (cur_ban == "BANNED") {
		Buyer.update({username: req.query.username}, { $set: { ban: "1"}}, function(err, b) {
			if (err) throw err;
			res.send(JSON.stringify(1));
		});
	}
	else {
		Buyer.update({username: req.query.username}, { $set: { ban: "0"}}, function(err, b) {
			if (err) throw err;
			res.send(JSON.stringify(1));
		});
	}
}

exports.banProduct = function(req, res) {
	var cur_ban = req.query.ban;
	if (cur_ban == "BANNED") {
		Product.update({id: req.query.id}, { $set: { ban: "1"}}, function(err, b) {
			if (err) throw err;
			res.send(JSON.stringify(1));
		});
	}
	else {
		Product.update({id: req.query.id}, { $set: { ban: "0"}}, function(err, b) {
			if (err) throw err;
			res.send(JSON.stringify(1));
		});
	}
}
