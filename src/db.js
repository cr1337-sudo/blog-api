const mongoose = require("mongoose");
const mongo_uri = `mongodb+srv://cr1337:homerojs123@databases.wjmpl.mongodb.net/Blog-DB?retryWrites=true&w=majority`


module.exports = mongoose.connect(mongo_uri, {
   useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
}, () => {
   console.log("Connected DB")
})

