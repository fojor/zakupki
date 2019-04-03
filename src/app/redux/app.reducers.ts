import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AppState } from './app.state';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as tasksReducer from './reducers/tasks.reducer';


export const reducers: ActionReducerMap<AppState> = {
  tasksState: tasksReducer.reducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['tasksState'], rehydrate: true })(reducer);
}

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger, localStorageSyncReducer]
  : [localStorageSyncReducer]; 
