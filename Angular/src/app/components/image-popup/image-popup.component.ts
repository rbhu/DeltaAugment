import { Component, OnInit, Inject } from '@angular/core';
import { ImageData } from '../../models/image-data'
import { MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-image-popup',
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.css']
})
export class ImagePopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

  downloadImage() {
    var filename = this.data.image.split("/").pop().split(".")[0];
    var win = window.open(`https://s3-eu-west-1.amazonaws.com/img-bucket-irw-augmented/augment_${filename}/augment_${filename}.zip`, '_blank');
    win.focus();
  }

}
