"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({

	username : {
		type : String,
		required: true, 
	},

	email : {
		type : String,
		required: true, 
	},
	password : {
		type : String, 
	},
	
	favorite: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],

    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
		
    }],



},{
	timestamps: true, collection: "User",
});


module.exports = mongoose.model("User", userSchema);

