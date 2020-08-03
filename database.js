const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/localGuide', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("DATA BASE CONNECTED");
});
module.exports = db;