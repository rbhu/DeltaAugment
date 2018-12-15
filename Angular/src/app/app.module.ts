import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AugmentService } from './services/augment/augment.service';
import { AugmentFormComponent } from './components/augment-form/augment-form.component'

@NgModule({
  declarations: [
    AugmentFormComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AugmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
