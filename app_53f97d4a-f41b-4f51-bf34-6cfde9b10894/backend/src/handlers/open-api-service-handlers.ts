import type { FastifyRequest } from 'fastify';
import type { Services } from '../services/index';
import type { components } from '../../../shared/generated-types';

type ProductUpdate = components['schemas']['ProductUpdate'];

/**
 * OpenAPI operation handlers for fastify-openapi-glue
 *
 * Maps OpenAPI operationIds to service method calls.
 * Extend this class to add handlers for new entities.
 */
export class OpenAPIServiceHandlers {
  protected services: Services;

  constructor(services: Services) {
    this.services = services;
  }

  // Products handlers matching OpenAPI operationIds
  async listProducts(request: FastifyRequest) {
    const query = request.query as {
      search?: string;
      page?: number;
      limit?: number;
      sort?: string;
      filter?: string;
    };

    return await this.services.products.listProducts(query);
  }

  async getProductDetails(request: FastifyRequest) {
    const params = request.params as { id: string };
    return await this.services.products.getProductDetails(params.id);
  }

  async updateProduct(request: FastifyRequest) {
    const params = request.params as { id: string };
    const body = request.body as ProductUpdate;
    return await this.services.products.updateProduct(params.id, body);
  }
}
