import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsDescriptionComponent } from './items-description/items-description.component';
import { PriceComponent } from './components/price/price.component';


@NgModule({
  declarations: [ItemsListComponent, ItemsDescriptionComponent, PriceComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule
  ]
})
export class ItemsModule { }
