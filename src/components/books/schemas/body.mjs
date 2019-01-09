import joi from 'joi';

const schema = joi.object().keys({
  title: joi.string().min(1).max(255),
  author: joi.number().min(1),
  description: joi.string().min(1).max(1000),
  image: joi.string().min(1).max(300),
});

export default schema;
