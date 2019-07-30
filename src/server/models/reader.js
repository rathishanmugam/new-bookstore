const mongoose = require('mongoose')
const Schema = mongoose.Schema

let readerSchema = new Schema({
        readerID: {type: Number,required: true},
        name: {type: String,required: true},
        weeklyReadingGoal: {type: Number,required: true},
        totalMinutesRead: {type: Number,required: true},
    },
    {
        collection: 'reader'
    })

const reader = mongoose.model('Reader', readerSchema)

module.exports = reader
