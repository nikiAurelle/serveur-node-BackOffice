"use strict";

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); 

// GET => /users
router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);
router.get("/users/:id", userController.getUser);
router.put("/user/:id", userController.updateUser);


module.exports = router;