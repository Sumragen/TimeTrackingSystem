import { InjectableStore } from './injectable-store/injectable-store';

export function Select(
   selector: string
) {
   return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor): any {
      if (delete target[propertyKey]) {
         Object.defineProperty(target, propertyKey, {
            ...descriptor,
            get() {
               const store = InjectableStore.instance;

               if (store === null) {
                  throw new Error('Not connected to store!');
               }

               return store.select(selector);
            }
         });
      }
   }
}