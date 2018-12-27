import { ActionReducer } from '@ngrx/store';
import { StoreAction } from './store.interface';

export namespace DefaultStore {
  export const Types = {
    SET: '[?] Set',
    CLEAR: '[?] Clear',
  };

  function parseTypeName(actionName: string, type: string): string {
    return type.replace('[?]', '[' + actionName + ']');
  }

  export const Actions = {
    Set: (actionName: string, payload: any): StoreAction => ({type: parseTypeName(actionName, Types.SET), payload}),
    Clear: (actionName: string): StoreAction => ({type: parseTypeName(actionName, Types.CLEAR)}),
  };

  export function HandleWithValues(actionName: string, action: StoreAction, state?: any): ActionReducer<any> {
    switch (action.type) {
      case parseTypeName(actionName, Types.SET):
        return action.payload;
      case parseTypeName(actionName, Types.CLEAR):
        return null;
      default:
        return state;
    }
  }

  export function Handle(actionName: string, value: any = null): ActionReducer<any> {
    return (state: any = value, action: StoreAction): ActionReducer<any> => {
      return DefaultStore.HandleWithValues(actionName, action, state);
    };
  }
}
