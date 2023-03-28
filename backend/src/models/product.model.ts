import { Entity, model, property } from '@loopback/repository';

@model({settings: { strict: false }})

export class Product extends Entity {
  @property({ type: 'number', id: true, generated: true })
  id?: number;

  @property({ type: 'string', required: true })
  name: string;

  @property({ type: 'number', required: true })
  price: number;

  @property({ type: 'string' })
  description?: string;

  [prop: string]: any;

  constructor(data?: Partial<Product>) { super(data) }
}

export interface ProductRelations {}

export type ProductWithRelations = Product & ProductRelations;
