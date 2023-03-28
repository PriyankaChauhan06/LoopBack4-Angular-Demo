import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Product} from './product.model';

@model()
export class TransactionItem extends Entity {
  @property({type: 'number', id: true, generated: true})
  id?: number;

  @property({type: 'number', required: true})
  quantity: number;

  @property({type: 'Date', required: true})
  transactionDate: Date;

  @belongsTo(() => Product)
  productId: number;

  constructor(data?: Partial<TransactionItem>) {super(data)}
}

export interface TransactionItemRelations { }

export type TransactionItemWithRelations = TransactionItem & TransactionItemRelations;
