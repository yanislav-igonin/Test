import dal from './dal';
import { validateListSortQuery } from './helpers';
import { errors } from '../../modules';

const controller = {
  list: async (ctx) => {
    if (ctx.query.sort) {
      const isSortQueryValid = validateListSortQuery(ctx.query);

      if (!isSortQueryValid) {
        throw new errors.HttpBadRequestException('Invalid sort query params');
      }
    }

    const data = await dal.list(ctx.query);

    ctx.body = { data };
  },

  create: async (ctx) => {
    const data = await dal.create(ctx.request.body);

    ctx.body = { data };
  },

  update: async (ctx) => {
    const data = await dal.update(ctx.params.bookId, ctx.request.body);

    ctx.body = { data };
  },
};

export default controller;
