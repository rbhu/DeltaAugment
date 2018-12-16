import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule}   from '@angular/forms';
import {AppComponent} from './app.component';
import {AugmentFormComponent} from './augment-form/augment-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {ReadImagesComponent} from './read-images/read-images.component';
import {ReadImagesService} from './read-images/read-images.service';
import {ImageLoadComponent} from './image-load/image-load.component';
import {Observable} from 'rxjs/Observable';

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
  providers: [ReadImagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
