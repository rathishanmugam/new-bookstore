const express = require('express')
const router = express.Router()

require('./routes/book')(router)
 require('./routes/reader')(router)

module.exports = router
