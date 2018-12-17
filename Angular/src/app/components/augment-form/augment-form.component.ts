import { Component } from '@angular/core';
import { AugmentEvent } from '../../models/augment-event';
import { AugmentService } from '../../services/augment.service';
import { MatDialogRef, MatSnackBar } from '@angular/material'

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

    model = new AugmentEvent();

    selectedFile: ImageSnippet;

    processFile(imageInput: any) {
        const file: File = imageInput.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
          this.selectedFile = new ImageSnippet(event.target.result, file);
        });
        reader.readAsDataURL(file);
      }

    onSubmit() {
      this.dialogRef.close()
      this.snackBar.open("Upload successful", "OK", {
        duration: 2000,
      });
      this.augmentService.uploadImage(this.selectedFile.file, this.model).subscribe(
        (res) => {
        },
        (err) => {
        });


    }
}
