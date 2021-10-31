//importing express module

var express = require('express')


var bodyParser = require('body-parser')
const { Socket } = require('socket.io')
var app = express()

var http = require('http').Server(app)
var io = require('socket.io')(http)

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
    io.emit('message', req.body)
    res.sendStatus(200)
})

io.on('connection', (socket) =>{
    console.log('a user connected')
} )
//Creating a localhost port
var server = http.listen(3000, ()=> {
    console.log('Server is listening to port ', server.address().port)
})