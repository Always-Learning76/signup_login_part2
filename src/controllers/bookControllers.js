const Book = require('../models/book.js')

exports.createNewBook = function(req, res){
        // retrieve a new bookdetails from req.body
        
        Book.create({
        ...req.body
        }, 
        (err, newBook) => {
            if(err) { 
            return res.status(500).json({ message: err })
        } else {
            return res.status(200).json({message: "new book created", newBook})
        }
        })
}

exports.fetchBooks = (req, res) => {
    let conditions = {}
    if(req.query.category) {
        conditions.category = req.query.category
    }
    if(req.query.author) {
        conditions.author = req.query.author
    }
    //check query filters
    console.log(req.query)
    //fetch all books
    Book.find(conditions, (err, books) => {
        if(err) {
            return res.status(500).json({message: err})
        } else {
            return res.status(200).json({books})
        }
    })
}


exports.singleBook = (req, res) => {
    Book.findOne({_id: req.params.id}, (err, book) => {
        if(err) {
            return res.status(500).json({message: err})
        } else {
            return res.status(200).json({book})
        }
    })
}

exports.updateSingleBook = (req, res) => {
    Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        category: req.body.category
    }, (err, book) => {
        if(err){
            return res.status(500).json({message: err})
        } else if(!book) {
            return res.status(404).json({message: "book not found"})
        } else {
            book.save((err, savedBook)=> {
                if(err) {
                    return res.status(400).json({message: err})
                } else {
                    return res.status(200).json( {message: "book updated successfully"})
                }
            })
        }
    })

}

exports.delete = (req, res) =>{
    Book.findByIdAndDelete(req.params.id, (err, book) => {
        if(err){
            return res.status(500).json({message: err})
        }
        else if(!book) {
            return res.status(404).json({message: 'book not found'})
        }
        else {
            return res.status(200).json({message: 'book deleted'})
        }
    })
}

