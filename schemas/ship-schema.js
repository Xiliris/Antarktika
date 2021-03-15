const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const shipSchema = mongoose.Schema(
    {
      userId: reqString,
      targetId: reqString,
      love: reqString,
    })
module.exports = mongoose.model('ship', shipSchema)