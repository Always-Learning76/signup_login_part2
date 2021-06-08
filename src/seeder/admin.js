//check if there is an admin acct
//if there isnt an admin account create one

const User = require('../models/user')
const bcrypt = require("bcrypt")
const password = "hiddentruth"

exports.seedAdmin = () => {
    User.findOne({role : "admin"}, (err, admin) => {
        if(err) throw err
        if(admin) {
            return "admin exist"
        } 
        User.create({
            firstName: "Book",
            lastName: "Goblin",
            username : "bookGoblin",
            role: "admin",
        }, (err, user) => {
            if(err) throw err
            bcrypt.genSalt(10, (err, salt) => {
                if(err) throw err
                bcrypt.hash(password, salt, (err, hash) =>{
                    if(err) throw err
                    user.password = hash,
                    user.save((err, savedUser) => {
                       if(err) throw err
                       return "admin created"
                    })
                })
            })
        })
    })
}