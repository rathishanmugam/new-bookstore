const book = require('../../models/book')
const mongoose = require('mongoose')

// Get all book from database
module.exports = function (router) {
    router.get('/book', function (req, res) {
        // console.log("book id|:" +book)

        book.find().exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'Error finding book',
                    error: err
                }))
    })

    // get specific book from database
    router.get('/book/:id', function (req, res) {
        // console.log("book:"+book)
        console.log(req.params.id)
        book.findById(req.params.id).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'Error finding BOOK',
                    error: err
                }))
    })

    // Create new book document...
    router.post('/book', function (req, res) {
        let Book = new book(req.body)
        console.log('book body included:' , req.body)

        Book.save(function (err, book) {
            if (err) return console.log(err)
            res.status(200).json(book)
          console.log('the adding record is :', res)

        })
    })
    // Update book document...
    router.put('/book/:id', function (req, res) {
      console.log('iam in')
        console.log('the updating full record is ' , req.body)
        let qry = {_id: req.params.id}
        let doc = {
            bookID:req.body.bookID,
            title: req.body.title,
            author: req.body.author,
            publicationYear: req.body.publicationYear,
        }
        console.log('the here iam updating record is :', doc)
        book.updateOne(qry, doc, function (err, respRaw) {
            if (err) return console.log(err)
            res.status(200).json(respRaw)
          // console.log('the updatE record is :', res)

        })
    })

    // delete BOOK from database
    router.delete('/book/:id', function (req, res) {
        console.log(req.body)
        let qry = {_id: req.params.id}
        book.remove(qry, function (err, respRaw) {
            if (err) return console.log(err)
            res.status(200).json(respRaw)
        })
    })
}
