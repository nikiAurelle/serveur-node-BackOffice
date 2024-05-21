"use strict";

const category = require("../models/category");
const Category = require("../models/category"); 


exports.createCategory = async (req, res, next) => {
  const {name, description} = req.body.category;

  
  const newcategory = new category({name, description}); 
  console.log(newcategory);
  newcategory.save()
  .then(result => { 
		res.location('/category/' + result._id);
		res.status(201).json(result);
	})
	.catch(err =>{
		next(err);
	});
};


exports.getCategoryById = async (req,res,next) =>  {
  try {
      const {categoryId } = req.params;
      const categories = await Category.find({_id: categoryId });
      console.log(categories);


      if(!categories)
      throw new Error();

      res.status(200).json(categories);
  } catch (error) {
      next(error);
  }
  };
exports.getCategoryByPage = async (req, res, next) =>{
    try{
        console.log("entrée");
        const {pageNumber, pageLimit} = req.query;

        // Conversion des paramètres en nombres entiers
        const pageNumberInt = parseInt(pageNumber, 10) || 1;
        const pageLimitInt = parseInt(pageLimit, 10) || 5;
        console.log(pageLimit);
        // Calcul du nombre de produits à sauter (skip)
        const skip = (pageNumberInt - 1) * pageLimitInt;

        // Requête pour récupérer les produits avec pagination
        const categories = await Category.find()
            .skip(skip) // Saute le nombre de documents spécifié
            .limit(pageLimitInt);

    // if (categories.length === 0) {
    //     return res.status(404).json({ message: "Aucune catégorie trouvé" });
    // }
    if(!categories)
    throw new Error();

    res.status(200).json(categories);
    }
    catch (error){
        next(error);
    }
};

exports.getCategory = async (req,res,next) =>  {
try {
    const category = await Category.find();
    if(!category)
    throw new Error();

    res.status(200).json(category);
} catch (error) {
    next(error);
}
};


exports.updateCategoryById = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const {name, description} = req.body.category;

  Category.findById(categoryId)
    .then(category =>{
      category.name = name;
      category.description = description; 
      return category.save();
    })
    .then(result =>{
      res.status(200).json(result);
    })
    .catch(err =>{
      next(err);
    });

};


exports.deleteCategoryById = async (req, res, next) => {
  const categoryId = req.params.categoryId; // Récupère l'ID de la catégorie depuis les paramètres de l'URL

  try {
    // Utilisez la méthode findByIdAndDelete de Mongoose pour supprimer la catégorie de la base de données
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

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

exports.searchcategorybybarSearch= (req, res, next) =>{

  const {pageNumber, pageLimit, query} = req.query;
  console.log(query);

  const pageNumberInt = parseInt(pageNumber, 10) || 1;
  const pageLimitInt = parseInt(pageLimit, 10) || 10;
  const skip = (pageNumberInt - 1) * pageLimitInt;

  Category.find({ name: { $regex: query, $options: 'i' } }).skip(skip).limit(pageLimitInt)
  .then((category)=>{
    if(!category){
      const error = new Error("Aucune catégorie trouvé.");
      error.statusCode = 404;
      throw error;
    }
    console.log(category);
    res.status(200).json(category);
  }) 
  
  .catch(err => {
    next(err);
  });

};