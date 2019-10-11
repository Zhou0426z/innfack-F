import { Guid } from 'guid-typescript';

export class Product {
    productId: Guid;
    productName: string;
    brand?: string;
    categoryId: Guid;
    description?: string;
    price: number;
  
}
