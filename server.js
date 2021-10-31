//importing express module

var express = require('express')


var bodyParser = require('body-parser')
var app = express()

//Serving a static file (index.html)
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var messages = [
    {name:'Fahim', message: 'This is Fahim'},
    {name:'Surayez', message: 'This is Surayez'},

]

//Setting up a route to show the messages
app.get('/messages', (req, res) => {
    res.send(messages)
})


app.post('/messages', (req, res) => {
    messages.push(req.body)
    res.sendStatus(200)
})
//Creating a localhost port
var server = app.listen(3000, ()=> {
    console.log('Server is listening to port ', server.address().port)
})