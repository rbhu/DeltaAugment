import { Component } from '@angular/core';
import { AugmentEvent }    from '../augment-event';

@Component({
  selector: 'app-augment-form',
  templateUrl: './augment-form.component.html',
  styleUrls: ['./augment-form.component.css']
})
export class AugmentFormComponent{
  model = new AugmentEvent('', '', 5, '');

  submitted = false;
  onSubmit() { this.submitted = true; }

  newAugmentEvent() {
    this.model = new AugmentEvent('', '', 5, '');
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
