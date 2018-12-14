
// STANDARD STUFF
var AWS = require('aws-sdk');
var express = require('express');
var util   = require('util');
var fs = require('fs');
var path = require('path');


// FILE UPLOAD STUFF
var multer = require('multer');
var multerS3 = require('multer-s3');

// GOD KNOWS WHAT
var bodyParser = require('body-parser');
var fileUp     = require('express-fileupload');
// var busBoy     = require('express-busboy');
// var bb         = require('busboy');


var app = express();

var staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath));


app.use(fileUp());

AWS.config.loadFromPath('./config.json');


// app.use(multer({dest:'uploads/'}).single('image'));
// app.use(multer({dest:'.'}).single('file'));


var moveToS3 = function (filename, uid, augNum) {
    fs.readFile(filename, function (err, data) {
        var s3 = new AWS.S3();
        if (err) { throw err; }

        var base64data = new Buffer(data, 'binary');

        var params = {
            Body: base64data,
            // Bucket: "image-test-iwan",
            Bucket: "img-bucket-irw",
            Key: `${uid}.jpg`,
            ACL: "public-read",
            Metadata: {
                "num-of-augments": augNum
            }
        };
        s3.putObject(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
            /*
            data = {
            ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"",
            VersionId: "Bvq0EDKxOcXLJXNo_Lkz37eM3R4pfzyQ"
            }
            */
        });
    });
    return;
};




app.get("/", function(req, res) {
    res.sendFile("/public/");
});


app.post('/upload', function(req, res) {
    console.log("CHRISTMAS8");
    console.log(require('util').inspect(req.files, { depth: null }));

    console.log(require('util').inspect(req.body, { depth: null }));

    // IMPORTANT INFO
    // Using express-fileupload, req.files.<FORM NAME>.data is the buffer
    // For us, that means req.files.image.data is the image data

    var tags   = req.body.tags;
    var uid    = req.body.uid;
    var imgObj = req.files.image;
    var augNum = req.body.number;
    var now    = Date.now();

    var filename = __dirname + `/tmp/${now}-${uid}.jpg`

    imgObj.mv(filename, function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        moveToS3(filename, uid, augNum);
        return res.json({'comment':'File uploaded!'});
    });
});

var port = process.env.PORT || 80;

var server = app.listen(port, function () {
    console.log('Server running at http://127.0.0.1:' + port + '/');
});
