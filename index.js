var express = require('express');
const app = express();
var http = require('http');
var server = http.createServer(app);
var bodyParser = require('body-parser');
app.use(express.static('public'));
const path = require('path');
const mongoose = require('mongoose');

const Pixel = require('./models/pixels.js');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://root:<password>@cluster0-ydxlx.mongodb.net/<dbname>?retryWrites=true&w=majority',{useUnifiedTopology: true, useNewUrlParser: true});

const db = mongoose.connection;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
  })

app.get('/pixel', function (req, res) {
  res.sendFile(path.join(__dirname+'/pixel-table.html'));
})


app.post('/api', function (req, res) {
  var input = req.body.text;
  var inputArr = input.split(',');
  let pixel = new Pixel();
  pixel.row = inputArr[0];
  pixel.column =inputArr[1];
  pixel.color = inputArr[2];
  pixel.save();
  res.set('Content-Type', 'application/json');
  return res.status(201).json(req.body)
    });

app.get('/api', function (req, res) {

  Pixel.find({}, function(err, docs) {
    if (!err) { 
        console.log(docs);

        return res.status(201).json(docs)
    }
    else {
        throw err;
    }
  });


  })


server.listen('3000', () => {
    console.log('Server listening on Port 3000');
  })