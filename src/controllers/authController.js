const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = "securesecret";
const expiry = 3600;

exports.registerNewUser = (req, res) => {
    
//fetch user info from req body
User.findOne({username : req.body.username}, (err, existingUser) => {
    if(err) {
        return res.status(500).json({err})
    } 
        if(existingUser) {
            return res.status(400).json({message: "username exist"})
        }
        User.create({firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username
        }, (err, newUser) => {
            if(err) {
                return res.status(500).json({ err })
            
            }

           bcrypt.genSalt(10, (err, salt) => {
               if(err){
                   return res.status(500).json({err})
               }
               bcrypt.hash(req.body.password, salt, (err, hashPassword) => {
                   if(err) {
                       return res.status(500).json({err})
                   }

                   newUser.password = hashPassword;
                   newUser.save((err, savedUser) => {
                       if(err) {
                           return res.status(500).json({err})
                       }
                       jwt.sign({
                        id: newUser_id,
                        username: newUser.username,
                        firstname: newUser.firstname,
                        lastname: newUser.lastname,
                        role: newUser.role

                       }, secret, {expiresIn : expiry}, (err, token) =>{
                           if(err) {
                               return res.status(500).json({err})
                           }
                           return res.status(200).json({message: "user registration successful", token});
                       })
                   })
               })
           })

        })
})
//check username exist
//create new user
//hash pw
//save pw to db
}

exports.loginUser = (req, res) => {
    User.findOne({username : req.body.username}, (err, foundUser) => {
     if(err){
         return res.status(500).json({err})
     }
     if(!foundUser){
         return res.status(401).json({message: "incorrect username"})
     }
    let match = bcrypt.compareSync(req.body.password, foundUser.password);
    if(!match) {
        return res.status(200).json({message: "no match"})
    }

    jwt.sign({

        id : foundUser_id,
        username : foundUser.username,
        lastname : foundUser.lastname,
        firstname : foundUser.firstname,
        role: foundUser.role,
    }, secret ,{
        expiresIn : expiry
    }, (err, token) => {
        if(err) {
            return res.status(500).json({err})
        } else {
            return res.status(200).json({message : "user login", token})
        }
    })
    })
}