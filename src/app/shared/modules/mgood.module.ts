export interface MyGood {
    id?: number;
    name: string;
    vendorcode: string;
    price: number;
    procreator: string;
    category: number;
    weight: number;
    amount: number;
}

export enum MyGoodCategory {
    furniture,
    technology,
    books,
    phones
}