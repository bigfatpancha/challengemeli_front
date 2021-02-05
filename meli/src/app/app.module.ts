import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search/search.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchBoxComponent } from './search/search-box/search-box.component';
import { HeaderComponent } from './search/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchBoxComponent,
    HeaderComponent,
    BreadcrumbComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
