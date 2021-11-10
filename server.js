//importing express module

var express = require('express')
var mongoose = require('mongoose')

var bodyParser = require('body-parser')
const { Socket } = require('socket.io')
var app = express()

var http = require('http').Server(app)
var io = require('socket.io')(http)

//Serving a static file (index.html)
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var dbUrl = 'mongodb+srv://user:1234@learning-node.pn6o5.mongodb.net/learning-node?retryWrites=true&w=majority'

var Message = mongoose.model('Message',{
    name: String,
    message: String
})

var messages = [
    {name:'Fahim', message: 'This is Fahim'},
    {name:'Surayez', message: 'This is Surayez'},

]

//Setting up a route to show the messages
app.get('/messages', (req, res) => {
    Message.find({},(err,messages)=>{
        res.send(messages)
    })
    
})


app.post('/messages', (req, res) => {
    var message = new Message(req.body)

    message.save((err)=>{
        if(err)
            sendStatus(500)
        messages.push(req.body)
        io.emit('message', req.body)
        res.sendStatus(200)
    })

  
})

io.on('connection', (socket) =>{
    console.log('a user connected')
} )

mongoose.connect(dbUrl, (err)=>{
    console.log('mongodb connection',err)
})
//Creating a localhost port
var server = http.listen(3000, ()=> {
    console.log('Server is listening to port ', server.address().port)
})