import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewImagesComponent } from './view-images/view-images.component';
import { UploaImageComponent } from './uploa-image/uploa-image.component';

const appRoutes: Routes = [
  { path: '', component: UploaImageComponent },
  { path: 'viewImages', component: ViewImagesComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ViewImagesComponent,
    UploaImageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
