import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'
import { AugmentFormComponent } from '../augment-form/augment-form.component'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {

      if(this.dialog.openDialogs.length==0){
        const dialogRef = this.dialog.open(AugmentFormComponent, {
            //
        });

        dialogRef.afterClosed().subscribe(result => {
          //
        });
      }
  }

}
