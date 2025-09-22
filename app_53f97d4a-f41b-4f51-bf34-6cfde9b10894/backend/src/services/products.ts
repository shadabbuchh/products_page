import type { FastifyInstance } from 'fastify';
import type { components } from '@../shared/generated-types';
import type { ProductsRepository } from '../repositories/products';

type Product = components['schemas']['Product'];
type ProductUpdate = components['schemas']['ProductUpdate'];

export class ProductsService {
  constructor(
    private app: FastifyInstance,
    private productsRepo: ProductsRepository
  ) {}

  async listProducts(params: {
    search?: string;
    page?: number;
    limit?: number;
    sort?: string;
    filter?: string;
  }): Promise<{ products: Product[]; total: number }> {
    const { search, page = 1, limit = 20, sort = 'createdAt', filter } = params;

    // Validate pagination parameters
    if (page < 1) {
      throw new Error('Page number must be greater than 0');
    }
    if (limit < 1 || limit > 100) {
      throw new Error('Limit must be between 1 and 100');
    }

    const result = await this.productsRepo.findAll({
      search,
      page,
      limit,
      sort,
      filter,
    });

    // Transform database products to API format
    const products = result.products.map(this.transformToApiProduct);

    return {
      products,
      total: result.total,
    };
  }

  async getProductDetails(id: string): Promise<Product> {
    if (!id) {
      throw new Error('Product ID is required');
    }

    const product = await this.productsRepo.findById(id);

    if (!product) {
      const error = new Error('Product not found');
      (error as Error & { statusCode: number }).statusCode = 404;
      throw error;
    }

    return this.transformToApiProduct(product);
  }

  async updateProduct(id: string, updates: ProductUpdate): Promise<Product> {
    if (!id) {
      throw new Error('Product ID is required');
    }

    // Validate update payload
    if (Object.keys(updates).length === 0) {
      throw new Error('At least one field must be provided for update');
    }

    // Check if product exists
    const existingProduct = await this.productsRepo.findById(id);
    if (!existingProduct) {
      const error = new Error('Product not found');
      (error as Error & { statusCode: number }).statusCode = 404;
      throw error;
    }

    // Validate individual fields
    if (updates.price !== undefined && updates.price < 0) {
      throw new Error('Price must be non-negative');
    }
    if (updates.stock !== undefined && updates.stock < 0) {
      throw new Error('Stock must be non-negative');
    }
    if (updates.name !== undefined && updates.name.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    if (updates.sku !== undefined && updates.sku.trim().length === 0) {
      throw new Error('SKU cannot be empty');
    }

    // Perform update
    const updatedProduct = await this.productsRepo.update(id, updates);

    if (!updatedProduct) {
      throw new Error('Failed to update product');
    }

    return this.transformToApiProduct(updatedProduct);
  }

  private transformToApiProduct(dbProduct: Product): Product {
    return {
      id: dbProduct.id,
      name: dbProduct.name,
      sku: dbProduct.sku,
      price: parseFloat(dbProduct.price),
      stock: dbProduct.stock,
      image: dbProduct.image || undefined,
      lowStockThreshold: dbProduct.lowStockThreshold || undefined,
      createdAt: dbProduct.createdAt.toISOString(),
      updatedAt: dbProduct.updatedAt.toISOString(),
      isVisible: dbProduct.isVisible,
    };
  }
}
