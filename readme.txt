DynamoDB and Node
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.01.html?shortFooter=true

S3 AWS SDK docs for objects
https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property

Node S3 photo album
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photo-album.html?shortFooter=true

Node EC2 best practises
https://stackoverflow.com/questions/16573668/best-practices-when-running-node-js-with-port-80-ubuntu-linode

Setting up Node on EC2
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html


1) Submit image and form data
2) Validate form data (tags, num of augs etc)
3) Get UID
4) Query DynamoDB if UID exists
4.1)    If exists, return error
4.2)    If not, continue with upload
5) Upload image to S3
6) Augmented using Lambda
7) Get resultant URLs from AugOut Bucket
8) New DynamoDB entry w/ UID, tags, original S3 URL, augmented URLs
9) Return success to user, user page refreshes
