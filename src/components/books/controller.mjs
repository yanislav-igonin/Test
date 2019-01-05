import dal from './dal';

const controller = {
  list: async (ctx) => {
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
