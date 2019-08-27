export function createReducer(initialState: any, handlers: any) {
  return function reducer(state: any = initialState, action: any) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}
