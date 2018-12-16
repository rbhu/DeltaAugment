
import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ImageData } from '../image-data';
import { of } from 'rxjs';

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


  getFiles(): Observable<Array<ImageData>> {
    const images = new Array<ImageData>();

    const params = {
      Bucket: this.BUCKET
    };

    this.getS3Bucket().listObjects(params, function(err, data) {
      if (err) {
        console.log('There was an error getting your files: ' + err);
        return;
      }

      console.log('Successfully get files.', data);

      const fileDatas = data.Contents;

      fileDatas.forEach(function(file) {
        images.push(new ImageData(file.Key, 'https://s3-eu-west-1.amazonaws.com/' + params.Bucket + '/' + file.Key));
      });
    });

    return of(images);
  }

}
