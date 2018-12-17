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

}
