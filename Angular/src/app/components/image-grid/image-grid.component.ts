import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReadImagesService } from '../../services/read-images.service';
import { ImageData } from '../../models/image-data';
// import { NgbdModalBasic } from '../image-popup/image-popup.component';
import { ViewChild } from '@angular/core';
import { ImagePopupComponent } from '../image-popup/image-popup.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-read-images',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.css']
})

export class ImageGridComponent implements OnInit {

  // @Input() image: ImageData;

  imageList: Observable<Array<ImageData>>;
  constructor(private readService: ReadImagesService, public dialog: MatDialog) {   }

  ngOnInit() {
        this.imageList = this.readService.getFiles();
  }

  openDialog(public url: string) : void {
    const dialogRef = this.dialog.open(ImagePopupComponent,{
      data: {
        image: url
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // @ViewChild(ModalComponent) popupComponent: ModalComponent;

}
