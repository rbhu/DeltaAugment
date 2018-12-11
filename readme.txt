Giving up on EB, can't seem to get file handing working correctly. Tried using:
- Multer and MulterS3
    This was meant to let us upload the file directly from the user request
    (req) to S3, didn't seem to work. Confirmed that the file (or at least the
    form) was reaching the server since I could access the meta data, but the
    S3 step didn't seem to work. Checked the AWS.config() stuff for access keys,
    strangely didn't even throw an error if I pointed it at a non-existent
    bucket OR gave it wrong access keys.

- BusBoy and express-busboy
    For just uploading the file itself, couldn't get it working nicely, req
    always ended up with empty files{} object, even after setting the config to
    allow file uploads.

- express-fileupload
    Made the best progress here. Confirmed that the file data (binary) itself
    was actually reaching the server, as the file had a massive hex object
    attached to it. Problem here was saving the file somewhere temporary on EB
    such as /tmp, to upload to S3 _after_ saving the file temporarily. Could try
    exploring this further. Even though I couldn't find /tmp on S3, maybe if EB
    just reads the file itself then it'll be able to locate it?

Next steps: Run VM with a Node server on an EC2 instance.

Use ```7z a eb1.X.X.zip * -r -x!*.zip -x!fluff -x!test.jpg``` to zip for EB

Useful links:
- The guide that made me assume this was possible in the first place
https://medium.freecodecamp.org/how-to-set-up-simple-image-upload-with-node-and-aws-s3-84e609248792

- Guide for using MulterS3 and Node to upload directly, links to handy repo
https://stackoverflow.com/questions/40494050/uploading-image-to-amazon-s3-using-multer-s3-nodejs

- AWS JavaScript SDK docs, especially for S3
https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html

- Adding files to an S3 bucket from JS directly (in browser)
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photo-album.html

- Problems with Multer, confusion re: req.files / req.file, .location / .filename
https://stackoverflow.com/questions/31530200/node-multer-unexpected-field

- Discussion on /tmp in EB, problems with perms and .ebextensions
https://stackoverflow.com/questions/27980478/how-can-i-create-a-tmp-directory-with-elastic-beanstalk

- express-fileupload docs, handy to have
https://www.npmjs.com/package/express-fileupload
