const express = require('express')
const app = express()
const api = require('./api')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
var path = require('path');

app.set('port', (process.env.PORT || 8080))
app.use('/', express.static(__dirname + '/../../dist/bookstore'));
app.use('/', express.static(__dirname + '/../bookstore/public'));
app.use('/', express.static(__dirname + '/../dist/bookstore/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(cors())
app.use('/api', api)
// app.use(express.static('static'))

app.use(morgan('dev'))
// app.use((err, req, res, next) => {
//   if (err instanceof SyntaxError) return res.status(400).send(JSON.stringify({
//     error: "Invalid JSON"
//   }))
//   console.error(err);
//   res.status(500).send();
// });

app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  res.json(err)
})

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/bookstore',{ useNewUrlParser: true });
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Connected to MongoDB')
  // all other routes are handled by Angular
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/../../dist/bookstore/index.html'));
  });
  app.listen(app.get('port'), function () {
    console.log('API Server Listening on port ' + app.get('port') + '!')
  })
})
module.exports = app;
