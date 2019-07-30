const mongoose = require('mongoose')
const Schema = mongoose.Schema

let bookSchema = new Schema({
        bookID: {type: Number,required: true},
        title: {type: String,required: true},
        author: {type: String,required: true},
        publicationYear: {type: Number,required: true}
    },
    {
        collection: 'book'
    })

const book = mongoose.model('Book', bookSchema)

module.exports = book
