var AWS = require('aws-sdk');
var fs = require('fs');

const BUCKETNAME = process.env.BUCKETNAME || "image-test-iwan";

async function moveToS3(filename, uid, augNum) {
    fs.readFile(filename, function (err, data) {
        AWS.config.loadFromPath('./config_s3.json');

        var s3 = new AWS.S3();
        if (err) { throw err; }

        var base64data = new Buffer(data, 'binary');

        var params = {
            Body: base64data,
            // Bucket: BUCKETNAME,
            Bucket: "img-bucket-irw",
            Key: `${uid}.jpg`,
            ACL: "public-read",
            Metadata: {
                "num-of-augments": augNum
            }
        };
        s3.putObject(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
                return 1;
            }
            else {
                console.log(data);
                return 0;
            }
            /*
            data = {
            ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"",
            VersionId: "Bvq0EDKxOcXLJXNo_Lkz37eM3R4pfzyQ"
            }
            */
        });
    });
};

  function listS3files() {
    AWS.config.loadFromPath('./config_s3.json');

    return new Promise((resolve, reject) => {
        let s3 = new AWS.S3();
        var params = {
            Bucket: "img-bucket-irw",
        };
        s3.listObjects(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
                reject(err);
            }
            else {
                console.log("app_s3.js...");
                console.log(`Data from S3 ${data}`);
                resolve((data));
            }

        });

    });

}


module.exports.moveToS3 = moveToS3;
module.exports.listS3files = listS3files;
