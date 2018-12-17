import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReadImagesService } from '../../services/read-images.service';
import { ImageData } from '../../models/image-data';
import { ViewChild } from '@angular/core';
import { ImagePopupComponent } from '../image-popup/image-popup.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.css']
})

export class ImageGridComponent implements OnInit {

  imageList: Observable<Array<ImageData>>;
  constructor(private readService: ReadImagesService, public dialog: MatDialog) {   }

  ngOnInit() {
        this.imageList = this.readService.getFiles();
  }

  openDialog(public url: string) {
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
