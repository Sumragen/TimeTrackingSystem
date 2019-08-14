import { AppState } from './reducers/app.reducer';

export const APP_STATE_KEY: string = 'app';

export interface STORE_STATE {
   app: AppState
}