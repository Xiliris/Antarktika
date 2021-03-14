const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}

const muteSchema = mongoose.Schema({

    _id: reqString,
    userId: reqString,
    muted: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('mute', muteSchema)