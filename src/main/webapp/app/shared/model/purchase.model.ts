import { IConsumer } from '@/shared/model/consumer.model';
import { IProduct } from '@/shared/model/product.model';

export interface IPurchase {
  id?: number;
  orderDate?: Date;
  consumerName?: IConsumer;
  productNames?: IProduct[];
}

export class Purchase implements IPurchase {
  constructor(public id?: number, public orderDate?: Date, public consumerName?: IConsumer, public productNames?: IProduct[]) {}
}
