import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule}   from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {Observable} from 'rxjs/Observable';

import {AppComponent} from './app.component';
import {ImageLoadComponent} from './components/image-load/image-load.component';
import {AugmentFormComponent} from './components/augment-form/augment-form.component';
import {ReadImagesComponent} from './components/read-images/read-images.component';

import {ReadImagesService} from './services/read-images.service';
import {AugmentService} from './services/augment.service';
@NgModule({
  declarations: [
    AppComponent,
    AugmentFormComponent,
    ReadImagesComponent,
    ImageLoadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatGridListModule
  ],
  providers: [
    ReadImagesService,
    AugmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
