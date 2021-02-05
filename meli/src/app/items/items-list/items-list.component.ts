import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
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

  constructor(private router: Router, private httpService: HttpService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      filter((params: Params) => params.search),
      map((params: Params) => params.search)
    ).subscribe(params => {
      this.httpService.doGetItems(params).subscribe((data: ItemsResponseData) => {
        console.log(data)
        this.items = data.data.items;
        this.itemsLoaded = true;
        console.log(this.items)
        this.cdr.markForCheck();
      });
    }
    );
  }

  goToDescription(item) {
    this.router.navigate([`items/${item.id}`]);
  }

}
