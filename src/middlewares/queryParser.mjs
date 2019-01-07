const parseSort = sortString => sortString.split(':');

export default async (ctx, next) => {
  if (ctx.query.sort) {
    if (Array.isArray(ctx.query.sort)) {
      ctx.query.sort = ctx.query.sort.map(value => parseSort(value));
    } else {
      ctx.query.sort = [parseSort(ctx.query.sort)];
    }
  }

  await next();
};
