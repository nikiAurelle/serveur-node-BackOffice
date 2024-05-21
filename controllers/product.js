"use strict";

const { log } = require("console");
const Product = require("../models/product");
const fs = require('fs');
const path = require('path');

exports.getProducts = async (req,res,next) =>  {
try {
    const products = await Product.find(); 
    if(!products)
    throw new Error();

    res.status(200).json(products);
} catch (error) {
    next(error);
}
};
exports.getProductById = async (req,res,next) =>  {
    try {
        const {productId } = req.params;
        const products = await Product.find({_id: productId });
        // console.log(products);

        // if (products.length === 0) {
        //     return res.status(404).json({ message: "Aucun produit trouvé" });
        // }
        if(!products)
        throw new Error();

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
    };

exports.getProductsByPage = async (req, res, next) =>{
    try{
        const {pageNumber, pageLimit} = req.query;

        const pageNumberInt = parseInt(pageNumber, 10) || 1;
        const pageLimitInt = parseInt(pageLimit, 10) || 10;
        const skip = (pageNumberInt - 1) * pageLimitInt;

        const products = await Product.find()
            .skip(skip) // Saute le nombre de documents spécifié
            .limit(pageLimitInt);

   
    if(!products)
    throw new Error();

    res.status(200).json(products);
    }
    catch (error){
        next(error);
    }
};

exports.createProduct = async (req, res, next) => {
  const image = req.body.product.image;
  let filename = "";
  console.log(!image.includes("localhost"));
  // if(image.includes("localhost")){
   
  // }
  const matches = image.match(/^data:([A-Za-z\+\/]+);base64,(.+)$/);
  let buff = Buffer.from(matches[2], 'base64');
  const date = Date.now();
  filename = date +"product"+ date + '.png';
  const imagePath = path.join(__dirname, '../public/images', filename);
  fs.writeFileSync(imagePath, buff);

  const {name, description, stock, solde_price, regular_price, availability, brand, status, isBestSeller, 
    isNewArrival, isSpecialOffer, categories, options, currency} = req.body.product;
    let imageUrls = filename;
  const product = new Product({name, description, stock, solde_price, regular_price, availability, brand, status, isBestSeller, isNewArrival,
  isSpecialOffer, categories, options, imageUrls, currency});


  product.save()
  .then(result => { 
		res.location('/products/' + result._id);
		res.status(201).json(result);
	})
	.catch(err =>{
		next(err);
	});
 
};



exports.updateProductById =  (req, res, next) => {
  const productId = req.params.productId; 

  const image = req.body.product.image;
  let filename = "";
  console.log(!image.includes("localhost"));
  // if(!image.includes("localhost")){
    
  // }
  const matches = image.match(/^data:([A-Za-z\+\/]+);base64,(.+)$/);
    let buff = Buffer.from(matches[2], 'base64');
    const date = Date.now();
    filename = date + productId + date + '.png'; // Nom du fichier pour l'image

    // Assurez-vous que le dossier 'public/images' existe
    const imagePath = path.join(__dirname, '../public/images', filename);

    // Écrire l'image dans un fichier
    fs.writeFileSync(imagePath, buff);

  const {name, description, stock, solde_price, regular_price, availability, brand, status, isBestSeller, 
    isNewArrival, isSpecialOffer, categories, options, currency} = req.body.product;
  
  
  
  Product.findById(productId)
  .then(product =>{
    product.name = name;
    product.description = description;
    product.stock = stock;
    product.solde_price = solde_price;
    product.regular_price = regular_price;
    product.availability = availability;
    product.brand = brand;
    product.status = status;
    product.isBestSeller = isBestSeller;
    product.isNewArrival = isNewArrival,
    product.isSpecialOffer = isSpecialOffer;
    product.categories = categories;
    product.options = options;
    if(!image.includes("localhost"))
      product.imageUrls = filename;
    product.currency = currency;
    return product.save();
  })
  .then(result =>{
    res.status(200).json(result);
  })
  .catch(err =>{
		next(err);
	});
};


exports.deleteProductById = async (req, res, next) => {
  const productId = req.params.productId; // Récupère l'ID de la catégorie depuis les paramètres de l'URL

  try {
    // Utilisez la méthode findByIdAndDelete de Mongoose pour supprimer la catégorie de la base de données
    const deletedCategory = await Product.findByIdAndDelete(productId);

    // Vérifiez si la catégorie a été trouvée et supprimée avec succès
    if (deletedCategory) {
      // Répond avec un message indiquant que la catégorie a été supprimée avec succès
      return res.status(200).json({ message: 'Category deleted successfully' });
    } else {
      // Si la catégorie n'a pas été trouvée, renvoie une réponse 404 Not Found
      return res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    // Si une erreur survient lors de la suppression de la catégorie, renvoie une réponse 500 Internal Server Error avec l'erreur
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


exports.searchProductbyCategory = (req, res, next) =>{
  const categoryId = req.params.categoryId;
  Product.find({ categories: categoryId })
  .then(product =>{
    if(!product){
      const error = new Error("Aucun produit trouvé.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(product);
  })
  .catch(err => {
    next(err);
  });
};

exports.searchProductbybarSearch= (req, res, next) =>{

  const {pageNumber, pageLimit, query} = req.query;
  console.log(query);

  const pageNumberInt = parseInt(pageNumber, 10) || 1;
  const pageLimitInt = parseInt(pageLimit, 10) || 10;
  const skip = (pageNumberInt - 1) * pageLimitInt;

  Product.find({ name: { $regex: query, $options: 'i' } }).skip(skip).limit(pageLimitInt)
  .then((product)=>{
    if(!product){
      const error = new Error("Aucun produit trouvé.");
      error.statusCode = 404;
      throw error;
    }
    console.log(product);
    res.status(200).json(product);
  }) 
  
  .catch(err => {
    next(err);
  });

};