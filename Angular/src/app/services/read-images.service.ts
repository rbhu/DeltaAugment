
import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ImageData } from '../models/image-data';
import { of } from 'rxjs';

@Injectable()
export class ReadImagesService {

  FOLDER = '';
  BUCKET = 'img-bucket-irw';
  constructor(private http: HttpClient) { }


  getFiles(): Observable<Array<ImageData>> {

    const images = new Array<ImageData>();

    const params = {
      Bucket: this.BUCKET
    };

      this.http.get('/getimagelist', { observe: 'response' }).subscribe(
        (res) => {
            console.log("test");
          console.log(JSON.stringify(res));
          var contents = res.body;
          console.log("contents: " + JSON.stringify(contents));
          contents["Contents"].forEach(function(file) {
              images.push(new ImageData(file["Key"], 'https://s3-eu-west-1.amazonaws.com/' + params.Bucket + '/' + file.Key));
          })
        },
        (err) => {
          console.log(err);
        });

    return of(images);
  }

}
