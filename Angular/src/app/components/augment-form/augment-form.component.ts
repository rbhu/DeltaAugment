import { Component } from '@angular/core';
import { AugmentEvent }    from '../../models/augment-event';
import { AugmentService } from '../../services/augment/augment.service';
import 'rxjs/Rx';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-augment-form',
  templateUrl: './augment-form.component.html',
  styleUrls: ['./augment-form.component.css']
})

export class AugmentFormComponent {
    constructor(private augmentService: AugmentService) { }
    model = new AugmentEvent('', 5, '');
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
      this.augmentService.uploadImage(this.selectedFile.file, this.model).subscribe(
        (res) => {
        },
        (err) => {
        })
    }
}




//
// this.imageService.uploadImage(this.selectedFile.file).subscribe(
//   (res) => {
//   },
//   (err) => {
//   })
