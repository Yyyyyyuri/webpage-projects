var mongoose = require('mongoose');

// Doc for Mongoose Schemas: http://mongoosejs.com/docs/guide
var Schema = mongoose.Schema;

/**
 * Note that the database was loaded with data from a JSON file into a
 * collection called gillers.
 */

 var commentSchema = new Schema(
     {
         username: String,
         comment: String
     }
 );

 var productSchema = new Schema(
     {
         id: {
             type: String, required: true, default: null, trim: true, unique: true, sparse: true
         },
         seller: {
             type: String, required: true
         },
         name: {
             type: String, required: true
         },
         price: {
             type: Number, required: true, min: 0
         },
         quantity: {
             type: Number, required: true, min: 1
         },
         department: {
             type: String, required: true
         },
         ban : {
             type: String, required: true
         },
         description: {
             type: String
         },
         ban: {
            type: String, required: true
         },
         comments: [commentSchema]
     },
     {
         collection: 'products'
     }
 );



var buyerSchema = new Schema(
	{
		username: {
			type: String, required: true, unique: true
		},
		password: {
			type: String, required: true
		},
        ban : {
             type: String, required: true, default: "1"
        },
        lastOrder : {
            type: Number, required: true, default: 0
        },
		products: [{orderNum: Number,
            id: String,
			name: String,
			price: Number,
			address: String,
            comments: String}]
		},
		{
		collection: 'buyers'
		}
	);

var sellerSchema = new Schema(
    {
        username: {
            type: String, required: true, unique: true
        },
        password: {
            type: String, required: true
        },
        ban : {
             type: String, required: true, default: "1"
         },
        products: [productSchema],
    },
    {
        collection: 'sellers'
    }
);

mongoose.connect('mongodb://localhost/schemadb');

module.exports = mongoose.model('Products', productSchema);
module.exports = mongoose.model('Buyers', buyerSchema);
module.exports = mongoose.model('Sellers', sellerSchema);

// Doc for Mongoose Connections: http://mongoosejs.com/docs/connections
// var conn3 = mongoose.connect('mongodb://localhost/sellerdb');

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
// module.exports = conn3.model('Seller', sellerSchema);
