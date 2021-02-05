export class Item {
    id: string;
    title: string;
    price: Currency;
    picture: string;
    condition: string;
    free_shipping: boolean;
    sold_quantity?: number;
    description?: string;
}

export class Currency {
    currency: string;
    amount: number;
    decimals: number;
}

export class ItemsResponseData {
    data: ItemsResponse;
}

export class ItemsResponse {
    author: Author;
    categories: string[];
    items: Item[]
}

export class Author {
    name: string;
    lastname: string;
}