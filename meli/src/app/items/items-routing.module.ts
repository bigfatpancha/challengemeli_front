import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsDescriptionComponent } from './items-description/items-description.component';
import { ItemsListComponent } from './items-list/items-list.component';


const routes: Routes = [
  { path: '', component: ItemsListComponent },
  { path: ':id', component: ItemsDescriptionComponent,  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
