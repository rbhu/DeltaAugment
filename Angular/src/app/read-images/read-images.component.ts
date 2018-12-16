import { Component, OnInit } from '@angular/core';
import { ReadImagesService } from '../read-images/read-images.service';
import { Observable } from 'rxjs/Observable';
import { ImageName } from '../image-name';

@Component({
  selector: 'app-read-images',
  templateUrl: './read-images.component.html',
  styleUrls: ['./read-images.component.css']
})
export class ReadImagesComponent implements OnInit {

  showFile = false;
  imageList: Observable<Array<ImageName>>;

  constructor(private readService: ReadImagesService) { }

  ngOnInit() {
  }

  showFiles(enable: boolean) {
    this.showFile = enable;

    if (enable) {
      this.imageList = this.readService.getFiles();
    }
  }

}
