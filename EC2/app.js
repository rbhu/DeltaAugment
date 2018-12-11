// 7z a eb1.5.36.zip * -r -x!*.zip -x!fluff -x!test.jpg
// Include the cluster module
var cluster = require('cluster');
// Code to run if we're in the master process
if (cluster.isMaster) {
    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;
    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    // Listen for terminating workers
    cluster.on('exit', function (worker) {
        // Replace the terminated workers
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();
    });



// Code to run if we're in a worker process
} else {
    // STANDARD STUFF
    var AWS = require('aws-sdk');
    var express = require('express');
    var util   = require('util');
    AWS.config.region = process.env.REGION
    var snsTopic =  process.env.NEW_SIGNUP_TOPIC;
    var fs = require('fs');


    // FILE UPLOAD STUFF
    var multer = require('multer');
    var multerS3 = require('multer-s3');

    // GOD KNOWS WHAT
    var bodyParser = require('body-parser');
    var fileUp     = require('express-fileupload');
    var busBoy     = require('express-busboy');
    var bb         = require('busboy');


    var app = express();

    AWS.config.update({
        secretAccessKey: process.env.SECRETACCESSKEY,
        accessKeyID: process.env.ACCESSKEYID,
        region: 'eu-west-2'
    });

    var s3 = new AWS.S3();

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    // app.use(bodyParser.urlencoded({extended:false}));
    // app.use(bodyParser.json());
    app.use(fileUp());

    // busBoy.extend(app);
    // busBoy.extend(app, {
    //     upload: true,
    //     path: './upload',
    //     allowedPath: /./
    // });

    // app.use(multer({dest:'uploads/'}).single('image'));
    // app.use(multer({dest:'.'}).single('file'));

    app.get('/', function(req, res) {
        res.render('index', {
            static_path: 'static',
            theme: process.env.THEME || 'flatly',
            flask_debug: process.env.FLASK_DEBUG || 'false'
        });
    });

    const upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: 'test-image-iwan',
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            metadata: function (req, file, cb) {
                cb(null, {fieldName: file.fieldname});
            },
            key: function (req, file, cb) {
                console.log(file);
                console.log("ASDF");
                // cb(null, Date.now().toString())
                cb(null, file.originalname);
            }
        })
    })


    const singleUpload = upload.single('image');

    // app.post('/signup', upload.array('image', 1), function(req, res, next) {
    //     console.log("CHRISSSTMASSS5");
    //     res.send("Uploaded!");
    // });

    // app.post('/signup', function(req, res) {
    //     var path = require('path');
    //     var fs = require('fs');
    //
    //     var busboy = new bb({ headers: req.headers });
    //     busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    //         var saveTo = path.join('.', filename);
    //         console.log('Uploading: ' + saveTo);
    //         file.pipe(fs.createWriteStream(saveTo));
    //     });
    //     busboy.on('finish', function() {
    //         console.log('Upload complete');
    //         res.writeHead(200, { 'Connection': 'close' });
    //         res.end("That's all folks!");
    //     });
    //     return req.pipe(busboy);
    //
    //     console.log("CHRISSSTMASSS5");
    //     // res.send("Uploaded!");
    // });

    app.post('/signup', function(req, res) {
        console.log("CHRISTMAS8");
        console.log(require('util').inspect(req.files, { depth: null }));

        // IMPORTANT INFO
        // Using express-fileupload, req.files.<FORM NAME>.data is the buffer
        // For us, that means req.files.image.data is the image data

        var img = req.files.image;

        fs.writeFile(__dirname + '/tmp/immm.jpg', img.data, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved999!");
        });



        img.mv(__dirname + '/tmp/immm.jpg', function(err) {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            return res.json({'woohoo':'File uploaded!'});
        });

        // singleUpload(req, res, function(err) {
        //     if (err) { return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] }); }
        //     return res.json({'imageUrl': req.file.filename});
        // });

    });

    var port = process.env.PORT || 3000;

    var server = app.listen(port, function () {
        console.log('Server running at http://127.0.0.1:' + port + '/');
    });
}
