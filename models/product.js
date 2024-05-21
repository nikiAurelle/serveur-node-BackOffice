"use strict";
const mongoose = require("mongoose");


const choiceSchema = new mongoose.Schema({
    
	name: {
		type: String,
	}, 
	
}, { _id: false }); 

const optionsSchema = new mongoose.Schema([{
	
	name:{
		type: String
	},
	values:[choiceSchema]
	
	
}],{ _id: false } );


const produitSchema = new mongoose.Schema({
  name: {
      type: String,
      required: [true, "Le nom ne peut pas être null"]
  },
  description: {
      type: String,
      required: [true, "La description ne peut pas être null"]
  },
  stock: {
      type: Number,
      required: [true, "Le stock ne peut pas être null"]
  },
  solde_price: {
      type: Number,
      required: [false, "Le prix ne peut pas être null"],
      default: 0
  },
  regular_price: {
      type: Number,
      required: [false, "Le prix ne peut pas être null"],
      default: 0
  },
  availability: {
      type: Boolean,
      required: false,
      default: false
  },
  brand: {
      type: String,
      required: [false, "Le prix ne peut pas être null"]
  },
  status: {
      type: Boolean,
      required: false,
      default: false
  },
  isBestSeller: {
      type: Boolean,
      required: false,
      default: false
  },
  isNewArrival: {
      type: Boolean,
      required: false,
      default: false
  },
  isSpecialOffer: {
      type: Boolean,
      required: false,
      default: false
  },
  categories: [{
      type: mongoose.Schema.Types.ObjectId,
  }],
  options: [ optionsSchema],

  imageUrls: String, 
  
  // Tableau de chaînes de caractères (noms de fichiers)
  currency: {
    type: String,
    required: [true, "La devise est requise"],
    enum: ["CAD", "USD", "EUR"]
}
}, { timestamps: true });

module.exports = mongoose.model('Product', produitSchema);

