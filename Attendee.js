const mongoose = require("mongoose");

const User= mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
   lastname: {
    type: String,
    required: true
  },
   email: {
    type: String,
    required: true
  },
   telephone: {
    type: String,
    required: true
  }

});
const Attendee = mongoose.model("attendees", User);

module.exports = Attendee;