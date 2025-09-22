import { desc, eq, ilike, and, or, sql, type SQL } from 'drizzle-orm';
import type { DB } from '../db/connection';
import { products, type Product, type NewProduct } from '../db/schema';

export class ProductsRepository {
  constructor(private db: DB) {}

  async findAll(
    options: {
      search?: string;
      page?: number;
      limit?: number;
      sort?: string;
      filter?: string;
    } = {}
  ) {
    const {
      search,
      page = 1,
      limit = 20,
      sort = 'createdAt',
      filter,
    } = options;

    let query = this.db.select().from(products);
    let countQuery = this.db
      .select({ count: sql<number>`count(*)` })
      .from(products);

    // Apply search filter
    if (search) {
      const searchCondition = or(
        ilike(products.name, `%${search}%`),
        ilike(products.sku, `%${search}%`)
      );
      query = query.where(searchCondition);
      countQuery = countQuery.where(searchCondition);
    }

    // Apply additional filters
    if (filter) {
      const filterConditions = this.parseFilter(filter);
      if (filterConditions.length > 0) {
        const combinedCondition = and(...filterConditions);
        query = query.where(
          search
            ? and(
                or(
                  ilike(products.name, `%${search}%`),
                  ilike(products.sku, `%${search}%`)
                ),
                combinedCondition
              )
            : combinedCondition
        );
        countQuery = countQuery.where(
          search
            ? and(
                or(
                  ilike(products.name, `%${search}%`),
                  ilike(products.sku, `%${search}%`)
                ),
                combinedCondition
              )
            : combinedCondition
        );
      }
    }

    // Apply sorting
    switch (sort) {
      case 'name':
        query = query.orderBy(products.name);
        break;
      case 'price':
        query = query.orderBy(products.price);
        break;
      case 'stock':
        query = query.orderBy(products.stock);
        break;
      case 'sku':
        query = query.orderBy(products.sku);
        break;
      default:
        query = query.orderBy(desc(products.createdAt));
    }

    // Apply pagination
    const offset = (page - 1) * limit;
    query = query.limit(limit).offset(offset);

    const [productResults, countResult] = await Promise.all([
      query,
      countQuery,
    ]);

    return {
      products: productResults,
      total: countResult[0]?.count || 0,
    };
  }

  async findById(id: string): Promise<Product | null> {
    const result = await this.db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    return result[0] || null;
  }

  async update(
    id: string,
    updates: Partial<NewProduct>
  ): Promise<Product | null> {
    const updateData = {
      ...updates,
      updatedAt: sql`NOW()`,
    };

    const result = await this.db
      .update(products)
      .set(updateData)
      .where(eq(products.id, id))
      .returning();

    return result[0] || null;
  }

  async create(data: NewProduct): Promise<Product> {
    const result = await this.db
      .insert(products)
      .values(data)
      .returning();

    return result[0];
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db
      .delete(products)
      .where(eq(products.id, id));

    return result.rowCount > 0;
  }

  private parseFilter(filter: string): SQL[] {
    const conditions = [];

    // Parse simple filters like "isVisible=true", "stock>10", etc.
    const filterParts = filter.split(',');

    for (const part of filterParts) {
      const trimmed = part.trim();

      if (trimmed.includes('=')) {
        const [field, value] = trimmed.split('=');
        const fieldName = field.trim();
        const fieldValue = value.trim();

        switch (fieldName) {
          case 'isVisible':
            conditions.push(eq(products.isVisible, fieldValue === 'true'));
            break;
          case 'stock':
            if (fieldValue.startsWith('>')) {
              conditions.push(
                sql`${products.stock} > ${parseInt(fieldValue.slice(1))}`
              );
            } else if (fieldValue.startsWith('<')) {
              conditions.push(
                sql`${products.stock} < ${parseInt(fieldValue.slice(1))}`
              );
            } else {
              conditions.push(eq(products.stock, parseInt(fieldValue)));
            }
            break;
        }
      }
    }

    return conditions;
  }
}
