import joi from 'joi';
import dal from './dal';
import { querySchema, bodySchema } from './schemas';
import { errors } from '../../modules';

const controller = {
  list: async (ctx) => {
    const validator = joi.validate(ctx.query, querySchema);

    if (validator.error) {
      throw new errors.HttpBadRequestException(validator.error.message);
    }

    const data = await dal.list(ctx.query);

    ctx.body = { data };
  },

  create: async (ctx) => {
    const validator = joi.validate(ctx.request.body, bodySchema);

    if (validator.error) {
      throw new errors.HttpUnprocessableEntity(validator.error.message);
    }

    const data = await dal.create(ctx.request.body);

    ctx.body = { data };
  },

  update: async (ctx) => {
    const validator = joi.validate(ctx.request.body, bodySchema);

    if (validator.error) {
      throw new errors.HttpUnprocessableEntity(validator.error.message);
    }

    const data = await dal.update(ctx.params.bookId, ctx.request.body);

    ctx.body = { data };
  },
};

export default controller;
