import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DescriptionResponseData, Item } from '../model/item';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-items-description',
  templateUrl: './items-description.component.html',
  styleUrls: ['./items-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsDescriptionComponent implements OnInit {

  item: Item;
  loadItem = false;
  error = false;

  constructor(private httpService: HttpService, private cdr: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id'))
    ).subscribe(id => {
      this.httpService.doGetDescription(id).subscribe((data: DescriptionResponseData) => {
        this.item = data.data.item;
        this.loadItem = true;
        this.error = false;
        this.cdr.markForCheck();
      }, (error) => {
        this.error = true;
        this.loadItem = false;
      })
    })
  }

}
