import { Filter, repository } from '@loopback/repository';
import { get, post, put, del, param, requestBody, response, getModelSchemaRef } from '@loopback/rest';
import { Product } from '../models';
import { ProductRepository } from '../repositories';

export class ProductController {
  constructor(@repository(ProductRepository) public productRepository : ProductRepository) {}

  // Get all products
  @get('/product')
  @response(200, {
    description: 'Array of Product model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          rows: getModelSchemaRef(Product, { includeRelations: true }),
        },
      },
    },
  })
  async find(@param.filter(Product) filter?: Filter<Product>): Promise<Product[]> {
    return this.productRepository.find(filter);
  }

  // Create product
  @post('/product')
  @response(200, {
    description: 'Product model instance',
    content: {'application/json': { schema: getModelSchemaRef(Product) }},
  })
  async create(
    @requestBody({
      content: {
        'application/json': { schema: getModelSchemaRef(Product, { title: 'NewProduct', exclude: ['id'] }) },
      },
    })
    product: Omit<Product, 'id'>,
  ): Promise<Product> {
    return this.productRepository.create(product);
  }

  // Update Product
  @put('/product/{id}')
  @response(204, {
    description: 'Product PUT success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Product,
  ): Promise<void> {
    await this.productRepository.updateById(id, product);
  }

  // Delete Product
  @del('/product/{id}')
  @response(204, {
    description: 'Product DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productRepository.deleteById(id);
  }
}
