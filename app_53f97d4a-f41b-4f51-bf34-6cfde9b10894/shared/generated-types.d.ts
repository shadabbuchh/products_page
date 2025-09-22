/**
 * ⚠️  AUTO-GENERATED FILE - DO NOT MODIFY ⚠️
 *
 * This file contains TypeScript types generated from OpenAPI specifications.
 * Use these types for type-safe API development.
 */

export interface paths {
  '/products': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * List products
     * @description Retrieve a paginated list of products, with optional filtering and sorting.
     */
    get: operations['listProducts'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/products/{id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get product details
     * @description Retrieve details for a specific product by its ID.
     */
    get: operations['getProductDetails'];
    /**
     * Update product
     * @description Update an existing product by its ID.
     */
    put: operations['updateProduct'];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    Product: {
      /**
       * Format: uuid
       * @description Unique identifier for the product
       */
      id: string;
      /** @description Name of the product */
      name: string;
      /** @description Stock Keeping Unit identifier */
      sku: string;
      /**
       * Format: float
       * @description Unit price of the product
       */
      price: number;
      /** @description Available stock count */
      stock: number;
      /** @description URL to the product image */
      image?: string;
      /** @description Threshold below which stock is considered low */
      lowStockThreshold?: number;
      /**
       * Format: date-time
       * @description Timestamp when product was created
       */
      createdAt: string;
      /**
       * Format: date-time
       * @description Timestamp when product was last updated
       */
      updatedAt: string;
      /** @description Indicates if the product is visible to users */
      isVisible: boolean;
    };
    ProductUpdate: {
      /** @description Updated name of the product */
      name?: string;
      /** @description Updated SKU */
      sku?: string;
      /**
       * Format: float
       * @description Updated unit price
       */
      price?: number;
      /** @description Updated stock count */
      stock?: number;
      /** @description Updated visibility */
      isVisible?: boolean;
    };
    ErrorResponse: {
      /** @description Error type identifier */
      error: string;
      /** @description Human-readable error message */
      message: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  listProducts: {
    parameters: {
      query?: {
        /**
         * @description Search term to filter products by name or SKU
         * @example laptop
         */
        search?: string;
        /**
         * @description The page number to retrieve
         * @example 1
         */
        page?: number;
        /**
         * @description Number of products per page
         * @example 20
         */
        limit?: number;
        /**
         * @description Field to sort by (e.g. price, name)
         * @example price
         */
        sort?: string;
        /**
         * @description Filter expression (e.g., isVisible=true)
         * @example isVisible=true
         */
        filter?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successfully retrieved list of products */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            products: components['schemas']['Product'][];
            /** @description Total number of products available */
            total: number;
          };
        };
      };
      /** @description Bad request - Invalid parameters */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getProductDetails: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Unique identifier of the product */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Product details found */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Product'];
        };
      };
      /** @description Product not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  updateProduct: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Unique identifier of the product */
        id: string;
      };
      cookie?: never;
    };
    /** @description Product fields to update */
    requestBody: {
      content: {
        'application/json': components['schemas']['ProductUpdate'];
      };
    };
    responses: {
      /** @description Product updated successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Product'];
        };
      };
      /** @description Bad request - Invalid update payload */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description Product not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
}
