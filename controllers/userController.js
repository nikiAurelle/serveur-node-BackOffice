"use strict";

const User = require("../models/user"); 


exports.getUsers = (req, res, next) => {

	User.find()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			next(err);
		});

};


exports.createUser = (req, res, next) => {
	const { username, email, password} = req.body;
	const user = new User({username, email, password});
	user.save()
	.then(result => { 
		res.location('/users/' + result._id);
		res.status(201).json(result);
	})
	.catch(err =>{
		next(err);
	});
};


exports.getUser = (req, res, next) => {
    try {
        let user = req.user;
        if(user)
			res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};



exports.updateUser = (req, res, next) => {
    const { username, email, password, favorite, cart } = req.body; // Utilise destructuring pour extraire les champs

    User.findById(req.params.id)
        .then(user => {
            if (user) {
                user.username = username; // Met à jour le nom d'utilisateur
                user.email = email; // Met à jour l'email
                user.password = password; // Met à jour le mot de passe 
				if(favorite)
                	user.favorite = favorite; // Met à jour les favoris
				if(cart)
                	user.cart = cart; // Met à jour le panier

                return user.save(); // Enregistre les modifications
            } else {
                return Promise.reject({ status: 404, message: 'User not found' });
            }
        })
        .then(updatedUser => {
			
            res.status(200).json(updatedUser); // Répond avec l'utilisateur mis à jour
        })
        .catch(err => {
            next(err); // Passe l'erreur au middleware suivant
        });
};




