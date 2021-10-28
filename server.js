//importing express module
var express = require('express')
var app = express()

//Serving a static file (index.html)
app.use(express.static(__dirname))

//Creating a localhost port
var server = app.listen(3000, ()=> {
    console.log('Server is listening to port ', server.address().port)
})