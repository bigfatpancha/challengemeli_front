import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnDestroy {
 items: string[];

 private subscriptions = new Subscription();

 constructor(private service: CategoriesService, private cdr: ChangeDetectorRef) {
  this.subscriptions.add(
    this.service.categories$.subscribe(categories => {
      this.items = categories;
      this.cdr.markForCheck();
    })
  );
 }

 ngOnDestroy() {
   this.subscriptions.unsubscribe();
 }
}
