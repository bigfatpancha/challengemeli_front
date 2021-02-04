import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { ItemsDescriptionComponent } from './items-description/items-description.component';
import { ItemsListComponent } from './items-list/items-list.component';


const routes: Routes = [
  { path: '', component: ItemsListComponent },
  { matcher: itemDescriptionMatcher, component: ItemsDescriptionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }


export function itemDescriptionMatcher(url: UrlSegment[]) {
  console.log(url)
  if (url.length === 1) {
    return ({consumed: url});
  }
  return null;
}