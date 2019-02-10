# Delta Augment - Online Image Augmentation Tool
Delta Augment is a web-based service for augmenting images. It can be used for the purpose of artificially increasing the size of a dataset. This is useful as data collection can be time-consuming and an expensive bottleneck in ML tasks. The focus of this coursework was building a scalable cloud-based service, so aside from the website implementation itself a lot of thought went into the AWS architecture.


## Architecture
<img src="https://github.com/IwanCole/DeltaAugment/blob/master/readmeImages/arch.png" width="650">
This may seem a bit overkill, but we wanted to learn as much about as many AWS components as possible while doing this course. *See report.pdf for a full writeup of our implementation*. Our implementation used:
- **EC2** - Standard Linux AMI running a NodeJS server. The main endpoints of our application are `/upload` and `/getimagelist`. When an image is uploaded, Node performs all the validation on the data submitted by the user. This includes querying our Dynamo table for duplicate UIDs and checking file sizes. IAM keys stored on the EC2 instances are used for authentication when Node interfaces with Dynamo and S3.
- **DynamoDB** - We have a single Dynamo table storing information about uploaded images. We store the Unique ID, associated tags, and original URL of images uploaded. While the current implementation only uses DynamoDB for preventing UID duplicates, we planned on using the stored tags to implement search functionality into the service.
- **Lambda** - The augmentation of the images is done using a Lambda function. Augmenting the images is the most computationally expensive part of our service, and Lambda's elastic scaling was ideal. The Lambda is triggered when a new image is uploaded into our input S3 bucket, and `AMZ-metadata` flag is used to specify how many augmentations are performed. Currently the Lambda randomly selects a number of basic operations (cropping, zoom, rotation) to perform on the image. We planned on adding functionality to allow users to select which operations to perform, however we didn't have enough time.
- **S3** - We use S3 to store the input images, the output zips, and static files (such as stylesheets and scripts). The Node server only serves the initial 1KB index.html file, which then references S3 buckets to retrieve all the other assets needed to display the web page. This massively reduced the bandwidth IO to EC2 and the time taken for Node to complete a request. Shifting the load from EC2 to S3 freed up compute time for our EC2 instances to perform the non-trivial operations (data validation, image uploads) as opposed to serving static files.
- **CloudFront** - To take scalability further, we used CloudFront to distribute the static assets across AWS's CDN. While our project didn't require this to function, we learnt a lot about how large websites operate at scale yb investigating this.
- **Application Load Balancer** - We used an ALB to route traffic to our two EC2 instances situated in different Availability Zones. Ideally we wanted to use Elastic Beanstalk over EC2, however we had difficulty getting it to call DynamoDB and S3 API's successfully. Using EB would remove the need for the ALB, and this is something we could investigate further.


## Front-End
<img src="https://github.com/IwanCole/DeltaAugment/blob/master/readmeImages/home.png" width="720">
The home page shows a grid of all previously uploaded images. Clicking an existing image gives you a link to download the corresponding augmented images as a zip. Images are automatically deleted from our S3 buckets after 4 weeks using a lifecycle rule, reducing the amount of data we needed to store. We planned on building a tiered version of our service allowing users to make their uploads private, and to store the images online for longer.

<img src="https://github.com/IwanCole/DeltaAugment/blob/master/readmeImages/upload.png" width="720">
Form used for uploading new images. Validation errors are presented as popups, and a download link appears after a successful upload. We planned on adding more customisability by having buttons to toggle certain augmentations, giving users a more granular control over the augmentation process.

<img src="https://github.com/IwanCole/DeltaAugment/blob/master/readmeImages/aug.png" width="720">
An example of an augmentation.


## Load testing the Lambda
The whole point of Lambda is to scale quickly under heavy load, and we wanted some rough estimates of how quick our service could augment images. Our Lambda was capped at 1000 concurrent invocations, and we found that even when starting from a cold start the function ran quickly. After ~20 minutes of being called constantly the Lambda ran even faster, presumably since AWS was caching the function much more heavily. We used a crude method of load testing by simply dumping huge amounts of files into S3 simultaneuosly, and logging the rate at which they were processed using CloudWatch.
<img src="https://github.com/IwanCole/DeltaAugment/blob/master/readmeImages/reqs.png" width="400">
<img src="https://github.com/IwanCole/DeltaAugment/blob/master/readmeImages/time.png" width="400">

---

### Git Project Structure
#### Angular
Angular project source code, this created our front-end. When building the angular project using `ng build --prod`, we store the static assets created in `Angular/dist/Angular` in a public S3 bucket. Copy the file `Angular/dist/Angular/index.html` to `EC2/public/` and modify the `src` and ```href``` attributes contained within it to point at the public facing S3 bucket (in our case, `irw-files`).

#### EC2
Contains the Node server code. On the production EC2 instance, this directory must also include `config_dynamo.json` and `config_s3.json`files containing the IAM secret auth keys (granting the node server permission to perform IO on AWS services.

#### Lambda
Python code for the AWS Lambda that performs our augmentation. Requires the correct .zip to function correctly (bundling all python dependencies and install scripts).

#### Load
Incomplete load-testing tool, aimed to perform rapid requests to the `/upload` endpoint. Work in progress.
