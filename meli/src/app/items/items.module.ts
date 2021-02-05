import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ItemsRoutingModule } from './items-routing.module';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsDescriptionComponent } from './items-description/items-description.component';
import { PriceComponent } from './components/price/price.component';
import { HttpService } from './services/http.service';

@NgModule({
  declarations: [ItemsListComponent, ItemsDescriptionComponent, PriceComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    HttpClientModule
  ],
  providers: [ HttpService ]
})
export class ItemsModule { }
