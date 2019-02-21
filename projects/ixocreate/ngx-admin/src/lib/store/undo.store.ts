import { Action, ActionReducer } from '@ngrx/store';
import { StoreAction } from './store.interface';

export namespace UndoStore {
  export const Types = {
    UNDO: '[UNDO] Action',
    UNDO_MULTIPLE: '[UNDO] Multiple Actions',
  };
  let bufferSize = 100;

  export function configureBufferSize(size: number): void {
    bufferSize = size;
  }

  export const Actions = {
    Single: (action: Action): StoreAction => ({type: Types.UNDO, payload: action}),
    Multiple: (actions: Action[]): StoreAction => ({type: Types.UNDO_MULTIPLE, payload: actions}),
  };

  export function Handle(rootReducer: ActionReducer<any>): ActionReducer<any> {
    let executedActions: Action[] = [];
    let initialState;
    return (state: any, action: StoreAction) => {
      if (action.type === Types.UNDO || action.type === Types.UNDO_MULTIPLE) {
        let newState: any = initialState;
        if (action.type === Types.UNDO_MULTIPLE) {
          executedActions = executedActions.filter((eAct) => action.payload.indexOf(eAct) === -1);
        } else {
          executedActions = executedActions.filter((eAct) => eAct !== action.payload);
        }
        executedActions.forEach((executedAction) => newState = rootReducer(newState, executedAction));
        return newState;
      }
      executedActions.push(action);
      const updatedState = rootReducer(state, action);
      if (executedActions.length === bufferSize + 1) {
        const firstAction = executedActions[0];
        initialState = rootReducer(initialState, firstAction);
        executedActions = executedActions.slice(1, bufferSize + 1);
      }
      return updatedState;
    };
  }
}
