import dal from './dal';

const controller = {
  list: async (ctx) => {
    const data = await dal.list(ctx.query);

    ctx.body = { data };
  },
  // create: async (ctx) => {},
  // update: async (ctx) => {},
};

export default controller;
