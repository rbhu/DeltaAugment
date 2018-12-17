import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReadImagesService } from '../../services/read-images.service';
import { ImageData } from '../../models/image-data';

@Component({
  selector: 'app-read-images',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.css']
})
export class ImageGridComponent implements OnInit {

  // @Input() image: ImageData;

  imageList: Observable<Array<ImageData>>;

  constructor(private readService: ReadImagesService) { }

  ngOnInit() {
        this.imageList = this.readService.getFiles();
  }

}
