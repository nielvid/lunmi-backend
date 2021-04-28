const mongoose = require("mongoose");

const User= mongoose.Schema({
 
   email: {
    type: String,
    required: true
  }
  

});
const Subsciber = mongoose.model("subsciber", User);

module.exports = Subsciber;