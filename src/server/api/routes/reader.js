const reader = require('../../models/reader')
const mongoose = require('mongoose')

// Get all reader from database
module.exports = function (router) {
    router.get('/reader', function (req, res) {
        // console.log("reader id|:" +reader)

        reader.find().exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'Error finding reader',
                    error: err
                }))
    })

    // get specific reader from database
    router.get('/reader/:id', function (req, res) {
        console.log("READER:"+reader)
        console.log(req.params.id)
        reader.findById(req.params.id).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'Error finding READER',
                    error: err
                }))
    })

    // Create new reader document...
    router.post('/reader', function (req, res) {
        let Reader = new reader(req.body)
        console.log('reader body included:' , req.body)

        Reader.save(function (err, reader) {
            if (err) return console.log(err)
            res.status(200).json(reader)
        })
    })
    // Update reader document...
    router.put('/reader/:id', function (req, res) {
        console.log('the updating full record is ' , req.body)
        let qry = {_id: req.params.id}
        let doc = {
            readerID:req.body.readerID,
            name: req.body.name,
            weeklyReadingGoal: req.body.weeklyReadingGoal,
            totalMinutesRead: req.body.totalMinutesRead,
        }
        console.log('the here iam updating record is :', doc)
        reader.updateOne(qry, doc, function (err, respRaw) {
            if (err) return console.log(err)
            res.status(200).json(respRaw)
        })
    })

    // delete reader from database
    router.delete('/reader/:id', function (req, res) {
        console.log(req.body)
        let qry = {_id: req.params.id}
        reader.remove(qry, function (err, respRaw) {
            if (err) return console.log(err)
            res.status(200).json(respRaw)
        })
    })
}
