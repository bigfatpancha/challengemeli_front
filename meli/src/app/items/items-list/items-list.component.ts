import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

class Item {
  id: string;
  title: string;
  price: Currency;
  picture: string;
  condition: string;
  free_shipping: boolean;

}

class Currency {
  currency: string;
  amount: number;
  decimals: number;
}

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsListComponent implements OnInit {

  items: Item[] = [
    {
      id: '1',
      condition: 'nuevo',
      free_shipping: true,
      picture: 'https://http2.mlstatic.com/D_Q_NP_954785-MLA43643824641_102020-AB.webp',
      price: {
        amount: 2499,
        decimals: 0,
        currency: '$'
      },
      title: 'Colchoneta Plegable Flotadora Inflable Jilong Sillon 2 En 1'
    },
    {
      id: '1',
      condition: 'nuevo',
      free_shipping: true,
      picture: 'https://http2.mlstatic.com/D_Q_NP_954785-MLA43643824641_102020-AB.webp',
      price: {
        amount: 2499,
        decimals: 0,
        currency: '$'
      },
      title: 'Colchoneta Plegable Flotadora Inflable Jilong Sillon 2 En 1'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
