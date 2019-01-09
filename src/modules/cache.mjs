import NodeCache from 'node-cache';
import { app } from '../config';

const cache = new NodeCache({
  stdTTL: app.cache.ttlSeconds,
  checkperiod: app.cache.ttlSeconds * 0.2,
  useClones: true,
});

export default {
  get(key, storeFunction) {
    const value = cache.get(key);
    if (value) {
      return Promise.resolve(value);
    }

    return storeFunction().then((result) => {
      cache.set(key, result);
      return result;
    });
  },
};
