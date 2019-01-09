import joi from 'joi';

const schema = joi.object().keys({
  limit: joi.number().min(0),
  offset: joi.number().min(0),
  sort: joi
    .array()
    .items(
      joi
        .array()
        .items(
          joi
            .string()
            .valid([
              'id',
              'title',
              'date',
              'description',
              'image',
              'author_first_name',
              'author_last_name',
              'asc',
              'desc',
            ]),
        ),
    ),
});

export default schema;
