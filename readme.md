# Delta Augment - Online Image Augmentation Tool

# Project Structure
### Angular
Angular project source code, this created our front-end. When building the angular project using ```ng build --prod```, we store the static assets created in ```Angular/dist/Angular``` in a public S3 bucket. Copy the file ```Angular/dist/Angular/index.html``` to ```EC2/public/``` and modify the ```src``` and ```href``` attributes contained within it to point at the public facing S3 bucket (in our case, ```irw-files```).

### EC2
Contains the Node server code. On the production EC2 instance, this directory must also include ```config_dynamo.json``` and ```config_s3.json```files containing the IAM secret auth keys (granting the node server permission to perform IO on AWS services.

### Lambda
Python code for the AWS Lambda that performs our augmentation. Requires the correct .zip to function correctly (bundling all python dependencies and install scripts).


### Load
Incomplete load-testing tool, aimed to perform rapid requests to the ```/upload``` endpoint. Work in progress.
