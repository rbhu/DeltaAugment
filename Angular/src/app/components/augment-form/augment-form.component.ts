import { Component } from '@angular/core';
import { AugmentEvent } from '../../models/augment-event';
import { AugmentService } from '../../services/augment.service';
import { MatDialogRef, MatSnackBar } from '@angular/material'
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-augment-form',
  templateUrl: './augment-form.component.html',
  styleUrls: ['./augment-form.component.css']
})

export class AugmentFormComponent {
    constructor(
        private augmentService: AugmentService,
        public dialogRef: MatDialogRef<AugmentFormComponent>,
        public snackBar: MatSnackBar
     ){ }

    public model = new AugmentEvent();
    private selectedFile: ImageSnippet;
    public spinnerVisibility: string = "hidden";
    public isButtonDisabled: boolean = false;
    public downloadLink : string = "https://s3-eu-west-1.amazonaws.com/img-bucket-irw-augmented/"

    processFile(imageInput: any) {
        const file: File = imageInput.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
          this.selectedFile = new ImageSnippet(event.target.result, file);
        });
        reader.readAsDataURL(file);
      }

    onSubmit() {
      // (document.querySelector('mat-spinner') as HTMLElement).
      this.spinnerVisibility = "visible";
      this.augmentService.uploadImage(this.selectedFile.file, this.model).subscribe(
        (res) => {
            // console.log(res);
          if (res.success) {
              this.spinnerVisibility = "hidden";
              this.isButtonDisabled = false;
              this.snackBar.open("Upload successful", "OK", {
                  duration: 2000,
              });
              // $("form")[0].reset();
              // TODO: DONT CLEAR ON BAD INPUT
          } else {
              this.snackBar.open(res.comment, "TRY AGAIN", {
                  duration: 6000,
              });
              this.spinnerVisibility = "hidden";
          }
        },
        (err) => {
          this.spinnerVisibility = "hidden";
        });
    }

    downloadImage() {
      // href="{{downloadLink}}/augment_{{model.uid}}/augment_{{model.uid}}.zip
      var win = window.open("https://s3-eu-west-1.amazonaws.com/img-bucket-irw-augmented/augment_will/augment_will.zip", '_blank');
      win.focus();





    }
}
