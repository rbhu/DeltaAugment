import { Component, OnInit, Input } from '@angular/core';
import { ImageName } from '../image-name';

@Component({
  selector: 'app-details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})
export class DetailsUploadComponent implements OnInit {

  @Input() image: ImageName;

  constructor() { }

  ngOnInit() {
  }

}
