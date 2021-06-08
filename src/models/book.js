const mongoose = require('mongoose')


//Create Schema
const bookSchema = new mongoose.Schema({
    title: {type: String,
            required: true
        },
    cost: {type: Number,
           author: String
        },
        author: {type: String},
    category: {
               type: String,
               enum: ["business", "casual", "party", "general"],
            },
    purchaseCount: Number,
    imageUrl: String,
    description: String,
    tags: Array
})

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;