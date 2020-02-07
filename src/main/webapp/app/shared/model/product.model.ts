import { ICategory } from '@/shared/model/category.model';
import { IPurchase } from '@/shared/model/purchase.model';

export interface IProduct {
  id?: number;
  name?: string;
  cost?: number;
  pictureContentType?: string;
  picture?: any;
  categoryNames?: ICategory[];
  purchaseNames?: IPurchase[];
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public cost?: number,
    public pictureContentType?: string,
    public picture?: any,
    public categoryNames?: ICategory[],
    public purchaseNames?: IPurchase[]
  ) {}
}
