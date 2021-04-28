const express = require('express')
const dotenv = require('dotenv')
const cors = require("cors");
const mongoose = require("mongoose");
const slugify = require("slugify");
const {registerValidation, SpeakerValidation, EmailValidation} = require("./Validation.js")
const Attendee = require("./Attendee.js")
const Newsletter = require("./Newsletter.js")
const { ErrorHandler, HandleError } = require("./Error.js");
const Speaker = require('./Speaker.js');

const app = express()
dotenv.config()

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({
    message: err.message,
    status: "error",
    data: null
  })
});
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_REMOTE, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) throw err;
  console.log("Connected to database");
});



app.post("/register", async(req, res, next)=>{
	try {
		const data = req.body
	const {error} = registerValidation(data, { abortEarly: true })
	if(error) throw new ErrorHandler(5000, "Invalid data entered")

	const attendee = await Attendee.create(data)

    res.status(200).json({
      status: "sucessful",
      message: "Registration submitted sucessfully",
      data: attendee
    })
	} catch (error) {
		next(new ErrorHandler(error.status || 500, error.message))
	}
})

app.post("/subscribe", async(req, res, next)=>{
	try {
		const data = req.body
	const {error} = EmailValidation(data, { abortEarly: true })
	if(error) throw new ErrorHandler(5000, "Invalid data entered")

	const Subscriber = await Newsletter.create(data)

    res.status(200).json({
      status: "sucessful",
      message: "Email submitted sucessfully",
      data: Subscriber
    })
	} catch (error) {
		next(new ErrorHandler(error.status || 500, error.message))
	}
})
app.post("/speakers", async(req, res, next)=>{
	try {
		const data = req.body
	const {error} = SpeakerValidation(data, { abortEarly: true })
	if(error) throw new ErrorHandler(5000, "Invalid data entered")

		const {fullname,profile,image} = data
		const speaker = {fullname,profile,image,slug: slugify(fullname)}
	const teacher = await Speaker.create(speaker)

    res.status(200).json({
      status: "sucessful",
      message: "data submitted sucessfully",
      data: teacher
    })
	} catch (error) {
		next(new ErrorHandler(error.status || 500, error.message))
	}
})


app.get("/speakers", async(req, res, next)=>{
	try {

	
	const speaker = await Speaker.find()

    res.status(200).json({
      status: "sucessful",
      message: "sucess",
      data: speaker
    })
	} catch (error) {
		next(new HandleError(error.status || 500, error.message))
	}
})
const PORT  = process.env.PORT || 5000
app.listen(PORT, ()=>{
	console.log("server started at 5000")
})
