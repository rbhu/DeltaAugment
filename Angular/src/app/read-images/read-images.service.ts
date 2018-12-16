
import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ImageName } from '../image-name';
import { of } from 'rxjs';

AWS.config.update({
    region: 'eu-west-1'
})



@Injectable()
export class ReadImagesService {


    FOLDER = '';
    BUCKET = 'img-bucket-irw';


    constructor() { }

    private getS3Bucket(): any {
      const bucket = new S3(
        {
          accessKeyId: 'AKIAIHJIJX4JFJ5L53ZQ',
          secretAccessKey: '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',
          region: 'eu-west-1'
        }
      );
      return bucket;
    }



  getFiles(): Observable<Array<ImageName>> {
  const images = new Array<ImageName>();

  const params = {
    Bucket: this.BUCKET
    // Prefix: this.FOLDER
  };

  this.getS3Bucket().listObjects(params, function (err, data) {
    if (err) {
      console.log('There was an error getting your files: ' + err);
      return;
    }

    console.log('Successfully get files.', data);

    const fileDatas = data.Contents;

    fileDatas.forEach(function (file) {
      images.push(new ImageName(file.Key, 'https://s3-eu-west-1.amazonaws.com/' + params.Bucket + '/' + file.Key));
    });
  });

  return of(images);
}

}






// import { Injectable } from '@angular/core';
// import * as AWS from 'aws-sdk/global';
// import * as S3 from 'aws-sdk/clients/s3';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import { ImageName } from '../image-name';
//
//
//
// export class ReadImagesService {
//
// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-read-images',
//   templateUrl: './read-images.component.html',
//   styleUrls: ['./read-images.component.css']
// })
// export class ImageGridComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
//   imageList = ['assets/images/arch.jpg', 'assets/images/baz.png', 'assets/images/cans.jpg', 'assets/images/car.jpeg']
//
// }


  // FOLDER = '';
  // BUCKET = 'img-bucket-irw';
  //
  // constructor() { }
  //
  // private getS3Bucket(): any {
  //   const bucket = new S3(
  //     {
  //       accessKeyId: 'AKIAIHJIJX4JFJ5L53ZQ',
  //       secretAccessKey: '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',
  //       region: 'eu-west-1'
  //     }
  //   );
  //
  //   return bucket;
  // }
  //
  // getFiles(): Observable<Array<ImageName>> {
  //   const imageList = new Array<ImageName>();
  //
  //   const params = {
  //     Bucket: this.BUCKET,
  //     Prefix: this.FOLDER
  //   };
  //
  //   this.getS3Bucket().listObjects(params, function (err, data) {
  //     if (err) {
  //       console.log('There was an error getting your files: ' + err);
  //       return;
  //     }
  //
  //     console.log('Successfully get files.', data);
  //
  //     const fileDatas = data.Contents;
  //
  //     fileDatas.forEach(function (file) {
  //       imageList.push(new ImageName(file.Key, 'https://s3.amazonaws.com/' + params.Bucket + '/' + file.Key));
  //     });
  //   });
  //
  //   return Observable.of(imageList);
  // }
  //


// }









// import { Injectable } from '@angular/core';
// import * as AWS from 'aws-sdk/global';
// import * as S3 from 'aws-sdk/clients/s3';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import { imageName } from './image-name.ts';
//
// export class ReadImagesService {
//
//   const params = {
//     Bucket: 'img-bucket-irw',
//     Prefix: ''
//   };
//
//
//   private getS3Bucket(): any {
//     const bucket = new S3(
//       {
//         accessKeyId: 'AKIAIHJIJX4JFJ5L53ZQ',
//         secretAccessKey: '0CeuOK9Yx6schQUm98FXVOqLFht',
//         region: 'eu-west-1'
//       }
//     );
//
//
//   return bucket;
// }
//   const imageList = new Array<ImageName>();
//
//
//   this.getS3Bucket().listObjects(params, function (err, data) {
//         if (err) {
//           console.log('There was an error getting your files: ' + err);
//           return;
//         }
//
//         console.log('Successfully get files.', data);
//
//         const fileDatas = data.Contents;
//
//         fileDatas.forEach(function (file) {
//           imageList.push(new imageName(file.Key, 'https://s3.amazonaws.com/' + params.Bucket + '/' + file.Key));
//         });
//       });
// }
//
// }
//
// // this.getS3Bucket().listObjects(params, function (err, data) {
// //   if (err) {
// //     console.log('There was an error getting your files: ' + err);
// //     return;
// //   }
// //   else console.log(data);
// //   // data.Contents
// // });
// import { Component, OnInit } from '@angular/core';
// import * as AWS from 'aws-sdk/global';
// import * as S3 from 'aws-sdk/clients/s3';
// import { imageName } from './image-name.ts';
//
// // declare var TextDecoder;
//
// @Component({
//   selector: 'image-list',
//   templateUrl: './read-images.component.html',
//   styleUrls: ['./read-images.component.css']
// })
// export class ReadImages implements OnInit {
//   title = 'ImageList';
//
//   ngOnInit() {
//     // Set up credentials
//     AWS.config.credentials = new AWS.Credentials({
//       accessKeyId: 'AKIAIHJIJX4JFJ5L53ZQ', secretAccessKey: '0CeuOK9Yx6schQUm98FXVOqLFht'
//     });
//
//     const params = {
//       Bucket: 'img-bucket-irw',
//       // Key: 'index.html'
//     };
//
//     var bucket = new AWS.S3({
//                 params: {
//                     Bucket: 'img-bucket-irw'
//                 }
//             });
//     // let s3 = new AWS.S3();
//
//     s3.getObject(params, function(err, data) {
//       if (err) {
//         console.error(err); // an error occurred
//       } else {
//         const string = new TextDecoder('utf-8').decode(data.Body);
//         console.log(string);
//       }
//     });
//   }
//
// }
