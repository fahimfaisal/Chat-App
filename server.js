//importing express module
var express = require('express')
var app = express()

//Serving a static file (index.html)
app.use(express.static(__dirname))

var messages = [
    {name:'Fahim', message: 'This is Fahim'},
    {name:'Surayez', message: 'This is Surayez'},

]

//Setting up a route to show the messages
app.get('/messages', (req, res) => {
    res.send(messages)
})

//Creating a localhost port
var server = app.listen(3000, ()=> {
    console.log('Server is listening to port ', server.address().port)
})