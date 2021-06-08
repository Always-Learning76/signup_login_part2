const express = require('express');
const router = express.Router()
const BookCtrl = require('../controllers/bookControllers.js')
const {authenticateUser, checkIfAdmin} = require('../middleware/authentication')


router.post('/books', BookCtrl.createNewBook)
    // retrieve a new bookdetails from req.body

//GET request to /books fetch all books
router.get('/books',authenticateUser, BookCtrl.fetchBooks) 
//GET request to /books/:id to fetch specific/single books

     router.get('/books/:id',authenticateUser, BookCtrl.singleBook)
   
    router.put('/books/:id', authenticateUser, BookCtrl.updateSingleBook) 

    router.delete('/books/:id', authenticateUser, BookCtrl.delete) 

    module.exports = router