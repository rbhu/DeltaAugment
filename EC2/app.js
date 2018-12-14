
// STANDARD STUFF
var express = require('express');
var util   = require('util');
var fs = require('fs');
var path = require('path');

var xS3     = require('./app_s3.js');
var xDynamo = require('./app_dynamo.js');


// FILE UPLOAD STUFF
var multer = require('multer');
var multerS3 = require('multer-s3');

// GOD KNOWS WHAT
var bodyParser = require('body-parser');
var fileUp     = require('express-fileupload');

var app = express();

var staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath));


app.use(fileUp());


app.get("/", function(req, res) {
    res.sendFile("/public/");
});


app.post('/upload', function(req, res) {
    console.log(require('util').inspect(req.files, { depth: null }));
    console.log(require('util').inspect(req.body, { depth: null }));

    // IMPORTANT INFO
    // Using express-fileupload, req.files.<FORM NAME>.data is the buffer
    // For us, that means req.files.image.data is the image data


    // Need to validate everything here
    var tags   = req.body.tags;
    var uid    = req.body.uid;
    var imgObj = req.files.image;
    var augNum = req.body.number;
    var now    = Date.now();

    var filename = __dirname + `/tmp/${now}-${uid}.jpg`

    imgObj.mv(filename, async function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        var uniqueItem = await xDynamo.checkDuplicate(uid);
        console.log(`Unique UID: ${uniqueItem}`);
        if (uniqueItem === false)  return res.json({'comment': 'UID was duplicate!'});


        var addedItemDynamo = await xDynamo.addDynamoEntry(uid, tags, "http://google.com", augNum);
        console.log(`Put entry in Dynamo: ${addedItemDynamo}`);
        if (addedItemDynamo === false)  return res.json({'comment':'Failed to add DynamoDB entry, see sys logs'});


        var addedItemS3 = await xS3.moveToS3(filename, uid, augNum);
        return res.json({'comment':'File uploaded!'});

    });
});

var port = process.env.PORT || 80;

var server = app.listen(port, function () {
    console.log('Server running at http://127.0.0.1:' + port + '/');
});
