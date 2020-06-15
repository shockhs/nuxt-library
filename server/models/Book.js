const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    isbn: {
        type: String,
        required: true,
        max: 13,
        min: 10
    },
    title: {
        type: String,
        required: true,
        max: 255
    },
    author: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    numberOfCopies: {
        type: Number,
        min:1
    },
    imageUrl: {
        type: String,
    },
    numberOfCopies: {
        type: Number,
        min:1
    },
    stock: {
        type:Number
    },
    status: {
        type: String,
        enum: ['available', 'unavailable']
    }
})

module.exports = mongoose.model('Book', bookSchema)