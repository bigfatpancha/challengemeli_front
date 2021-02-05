import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { CategoriesService } from 'src/app/shared/categories.service';
import { Item, ItemsResponseData } from '../model/item';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsListComponent implements OnInit {

  items: Item[] = []
  itemsLoaded = false;
  error = false;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private catService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      filter((params: Params) => params.search),
      map((params: Params) => params.search)
    ).subscribe(params => {
      this.httpService.doGetItems(params).subscribe((data: ItemsResponseData) => {
        this.error = false;
        this.items = data.data.items;
        this.catService.setCategories(data.data.categories);
        this.itemsLoaded = true;
        this.cdr.markForCheck();
      }, error => {
        this.error = true;
        this.itemsLoaded = false;
      });
    });
  }

  goToDescription(item) {
    this.router.navigate([`items/${item.id}`]);
  }

}
