import { InjectableStore } from './injectable-store/injectable-store';

import { STORE_ERRORS } from '../errors';

export const Select = (selector: string) => (
  target: any,
  propertyKey: string,
  descriptor?: PropertyDescriptor
): any => {
  if (delete target[propertyKey]) {
    Object.defineProperty(target, propertyKey, {
      ...descriptor,
      get() {
        const store = InjectableStore.instance;

        if (store === null) {
          throw new Error(STORE_ERRORS.INJECTION);
        }

        return store.select(selector);
      }
    });
  }
};
