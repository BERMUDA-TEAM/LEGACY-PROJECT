const mongoose = require('mongoose')

//declaration of guide schema
let guideSchema = new mongoose.Schema({
    name: String,
    description: String,
    age: Number,
    gender: String,
    languages: [String],
    city: String,
    // img: { type: String },
    phone: Number,
    email: String
})

const Guide = new mongoose.model('Guide', guideSchema)
module.exports = Guide