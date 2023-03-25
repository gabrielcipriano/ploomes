class QueryFilter {
  and: QueryFilter;
  filters: string[] = [];

  constructor() {
    this.and = this; // just a syntax sugar 
  }

  eq(key: string, value: string | number): QueryFilter {
    const val = typeof value === 'string' ? `'${value}'` : value;
    this.filters.push(`${key} eq ${val}`);
    return this;
  }

  parse(): string {
    return this.filters.length > 1
      ? `(${this.filters.join(' and ')})`
      : this.filters[0] || '';
  }
}

interface PloomesQueryParams {
  top?: number;
  skip?: number;
  select?: string[];
  expand?: string[];
  filter?: QueryFilter;
  orderBy?: {
    [key: string]: 'asc' | 'desc';
  };
}

type PloomesParsedParams = {
  $top?: string;
  $skip?: string;
  $select?: string;
  $expand?: string;
  $filter?: string;
  $orderby?: string;
};

export class PloomesQuery {
  $top: number | undefined; // top X results
  $skip: number | undefined;
  $select: string[] | undefined;
  $expand: string[] | undefined;
  $filter: QueryFilter | undefined;
  $orderby: { [key: string]: 'asc' | 'desc' } | undefined;

  constructor(params: PloomesQueryParams = {}) {
    const { top, skip, select, expand, filter, orderBy } = params;
    this.$top = top;
    this.$skip = skip;
    this.$select = select;
    this.$expand = expand;
    this.$filter = filter;
    this.$orderby = orderBy;
  }

  static new(params?: PloomesQueryParams) {
    return new PloomesQuery(params);
  }

  top(int: number): PloomesQuery {
    this.$top = int;
    return this;
  }

  skip(int: number): PloomesQuery {
    this.$skip = int;
    return this;
  }

  select(fieldOrFields: string[] | string): PloomesQuery {
    this.$select = asArray(fieldOrFields);
    return this;
  }

  expand(entityOrEntities: string[] | string): PloomesQuery {
    this.$expand = asArray(entityOrEntities);
    return this;
  }

  filter(filterBuilder: (q: QueryFilter) => QueryFilter): PloomesQuery {
    this.$filter = filterBuilder(new QueryFilter());
    return this;
  }

  orderBy(orderBy: { [key: string]: 'asc' | 'desc' }): PloomesQuery {
    this.$orderby = orderBy;
    return this;
  }

  getParams(): PloomesParsedParams {
    const data: PloomesParsedParams = {};
    if (this.$top) data.$top = `${this.$top}`;
    if (this.$skip) data.$skip = `${this.$skip}`;
    if (this.$select) data.$select = this.$select.join(',');
    if (this.$expand) data.$expand = this.$expand.join(',');
    if (this.$filter) data.$filter = this.$filter.parse();
    if (this.$orderby)
      data.$orderby = Object.entries(this.$orderby)
        .map(([key, order]) => `${key} ${order}`)
        .join(',');

    return data;
  }
}

function asArray<T>(itemOrItems: T | T[]): T[] {
  return Array.isArray(itemOrItems) ? itemOrItems : [itemOrItems];
}
