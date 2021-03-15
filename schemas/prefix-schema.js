const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const prefixSchema = mongoose.Schema({

    _id: reqString,
    prefix: {
        type: String,
        required: true,
        default: '!'
    }

})


module.exports = mongoose.model('guild-prefix', prefixSchema)