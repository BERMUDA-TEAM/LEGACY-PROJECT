const mongoose = require('mongoose')

//declaration of guide schema
let fileSchema = new mongoose.Schema({
    file: String
})

const File = new mongoose.model('File', fileSchema)
module.exports = File