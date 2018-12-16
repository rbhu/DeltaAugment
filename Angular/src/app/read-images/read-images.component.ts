import { Component, OnInit } from '@angular/core';
import { ReadImagesService } from '../read-images/read-images.service';
import { Observable } from 'rxjs/Observable';
import { ImageData } from '../image-data';

@Component({
  selector: 'app-read-images',
  templateUrl: './read-images.component.html',
  styleUrls: ['./read-images.component.css']
})
export class ReadImagesComponent implements OnInit {

  imageList: Observable<Array<ImageData>>;

  constructor(private readService: ReadImagesService) { }

  ngOnInit() {
        this.imageList = this.readService.getFiles();
  }

}
