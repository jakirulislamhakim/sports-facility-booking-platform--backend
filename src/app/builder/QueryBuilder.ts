import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.query = query;
    this.modelQuery = modelQuery;
  }

  search(searchableFields: string[]) {
    const searchTerm = (this?.query?.searchTerm as string) || '';
    const regex = new RegExp(searchTerm, 'i');

    this.modelQuery = this?.modelQuery?.find({
      $or: searchableFields.map(
        (field) =>
          ({
            [field]: { $regex: regex },
          }) as FilterQuery<T>,
      ),
    });

    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeQueryProperty: string[] = [
      'searchTerm',
      'sort',
      'limit',
      'page',
      'fields',
    ];
    excludeQueryProperty.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort =
      (this.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort);

    return this;
  }

  paginate() {
    const limit = (Number(this.query?.limit) as number) || 0;
    const page = (Number(this.query?.page) as number) || 1;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }

  async countTotal() {
    const filter = this.modelQuery.getFilter();
    const countTotal = await this.modelQuery.model.countDocuments(filter);
    const limit = (Number(this.query?.limit) as number) || 20;
    const page = (Number(this.query?.page) as number) || 1;
    const totalPage = Math.ceil(countTotal / limit);

    return {
      countTotal,
      page,
      totalPage,
      limit,
    };
  }
}

export default QueryBuilder;
