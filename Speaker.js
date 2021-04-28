const mongoose = require("mongoose");

const Person= mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  profile: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  slug: {
    type: String,
    unique: true
  }

});
const Speaker = mongoose.model("speakers", Person);

module.exports = Speaker;