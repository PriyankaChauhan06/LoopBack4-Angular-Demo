import { Filter, repository } from '@loopback/repository';
import { get, post, put, del, param, requestBody, response, getModelSchemaRef } from '@loopback/rest';
import { TransactionItem } from '../models';
import { TransactionItemRepository } from '../repositories';

export class TransactionItemController {
  constructor(@repository(TransactionItemRepository) public transactionItemRepository: TransactionItemRepository) {}

  // Get all Transaction item
  @get('/transactionItem')
  @response(200, {
    description: 'Array of TransactionItem model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TransactionItem, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TransactionItem) filter?: Filter<TransactionItem>,
  ): Promise<TransactionItem[]> {
    return this.transactionItemRepository.find({include: ['product']});
  }

  // Create Transaction item
  @post('/transactionItem')
  @response(200, {
    description: 'TransactionItem model instance',
    content: {'application/json': {schema: getModelSchemaRef(TransactionItem)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': { schema: getModelSchemaRef(TransactionItem, { title: 'NewTransactionItem', exclude: ['id'] }) },
      },
    })
    transactionItem: Omit<TransactionItem, 'id'>,
  ): Promise<TransactionItem> {
    return this.transactionItemRepository.create(transactionItem);
  }

  // @get('/transactionItem/count')
  // @response(200, {
  //   description: 'TransactionItem model count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async count(
  //   @param.where(TransactionItem) where?: Where<TransactionItem>,
  // ): Promise<Count> {
  //   return this.transactionItemRepository.count(where);
  // }

  // Update Transaction item
  @put('/transactionItem/{id}')
  @response(204, {
    description: 'TransactionItem PUT success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransactionItem, {partial: true}),
        },
      },
    })
    transactionItem: TransactionItem,
  ): Promise<void> {
    await this.transactionItemRepository.updateById(id, transactionItem);
  }

  // Delete Transaction item
  @del('/transactionItem/{id}')
  @response(204, {
    description: 'TransactionItem DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.transactionItemRepository.deleteById(id);
  }
}
