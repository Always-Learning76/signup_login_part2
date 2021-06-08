const express = require("express");
const app = express() 
const port = 8000
const dbSetup = require("./database/setup.js")
const authRoutes = require("./routes/authRoutes")

const {seedAdmin} = require("./seeder/admin")
app.use(express.json())
//SetUp db
dbSetup()

//SetUp Schemas
const Book = require("./models/book")
const bookRoutes = require("./routes/bookRoutes.js")


app.use(bookRoutes)
app.use(authRoutes)

app.listen(port, ()=> console.log('App is listen on server'))