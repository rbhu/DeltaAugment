import { Component, OnInit, Input } from '@angular/core';
import { ImageData } from '../image-data';

@Component({
  selector: 'app-image-load',
  templateUrl: './image-load.component.html',
  styleUrls: ['./image-load.component.css']
})
export class ImageLoadComponent implements OnInit {

  @Input() image: ImageData;

  constructor() { }

  ngOnInit() {
  }

}
