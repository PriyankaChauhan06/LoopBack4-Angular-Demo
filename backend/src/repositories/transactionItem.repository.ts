import { Getter, inject } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, repository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Product, TransactionItem, TransactionItemRelations } from '../models';
import { ProductRepository} from './product.repository';

export class TransactionItemRepository extends DefaultCrudRepository<
  TransactionItem,
  typeof TransactionItem.prototype.id,
  TransactionItemRelations
> {

  public readonly product: BelongsToAccessor<Product, typeof TransactionItem.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(TransactionItem, dataSource);
    // create belong to releation
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
