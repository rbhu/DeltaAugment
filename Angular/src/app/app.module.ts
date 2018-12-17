// Imports
import {Observable} from 'rxjs/Observable';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatGridListModule, MatDialogModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

// Components
import {AppComponent} from './app.component';
import {AugmentFormComponent} from './components/augment-form/augment-form.component';
import {ImageGridComponent} from './components/image-grid/image-grid.component';

// Services
import { ReadImagesService } from './services/read-images.service';
import { AugmentService } from './services/augment.service';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageGridComponent,
    NavbarComponent,
    AugmentFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatDialogModule
  ],
  entryComponents: [
      AugmentFormComponent,
  ],
  providers: [
    ReadImagesService,
    AugmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
