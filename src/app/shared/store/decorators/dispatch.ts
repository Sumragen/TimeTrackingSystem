import { Action, Store } from '@ngrx/store';
import { InjectableStore } from './injectable-store/injectable-store';
import { STORE_ERRORS } from '../errors';
import { StoreState } from '../store';

export const Dispatch = <V extends Action>() => (
  target: any,
  propertyKey: string,
  descriptor?: PropertyDescriptor
) => {
  const method = descriptor.value;

  descriptor.value = function(...args: any[]) {
    const store: Store<StoreState> = InjectableStore.instance;

    if (!store) {
      throw new Error(STORE_ERRORS.INJECTION);
    }

    const action: V = method.apply(this, args);

    InjectableStore.instance.dispatch(action);

    return action;
  };

  return descriptor;
};
