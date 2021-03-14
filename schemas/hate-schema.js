const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const hateSchema = mongoose.Schema(
    {
      userId: reqString,
      targetId: reqString,
      hate: reqString,
    })
module.exports = mongoose.model('hate', hateSchema)