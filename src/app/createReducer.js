// http://redux.js.org/docs/recipes/ReducingBoilerplate.html#generating-reducers
// official redux helper for reducing boilerplate
export default function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
