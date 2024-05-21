"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const multer = require("multer");
const path = require("path");
const app = express();
require('dotenv').config();

// Augmenter la limite de taille des requêtes
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/public/images', express.static(path.join(__dirname, 'public/images')));
const port = 3001;
 
app.use(bodyParser.json());
app.use(express.json());
 
app.use(express.urlencoded({ extended: true }));
 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
		res.status(200).end();
		return;
	}
	else{
		next();
	}
});

app.use(userRoutes);
app.use(productRoutes);
app.use(categoryRoutes); 
  app.use(function (err, req, res, next) {
	
    console.log("err", err);
    if (!err.statusCode){
      err.statusCode = 500;
    } 
  
    res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode });
  });	

  // const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, 'uploads'); // Destination où les fichiers téléchargés seront enregistrés sur le serveur Express
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, file.originalname); // Nom du fichier dans le dossier de destination
  //   }
  // });
  // const upload = multer({ storage: storage });
  
  // // Route pour gérer les téléchargements de fichiers
  // app.post('/upload', upload.single('file'), (req, res) => {
  //   const imageUrl = '/uploads/' + req.file.filename; // URL de l'image enregistrée
  //   res.status(200).json({ imageUrl: imageUrl }); // Renvoyer l'URL de l'image enregistrée en réponse
  // });
  app.get("/", (req, res) => res.send("Express on Vercel"));


  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connexion à la base de données réussie");
      app.listen(process.env.PORT);
      console.log("Serveur à l'écoute sur : http://localhost:" + process.env.PORT);
   
    })
    .catch(err => console.log(err));