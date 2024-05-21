"use strict";

const express = require("express");
const productController = require("../controllers/product");
const router = express.Router();

const uploadFile = require("../middleware/uploadFileClass");
const upload = require("../middleware/uploadFileClass");
const uploadFiles = uploadFile.fields([
    {name : "image"},
]);


router.get('/product',productController.getProducts);
router.get('/product/:productId', productController.getProductById);
router.get('/product/by/page', productController.getProductsByPage);
router.get('/product/search/page', productController.searchProductbybarSearch);
router.get('/product/byCategory/:categoryId', productController.searchProductbyCategory)
router.post('/product', productController.createProduct);
router.put('/product/:productId', productController.updateProductById);
router.delete('/product/:productId', productController.deleteProductById);


module.exports = router;