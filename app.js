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
    var AWS = require('aws-sdk');
    var express = require('express');
    var bodyParser = require('body-parser');

    AWS.config.region = process.env.REGION

    const multer = require("multer");
    const multer-s3 = require("multer-s3");

    var sns  = new AWS.SNS();
    var ddb  = new AWS.DynamoDB();

    var ddbTable =  process.env.STARTUP_SIGNUP_TABLE;
    var snsTopic =  process.env.NEW_SIGNUP_TOPIC;
    var app = express();


    AWS.config.update({
        secretAccessKey: process.env.SECRETACCESSKEY,
        accessKeyID: process.env.ACCESSKEYID,
        region: process.env.REGION
    });

    const s3 = new AWS.S3();

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.use(bodyParser.urlencoded({extended:false}));

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
            bucket: 'elasticbeanstalk-eu-west-2-749144655446',
            acl: 'public-read',
            metadata: function (req, file, cb) {
                cb(null, {fieldName: file.fieldname});
            },
            key: function (req, file, cb) {
                cb(null, Date.now().toString())
            }
        })
    })

    // module.exports = upload;


    const singleUpload = upload.single('image');

    app.post('/signup', function(req, res) {

        singleUpload(req, res, function(err, some) {
            if (err) {
                return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
            }

            return res.json({'imageUrl': req.file.location});
        });

        var item = {
            'email': {'S': req.body.email},
            'tag': {'S': req.body.tag},
            'theme': {'S': req.body.theme}
            // 'image': {'O': reg.body.image}
        };

        ddb.putItem({
            'TableName': ddbTable,
            'Item': item,
            'Expected': { email: { Exists: false } }
        }, function(err, data) {
            if (err) {
                var returnStatus = 500;

                if (err.code === 'ConditionalCheckFailedException') {
                    returnStatus = 409;
                }

                res.status(returnStatus).end();
                console.log('DDB Error: ' + err);
            } else {
                sns.publish({
                    'Message': 'Image Tag: ' + req.body.tag + "\r\nEmail: " + req.body.email,
                    'Subject': 'New user sign up!!!',
                    'TopicArn': snsTopic
                }, function(err, data) {
                    if (err) {
                        res.status(500).end();
                        console.log('SNS Error: ' + err);
                    } else {
                        res.status(201).end();
                    }
                });
            }
        });
    });

    var port = process.env.PORT || 3000;

    var server = app.listen(port, function () {
        console.log('Server running at http://127.0.0.1:' + port + '/');
    });
}
