const { Schema, model } = require("mongoose");

const postSchema = new Schema({
   title: {
      type: String,
      required: true,
      unique: true
   },
   desc: {
      type: String,
      required: true,
      unique: true
   },
   photo: {
      tpye: String,
      required: false
   },
   username: {
      type: String,
      required: true
   },
   categories: {
      type: Array,
      required: false
   }
}, {
   timestamps: true
})

module.exports = model("Post", postSchema)