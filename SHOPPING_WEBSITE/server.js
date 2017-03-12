var express = require('express');
var bodyParser = require('body-parser');

var models = require('./routes/app-routes');
var app = express();

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/'));

// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//yuri
// Get the index page:
app.get('/', function(req, res) {
    res.sendfile('index.html');
});


app.get('/product', models.findItemDesc);
app.post('/bought', models.saveBoughtItem);


//jasper
//get back the sold list
app.get('/products',function(req,res){
	models.findAllproducts(req,res);
});
app.get('/sellers', function(req,res){
	//console.log("in applicants");
	if(req.query.username === undefined){
		models.findAllSellers(req,res);
	}
	else if(req.query.username !== undefined){
		models.findBySellername(req,res);
	}
});
//add product
app.post('/product',function(req,res){
	if(req.query.productname === undefined){
		models.addproduct(req,res);
	}
	else{
		models.addproductcomment(req,res);
	}
});
//delete product
app.delete('/product', function(req,res){
	models.deleteproduct(req,res);

});

app.get('/buyers',function(req,res){
	if(req.query.username === undefined){
		models.findAllBuyers(req,res);
	}
	else if(req.query.username !== undefined){
		models.findByBuyername(req,res);
	}

});
app.post('/buyers',function(req,res){
	if(req.query.username !== undefined){
		models.addproductcomment(req,res);
	}
})
//steve
app.get("/login", models.userLogin);
app.post("/register", models.userRegister);
app.get("/admin", models.adminLogin);
app.get("/checkSeller", models.checkSeller);
app.get("/checkBuyer", models.checkBuyer);
app.get("/checkAdmin", models.checkAdmin);
app.post("/banSeller", models.banSeller);
app.post("/banBuyer", models.banBuyer);
app.post("/banProduct", models.banProduct);

//Kylin
app.get("/itemlist", function(req, res){
	models.findItem(req, res);
});
app.post("/password", function(req, res){
	models.changePassword(req, res);
});

app.post("/passwordSeller", models.changeSellerPassword);


// Start the server
app.listen(3002);
console.log('Listening on port 3002');
