var express = require("express");
var multer = require('multer');
var uuid = require('uuid');
var bodyParser = require('body-parser');
var circularJSON = require('circular-json')
import {XlslParser} from './scripts/xlsxParser.js';

var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        //     callback(null, file.fieldname + '-' + Date.now());
        callback(null, file.fieldname + '-' + uuid.v1()); // setting the name to a time-based guid
    }
});
var upload = multer({ storage: storage }).single('bankingData');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/api/uploadData', function (req, res) {

    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file. Error: " + err);
        }
        //console.log(circularJSON.stringify(res));
        var fileName = res.socket.parser.incoming.file.filename;
        var resp = { responseMessage: "File is uploaded", response: fileName };
        res.end(JSON.stringify(resp));
    });
});

app.get('/api/getData', function (req, res) {
    console.log('--- get /api/getData ');
    var bankDataId = req.query.dataId;
    var xlsxObj = new XlslParser('/../uploads/'+bankDataId);
    res.end(JSON.stringify(xlsxObj));
});

app.listen(3000, function () {
    console.log("Working on port 3000");
});