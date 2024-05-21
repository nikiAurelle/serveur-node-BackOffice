"use strict";
const express = require("express");
const categoryController = require("../controllers/category");
const router = express.Router();


router.get('/category',categoryController.getCategory);
router.get('/category/:categoryId', categoryController.getCategoryById);
router.get('/category/by/page', categoryController.getCategoryByPage);
router.get('/category/search/page', categoryController.searchcategorybybarSearch);
router.post('/category', categoryController.createCategory);
router.put('/category/:categoryId', categoryController.updateCategoryById);
router.delete('/category/:categoryId', categoryController.deleteCategoryById);
module.exports = router;
