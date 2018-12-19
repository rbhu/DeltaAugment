import { Injectable } from '@angular/core';
import { AugmentEvent } from '../models/augment-event';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})

export class AugmentService {

  constructor(private http: HttpClient) { }

  public uploadImage(image: File, model: AugmentEvent): Observable<any> {
     const formData = new FormData();
     formData.append('image', image);
     formData.append('uid', model.uid);
     formData.append('number', model.numOfAugments.toString());
     formData.append('tags', model.tags);
     return this.http.post('/upload', formData);
   }

}
