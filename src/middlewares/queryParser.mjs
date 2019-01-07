const parseSort = (sortString) => {
  const [key, value] = sortString.split(':');

  const sortObj = {};

  sortObj[key] = value;

  return sortObj;
};

export default async (ctx, next) => {
  const parsedQuery = {};

  if (ctx.query.limit) {
    parsedQuery.limit = ctx.query.limit;
  }

  if (ctx.query.offset) {
    parsedQuery.offset = ctx.query.offset;
  }

  if (ctx.query.sort) {
    if (Array.isArray(ctx.query.sort)) {
      ctx.query.sort = ctx.query.sort.map(value => parseSort(value));
    } else {
      ctx.query.sort = [parseSort(ctx.query.sort)];
    }
  }

  ctx.query = parsedQuery;

  await next();
};
