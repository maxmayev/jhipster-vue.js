import { IProduct } from '@/shared/model/product.model';

export interface ICategory {
  id?: number;
  name?: string;
  productNames?: IProduct[];
}

export class Category implements ICategory {
  constructor(public id?: number, public name?: string, public productNames?: IProduct[]) {}
}
