"use strict";

const multer = require("multer");
const util = require("util");
const path = require("path");

console.log("je");
const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, "public/images");
    },

    filename: (req, file, callback) =>{
        let name = Math.floor(Math.random() * Math.floor(152524521325)).toString();
        name += Math.floor(Math.random() * Math.floor(1552252325)).toString();
        name += Math.floor(Math.random() * Math.floor(85455458652325)).toString();
        name += Math.floor(Math.random() * Math.floor(8544652325)).toString();
        name += Date.now() + ".";
        const extension = file.originalname.split('.').pop();
        name += extension;
        console.log(name);
        req.filename = name;
        callback(null, name);
    }
});

const upload = multer({storage});

module.exports = upload;