"use strict";

const mogoose = require("mongoose");

const categorySchema = new mogoose.Schema({
    name:{
        type:String,
        require:[true,"name ne peut pas etre null"]
    },
    description : {
        type:String,
        require:[true,"description ne peut etre null"]
    },
},{timestamps: true} );

module.exports = mogoose.model('Category', categorySchema);