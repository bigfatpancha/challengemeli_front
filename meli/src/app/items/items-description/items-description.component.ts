import { Component, OnInit } from '@angular/core';
import { Item } from '../model/item';

@Component({
  selector: 'app-items-description',
  templateUrl: './items-description.component.html',
  styleUrls: ['./items-description.component.scss']
})
export class ItemsDescriptionComponent implements OnInit {

  item: Item = {
    id: '1',
    condition: 'nuevo',
    free_shipping: true,
    picture: 'https://http2.mlstatic.com/D_Q_NP_954785-MLA43643824641_102020-AB.webp',
    price: {
      amount: 2499,
      decimals: 0,
      currency: '$'
    },
    title: 'Colchoneta Plegable Flotadora Inflable Jilong Sillon 2 En 1',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    sold_quantity: 20
  };

  constructor() { }

  ngOnInit(): void {
  }

}
